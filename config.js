import dotenv from "dotenv";

dotenv.config();

function required(key, defaultValue = undefined) {
  const value = process.env[key] || defaultValue;
  if (!value) throw new Error(`KEY ${key} is undefined`);
  return value;
}

const config = {
  jwt: {
    secretKey: required("JWT_SECRET_KEY"),
    expiresIn: parseInt(required("JWT_EXPIRES_IN", 86400)),
  },
  bcrypt: {
    saltRounds: parseInt(required("BCRYPT_SALT_ROUNDS", 10)),
  },
  host: {
    port: parseInt(required("HOST_PORT", 8080)),
  },
  db: {
    host: required("DB_HOST"),
  },
};

export default config;
