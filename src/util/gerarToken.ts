import jwt from "jsonwebtoken";

export function gerarToken(id: string): string {
  const token = jwt.sign(
    { idUsuarioLogado: id },
    process.env.JWT_SECRET || "DEFAULT",
    { expiresIn: "1h" }
  );
  return token;
}
