import * as pessoaService from "../services/pessoa.service.js";
import {
  erroRequisicao,
  textoObrigatorio,
  textoOpcional,
  validarEmail,
  validarId,
} from "../utils/validation.js";

export async function listar(req, res) {
  return res.status(200).json(await pessoaService.listarPessoas());
}

export async function buscarPorId(req, res) {
  const pessoa = await pessoaService.buscarPessoa(validarId(req.params.id));
  if (!pessoa) return res.status(404).json({ erro: "Pessoa não encontrada." });
  return res.status(200).json(pessoa);
}

export async function criar(req, res) {
  const body = req.body ?? {};
  const pessoa = await pessoaService.criarPessoa({
    nome: textoObrigatorio(body.nome, "nome"),
    email: validarEmail(body.email),
    telefone: textoOpcional(body.telefone, "telefone"),
    resumo: textoOpcional(body.resumo, "resumo"),
    linkedin: textoOpcional(body.linkedin, "linkedin"),
    github: textoOpcional(body.github, "github"),
  });
  return res.status(201).json(pessoa);
}

export async function atualizar(req, res) {
  const id = validarId(req.params.id);
  const body = req.body ?? {};
  const data = {};

  if (Object.hasOwn(body, "nome"))
    data.nome = textoObrigatorio(body.nome, "nome");
  if (Object.hasOwn(body, "email")) data.email = validarEmail(body.email);
  if (Object.hasOwn(body, "telefone"))
    data.telefone = textoOpcional(body.telefone, "telefone");
  if (Object.hasOwn(body, "resumo"))
    data.resumo = textoOpcional(body.resumo, "resumo");
  if (Object.hasOwn(body, "linkedin"))
    data.linkedin = textoOpcional(body.linkedin, "linkedin");
  if (Object.hasOwn(body, "github"))
    data.github = textoOpcional(body.github, "github");

  if (Object.keys(data).length === 0) {
    throw erroRequisicao("Informe ao menos um campo para atualizar.");
  }

  return res.status(200).json(await pessoaService.atualizarPessoa(id, data));
}

export async function excluir(req, res) {
  await pessoaService.excluirPessoa(validarId(req.params.id));
  return res.status(204).send();
}
