import { Request, Response, NextFunction } from "express";
import { ResponseModel } from "../backend-resources/models/ResponseModel";
import { validateMethod } from "../backend-resources/utils";

export const validateEmpresaModo = (req: Request, res: Response, next: NextFunction): void => {
  const { empresa, modo } = req.params;

  if (!empresa || empresa.trim() === "") {
    const response = ResponseModel.create("error", 400, "Falta empresa");
    res.status(400).json(response);
    return;
  }

  // Validar que modo esté presente y sea válido
  if (!modo || modo.trim() === "") {
    const response = ResponseModel.create("error", 400, "Falta modo");
    res.status(400).json(response);
    return;
  }

  const allowedModes = ["homo", "prod"];

  if (!allowedModes.includes(modo.toLowerCase())) {
    const response = ResponseModel.create("error", 400, "Modo no permitido");
    res.status(400).json(response);
    return;
  }

  // Validar que empresa sea numérica (opcional, depende de tu lógica de negocio)
  if (isNaN(Number(empresa))) {
    const response = ResponseModel.create("error", 400, "Error de empresa");
    res.status(400).json(response);
    return;
  }

  req.params.modo = modo.toLowerCase();

  next();
};

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  if (!validateMethod(req, res, "POST")) return;

  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Token de autorización faltante o inválido" });
    return;
  }

  const accessToken = authHeader.split(" ")[1];

  if (!accessToken) {
    res.status(401).json({ error: "Token no proporcionado" });
    return;
  }

  (req as any).accessToken = accessToken;

  next();
}
