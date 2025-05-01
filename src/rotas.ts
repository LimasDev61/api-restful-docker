import { Router } from "express";
import { CriarUsuario } from "./controller/criar-usuario";
import { LoginUsuario } from "./controller/login-usuario";
import { validarToken } from "./intermediarios/validarToken";
import { FindMateria } from "./controller/find-materia";
import { CriarResumo } from "./controller/criar-resumo";
import { ListarResumos } from "./controller/listar-resumos";
import { EditarResumo } from "./controller/editar-resumo";
import { DeletarResumo } from "./controller/deletar-resumos";

export const rotas = Router();

rotas.post("/usuarios", new CriarUsuario().criar);
rotas.post("/login", new LoginUsuario().login);

rotas.use(validarToken);
rotas.delete("/resumos/:id", new DeletarResumo().deletar);

rotas.get("/materias", new FindMateria().find);
rotas.post("/resumos", new CriarResumo().criarResumo);
rotas.get("/resumos", new ListarResumos().listar);
rotas.put("/resumos/:id", new EditarResumo().editar);
