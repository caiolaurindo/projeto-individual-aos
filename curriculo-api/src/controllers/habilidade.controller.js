import * as habilidadeService from "../services/habilidade.service.js";

function erroRequisicao(mensagem) {
  const erro = new Error(mensagem);
  erro.status = 400;
  return erro;
}

function validarId(valor, nome = "id") {
  const id = Number(valor);
  if (!Number.isInteger(id) || id < 1) {
    throw erroRequisicao(`'${nome}' deve ser um inteiro positivo.`);
  }
  return id;
}

function normalizarNome(valor) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw erroRequisicao("'nome' é obrigatório e deve ser um texto não vazio.");
  }
  return valor.trim();
}

function normalizarNivel(valor) {
  if (valor === undefined || valor === null) return null;
  if (typeof valor !== "string") {
    throw erroRequisicao("'nivel' deve ser um texto ou null.");
  }
  return valor.trim() || null;
}

function validarPessoaId(valor) {
  return validarId(valor, "pessoaId");
}

export async function listar(req, res) {
  const pessoaId = req.query.pessoaId
    ? validarPessoaId(req.query.pessoaId)
    : undefined;
  const habilidades = await habilidadeService.listarHabilidades(pessoaId);
  res.status(200).json(habilidades);
}

export async function buscarPorId(req, res) {
  const id = validarId(req.params.id);
  const habilidade = await habilidadeService.buscarHabilidade(id);

  if (!habilidade) {
    return res.status(404).json({ erro: "Habilidade não encontrada." });
  }

  return res.status(200).json(habilidade);
}

export async function criar(req, res) {
  const { nome, nivel, pessoaId } = req.body ?? {};
  const habilidade = await habilidadeService.criarHabilidade({
    nome: normalizarNome(nome),
    nivel: normalizarNivel(nivel),
    pessoaId: validarPessoaId(pessoaId),
  });

  return res.status(201).json(habilidade);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const body = req.body ?? {};
  const data = {};

  if (Object.hasOwn(body, "nome")) data.nome = normalizarNome(body.nome);
  if (Object.hasOwn(body, "nivel")) data.nivel = normalizarNivel(body.nivel);
  if (Object.hasOwn(body, "pessoaId")) {
    data.pessoaId = validarPessoaId(body.pessoaId);
  }

  if (Object.keys(data).length === 0) {
    throw erroRequisicao("Informe ao menos um campo para atualizar.");
  }

  const habilidade = await habilidadeService.atualizarHabilidade(id, data);
  return res.status(200).json(habilidade);
}

export async function excluir(req, res) {
  const id = validarId(req.params.id);
  await habilidadeService.excluirHabilidade(id);
  return res.status(204).send();
}
