import { prisma } from "../config/database.js";

const formacaoInclude = {
  pessoa: {
    select: {
      id: true,
      nome: true,
      email: true,
    },
  },
};

export function listarFormacoes(pessoaId) {
  return prisma.formacao.findMany({
    where: pessoaId ? { pessoaId } : undefined,
    include: formacaoInclude,
    orderBy: { id: "asc" },
  });
}

export function buscarFormacao(id) {
  return prisma.formacao.findUnique({
    where: { id },
    include: formacaoInclude,
  });
}

export function criarFormacao(data) {
  return prisma.formacao.create({
    data,
    include: formacaoInclude,
  });
}

export function atualizarFormacao(id, data) {
  return prisma.formacao.update({
    where: { id },
    data,
    include: formacaoInclude,
  });
}

export function excluirFormacao(id) {
  return prisma.formacao.delete({ where: { id } });
}
