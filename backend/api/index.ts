import app from "../src/index";
import { VercelRequest, VercelResponse } from "@vercel/node";

// ✅ Vercel requires a function handler to handle requests
export default (req: VercelRequest, res: VercelResponse) => {
  return app(req, res);
};
