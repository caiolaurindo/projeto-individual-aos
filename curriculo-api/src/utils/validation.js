export function erroRequisicao(mensagem) {
  const erro = new Error(mensagem);
  erro.status = 400;
  return erro;
}

export function validarId(valor, campo = "id") {
  const id = Number(valor);
  if (!Number.isInteger(id) || id < 1) {
    throw erroRequisicao(`'${campo}' deve ser um inteiro positivo.`);
  }
  return id;
}

export function textoObrigatorio(valor, campo) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw erroRequisicao(`'${campo}' é obrigatório e deve ser um texto não vazio.`);
  }
  return valor.trim();
}

export function textoOpcional(valor, campo) {
  if (valor === undefined || valor === null) return null;
  if (typeof valor !== "string") {
    throw erroRequisicao(`'${campo}' deve ser um texto ou null.`);
  }
  return valor.trim() || null;
}

export function dataObrigatoria(valor, campo) {
  if (typeof valor !== "string" || valor.trim() === "") {
    throw erroRequisicao(`'${campo}' deve ser uma data ISO válida.`);
  }
  const data = new Date(valor);
  if (Number.isNaN(data.getTime())) {
    throw erroRequisicao(`'${campo}' deve ser uma data ISO válida.`);
  }
  return data;
}

export function dataOpcional(valor, campo) {
  if (valor === undefined) return undefined;
  if (valor === null || valor === "") return null;
  return dataObrigatoria(valor, campo);
}

export function booleano(valor, campo) {
  if (typeof valor !== "boolean") {
    throw erroRequisicao(`'${campo}' deve ser true ou false.`);
  }
  return valor;
}

export function listaDeTextos(valor, campo) {
  if (!Array.isArray(valor) || valor.some((item) => typeof item !== "string")) {
    throw erroRequisicao(`'${campo}' deve ser uma lista de textos.`);
  }
  return valor.map((item) => item.trim()).filter(Boolean);
}

export function validarEmail(valor) {
  const email = textoObrigatorio(valor, "email");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw erroRequisicao("'email' deve ter um formato válido.");
  }
  return email;
}
