import bcrypt from "bcrypt";

export const criptografarSenha = async (senha: string): Promise<string> => {
  const senhaCriptografada = await bcrypt.hash(senha, 10);
  return senhaCriptografada;
};
