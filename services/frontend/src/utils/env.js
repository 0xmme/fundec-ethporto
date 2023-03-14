export function isDevelopmentEnv() {
  return process.env.NODE_ENV === "development";
}

export function isProductionEnv() {
  return process.env.NODE_ENV === "production" && !isStagingEnv();
}
