import { getPaymentByTicket } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.use("/*", authenticateToken);
paymentRouter.get("/", getPaymentByTicket );
// paymentRouter.post("/process")

export default paymentRouter;
