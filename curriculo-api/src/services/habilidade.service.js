import { prisma } from "../config/database.js";

const habilidadeInclude = {
  pessoa: {
    select: {
      id: true,
      nome: true,
      email: true,
    },
  },
};

export function listarHabilidades(pessoaId) {
  return prisma.habilidade.findMany({
    where: pessoaId ? { pessoaId } : undefined,
    include: habilidadeInclude,
    orderBy: { id: "asc" },
  });
}

export function buscarHabilidade(id) {
  return prisma.habilidade.findUnique({
    where: { id },
    include: habilidadeInclude,
  });
}

export function criarHabilidade(data) {
  return prisma.habilidade.create({
    data,
    include: habilidadeInclude,
  });
}

export function atualizarHabilidade(id, data) {
  return prisma.habilidade.update({
    where: { id },
    data,
    include: habilidadeInclude,
  });
}

export function excluirHabilidade(id) {
  return prisma.habilidade.delete({ where: { id } });
}
