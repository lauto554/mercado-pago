import { Request, Response } from "express";
import { ResponseModel } from "../backend-resources/models/ResponseModel";
import { MercadoPagoService } from "../services/MercadoPagoService";

export class MainController {
  static async getUser(req: Request, res: Response) {
    try {
      const accessToken = (req as any).accessToken;

      const userData = await MercadoPagoService.getUserData(accessToken);

      const response = ResponseModel.create(
        "success",
        200,
        "User data retrieved successfully",
        userData,
      );
      res.json(response);
    } catch (error) {
      console.error(error);
      const response = ResponseModel.create("error", 500, "Error en getUser", { error });
      res.status(500).json(response);
    }
  }
}
