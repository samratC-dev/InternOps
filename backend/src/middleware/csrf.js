const crypto = require('crypto');
const SECRET = process.env.CSRF_SECRET || require('../config').jwt.secret;
const { verifyAccessToken } = require('../utils/tokens');
const TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

function generateToken(userId) {
  const raw = crypto.randomBytes(32).toString('hex');
  const expires = Date.now() + TOKEN_TTL_MS;
  const payload = `${raw}.${expires}.${userId}`;
  const sig = crypto.createHmac('sha256', SECRET).update(payload).digest('hex');
  return Buffer.from(`${payload}.${sig}`).toString('base64');
}

function verifyToken(token, userId) {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString('utf8');
    const lastDot = decoded.lastIndexOf('.');
    if (lastDot === -1) return false;
    const payload = decoded.slice(0, lastDot);
    const sig = decoded.slice(lastDot + 1);
    const expected = crypto
      .createHmac('sha256', SECRET)
      .update(payload)
      .digest('hex');
    if (sig.length !== expected.length) return false;
    const sigValid = crypto.timingSafeEqual(
      Buffer.from(sig),
      Buffer.from(expected)
    );
    if (!sigValid) return false;
    const parts = payload.split('.');
    if (parts.length !== 3) return false;
    const [, expires, tokenUserId] = parts;
    if (Date.now() > parseInt(expires, 10)) return false;
    if (tokenUserId !== String(userId)) return false;
    return true;
  } catch {
    return false;
  }
}

const EXEMPT = [
  '/api/auth/login',
  '/api/auth/refresh',
  '/api/auth/forgot-password',
  '/api/auth/reset-password',
];

function csrfProtection(request, reply, done) {
  if (['GET', 'HEAD', 'OPTIONS'].includes(request.method)) return done();
  if (EXEMPT.some((p) => request.url.startsWith(p))) return done();
  const token = request.headers['x-csrf-token'];
  const userId =
    request.user?.id ||
    (() => {
      const authHeader = request.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) return undefined;
      try {
        return verifyAccessToken(authHeader.split(' ')[1]).id;
      } catch {
        return undefined;
      }
    })();
  if (!token || !verifyToken(token, userId)) {
    return reply.status(403).send({ error: 'CSRF token missing or invalid' });
  }
  done();
}

module.exports = { generateToken, csrfProtection };
