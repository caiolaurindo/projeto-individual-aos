import "dotenv/config";
import app from "./app.js";
import { prisma } from "./config/database.js";

const port = Number(process.env.PORT) || 3000;

const server = app.listen(port, () => {
  console.log(`API rodando na porta ${port}.`);
});

async function encerrarServidor() {
  server.close(async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

process.on("SIGINT", encerrarServidor);
process.on("SIGTERM", encerrarServidor);
