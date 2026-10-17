import { prisma } from "../config/database.js";

const include = {
  pessoa: { select: { id: true, nome: true, email: true } },
};

export function listarProjetos(pessoaId) {
  return prisma.projeto.findMany({
    where: pessoaId ? { pessoaId } : undefined,
    include,
    orderBy: { id: "asc" },
  });
}

export function buscarProjeto(id) {
  return prisma.projeto.findUnique({ where: { id }, include });
}

export function criarProjeto(data) {
  return prisma.projeto.create({ data, include });
}

export function atualizarProjeto(id, data) {
  return prisma.projeto.update({ where: { id }, data, include });
}

export function excluirProjeto(id) {
  return prisma.projeto.delete({ where: { id } });
}
