import * as formacaoService from "../services/formacao.service.js";

function erroRequisicao(mensagem) {
  const erro = new Error(mensagem);
  erro.status = 400;
  return erro;
}

function validarId(valor, nome = "id") {
  const id = Number(valor);
  if (!Number.isInteger(id) || id < 1) {
    throw erroRequisicao(`${nome} inválido`);
  }
  return id;
}

function normalizarNome(valor) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw erroRequisicao("'nome' é obrigatório e deve ser um texto não vazio.");
  }
  return valor.trim();
}

function normalizarInstituicao(valor) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw erroRequisicao(
      "'instituicao' é obrigatório e deve ser um texto não vazio.",
    );
  }
  return valor.trim();
}

function normalizarAnoInicio(valor) {
  const ano = Number(valor);
  if (!Number.isInteger(ano) || ano < 1900 || ano > new Date().getFullYear()) {
    throw erroRequisicao("'anoInicio' deve ser um ano válido.");
  }
  return ano;
}

function normalizarAnoFim(valor) {
  if (valor === undefined || valor === null || valor === "") {
    return null;
  }
  const ano = Number(valor);
  if (!Number.isInteger(ano) || ano < 1900 || ano > new Date().getFullYear()) {
    throw erroRequisicao("'anoFim' deve ser um ano válido.");
  }
  return ano;
}

function validarPessoaId(valor) {
  return validarId(valor, "pessoaId");
}

export async function listar(req, res) {
  const pessoaId = req.query.pessoaId
    ? validarPessoaId(req.query.pessoaId)
    : undefined;
  const formacoes = await formacaoService.listarFormacoes(pessoaId);
  res.status(200).json(formacoes);
}

export async function buscarPorId(req, res) {
  const id = validarId(req.params.id);
  const formacao = await formacaoService.buscarFormacao(id);
  res.status(200).json(formacao);
}

export async function criar(req, res) {
  const { nome, instituicao, anoInicio, anoFim, pessoaId } = req.body ?? {};
  const formacao = await formacaoService.criarFormacao({
    nome: normalizarNome(nome),
    instituicao: normalizarInstituicao(instituicao),
    anoInicio: normalizarAnoInicio(anoInicio),
    anoFim: normalizarAnoFim(anoFim),
    pessoaId: validarPessoaId(pessoaId),
  });
  res.status(201).json(formacao);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const { nome, instituicao, anoInicio, anoFim, pessoaId } = req.body ?? {};
  const formacao = await formacaoService.atualizarFormacao(id, {
    nome: normalizarNome(nome),
    instituicao: normalizarInstituicao(instituicao),
    anoInicio: normalizarAnoInicio(anoInicio),
    anoFim: normalizarAnoFim(anoFim),
    pessoaId: validarPessoaId(pessoaId),
  });
  res.status(200).json(formacao);
}

export async function excluir(req, res) {
  const id = validarId(req.params.id);
  await formacaoService.excluirFormacao(id);
  res.status(204).send();
}