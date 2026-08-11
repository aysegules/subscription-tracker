import { aj } from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
  try {
    const desicion = await aj.protect(req, { requested: 1 });

    if (desicion.isDenied()) {
      if (desicion.reason.isRateLimit()) {
        res.status(429).json({
          error: "Rate limit exceeded",
        });
      }
      if (desicion.reason.isBot()) {
        res.status(403).json({
          error: "Bot detected",
        });
      }
      return res.status(403).json({
        error: "Access denied",
      });
    }

    next();
  } catch (error) {
    console.error(`Arcjet middleware error ${error}`);
  }
};

export { arcjetMiddleware };
