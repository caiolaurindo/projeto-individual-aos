import { prisma } from "../config/database.js";

const include = {
  formacoes: { orderBy: { id: "asc" } },
  experiencias: { orderBy: { id: "asc" } },
  projetos: { orderBy: { id: "asc" } },
  habilidades: { orderBy: { id: "asc" } },
};

export function listarPessoas() {
  return prisma.pessoa.findMany({ include, orderBy: { id: "asc" } });
}

export function buscarPessoa(id) {
  return prisma.pessoa.findUnique({ where: { id }, include });
}

export function criarPessoa(data) {
  return prisma.pessoa.create({ data, include });
}

export function atualizarPessoa(id, data) {
  return prisma.pessoa.update({ where: { id }, data, include });
}

export function excluirPessoa(id) {
  return prisma.pessoa.delete({ where: { id } });
}
