import { prisma } from "../config/database.js";

const include = {
  pessoa: { select: { id: true, nome: true, email: true } },
};

export function listarExperiencias(pessoaId) {
  return prisma.experiencia.findMany({
    where: pessoaId ? { pessoaId } : undefined,
    include,
    orderBy: { id: "asc" },
  });
}

export function buscarExperiencia(id) {
  return prisma.experiencia.findUnique({ where: { id }, include });
}

export function criarExperiencia(data) {
  return prisma.experiencia.create({ data, include });
}

export function atualizarExperiencia(id, data) {
  return prisma.experiencia.update({ where: { id }, data, include });
}

export function excluirExperiencia(id) {
  return prisma.experiencia.delete({ where: { id } });
}
