import { rateLimit } from "express-rate-limit";
const loginRateLimit = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5, // Maximum 5 login attempts per minute
  message: {
    message: "Too many login attempts. Please try again after 1 minute.",
  },
});
export { loginRateLimit };
