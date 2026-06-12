const REQUIRED_VARS = [
  "JWT_SECRET",
  "DATABASE_URL",
  "NODE_ENV"
];

const OPTIONAL_VARS = [
  "REDIS_URL",
  "GOOGLE_CLIENT_ID",
  "EMAIL_API_KEY"
];

function validateEnv() {
  const missingRequired = [];
  const missingOptional = [];

  for (const key of REQUIRED_VARS) {
    const val = process.env[key];
    if (val === undefined || val === null || String(val).trim() === "") {
      missingRequired.push(key);
    }
  }

  for (const key of OPTIONAL_VARS) {
    const val = process.env[key];
    if (val === undefined || val === null || String(val).trim() === "") {
      missingOptional.push(key);
    }
  }

  if (missingOptional.length > 0) {
    console.warn("⚠️ Missing optional environment variables:");
    for (const key of missingOptional) {
      console.warn(`   • ${key}`);
    }
  }

  if (missingRequired.length > 0) {
    console.error("❌ Missing required environment variables:");
    for (const key of missingRequired) {
      console.error(`   • ${key}`);
    }
    
    // ✅ Only exit if not in test mode, allowing tests to run gracefully
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1);
    } else {
      console.warn("⚠️ Continuing in test mode despite missing required variables");
    }
  }
}

module.exports = validateEnv;