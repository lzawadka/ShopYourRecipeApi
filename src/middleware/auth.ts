import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const auth = (req: Request, res: Response, next: NextFunction) => {
  // Récupérer le token d'authentification depuis les headers
  const token = req.header("Authorization")?.replace("Bearer ", "");

  // Vérifier si un token est présent
  if (!token) {
    return res.status(401).json({ msg: "Pas de token, autorisation refusée" });
  }

  try {
    // Vérifier le token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Vérifier que decoded est bien une instance de JwtPayload
    if (!isJwtPayload(decoded)) {
      throw new Error("Token non valide");
    }

    // Ajouter le user à la requête
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token non valide" });
  }
};

// Type guard pour vérifier que l'objet est de type JwtPayload
function isJwtPayload(obj: any): obj is JwtPayload {
  return obj && obj.hasOwnProperty("user");
}

export default auth;