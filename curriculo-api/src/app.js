import express from "express";
import experienciaRoutes from "./routes/experiencia.routes.js";
import formacaoRoutes from "./routes/formacao.routes.js";
import habilidadeRoutes from "./routes/habilidade.routes.js";
import pessoaRoutes from "./routes/pessoa.routes.js";
import projetoRoutes from "./routes/projeto.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ mensagem: "API de currículo no ar." });
});

app.use("/api/habilidades", habilidadeRoutes);
app.use("/api/formacoes", formacaoRoutes);
app.use("/api/experiencias", experienciaRoutes);
app.use("/api/projetos", projetoRoutes);
app.use("/api/pessoas", pessoaRoutes);

app.use((req, res) => {
  res.status(404).json({ erro: "Rota não encontrada." });
});

app.use(errorHandler);

export default app;
