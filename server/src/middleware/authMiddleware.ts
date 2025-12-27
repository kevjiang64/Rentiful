import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface DecodedToken extends JwtPayload {
  sub: string;
  "custom:role"?: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: string;
      };
    }
  }
}

export const authMiddleware = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    //Grabbing the id token coming from the headers setup in api.ts from frontend
    const token = req.headers.authorization?.split(" ")[1];

    //If no token
    if (!token) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    try {
      const decoded = jwt.decode(token) as DecodedToken;
      const userRole = decoded["custom:role"] || "";

      //Add to request user
      req.user = {
        id: decoded.sub,
        role: userRole,
      };

      //If user has a valid role based on passed roles
      const hasAccess = allowedRoles.includes(userRole.toLowerCase());
      if (!hasAccess) {
        res.status(403).json({ message: "Access Denied" });
        return;
      }
    } catch (error) {
      console.error("Failed to decode token", error);
      res.status(400).json({ message: "Invalid token" });
      return;
    }

    //Go to next middleware if everything works
    next();
  };
};
