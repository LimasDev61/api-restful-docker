import jwt from "jsonwebtoken";

export function gerarToken(id: number): string {
  const secret = process.env.JWT_SECRET || "default-secret";
  const payload = { id };
  const options = { expiresIn: "1h" };
  return jwt.sign(payload, secret, options);
}
