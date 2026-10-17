import { Prisma } from "@prisma/client";

export function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === "P2025") {
      return res.status(404).json({ erro: "Registro não encontrado." });
    }
    if (error.code === "P2002") {
      return res.status(409).json({ erro: "Este registro já existe para a pessoa informada." });
    }
    if (error.code === "P2003") {
      return res.status(400).json({ erro: "A pessoa informada não existe." });
    }
  }

  if (error.status) {
    return res.status(error.status).json({ erro: error.message });
  }

  if (error instanceof SyntaxError && "body" in error) {
    return res.status(400).json({ erro: "O corpo da requisição contém JSON inválido." });
  }

  console.error(error);
  return res.status(500).json({ erro: "Erro interno do servidor." });
}
