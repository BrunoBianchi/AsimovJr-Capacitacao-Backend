import express from "express"
import { authentificatorMiddleware } from "../middlewares/authentificator.middleware";
import { authRouter } from "../routers/auth.router";

export const apiController: express.Router = express.Router();

apiController.use(authentificatorMiddleware);
apiController.use('/auth', authRouter)





