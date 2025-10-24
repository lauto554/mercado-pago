import { Router, Request, Response } from "express";
import { ResponseModel } from "../backend-resources/models/ResponseModel";
import "colors";
import { MainController } from "../controllers/MainController";
import { authenticateToken } from "../middleware";

const router = Router();

router.get("/", (req: Request, res: Response) => {
  const response = ResponseModel.create("success", 200, "working!", {
    timestamp: new Date().toISOString(),
  });

  res.json(response);
});

router.all("/user", authenticateToken, MainController.getUser);

export default router;
