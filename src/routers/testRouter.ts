import { TestsController } from "@/controllers/TestsController";
import { Router } from "express";

const testRouter = Router();

testRouter.all("/", TestsController.root);
testRouter.all("/health", TestsController.health);
testRouter.all("/db-test", TestsController.dbTest);
testRouter.all("/error-test", TestsController.errorTest);
testRouter.all("/testSupabase", TestsController.testSupabase);

export default testRouter;
