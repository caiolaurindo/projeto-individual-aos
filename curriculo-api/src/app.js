import express from "express";
import habilidadeRoutes from "./routes/habilidade.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API de currículo no ar." });
});

app.use("/api/habilidades", habilidadeRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.use(errorHandler);

export default app;
