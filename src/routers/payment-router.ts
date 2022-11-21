import { getPaymentByTicket, processPayment } from "@/controllers/payments-controller";
import { authenticateToken } from "@/middlewares";
import { Router } from "express";

const paymentRouter = Router();

paymentRouter.use("/*", authenticateToken);
paymentRouter.get("/", getPaymentByTicket );
paymentRouter.post("/process", processPayment);

export default paymentRouter;
