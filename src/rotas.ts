import { Request, Response, Router } from "express";
import { UsuarioControl } from "./controlador/usuarios-controles";
import { MateriasControl } from "./controlador/materia-control";
import { validarToken } from "./util/validador-de-token";
import { ResumoControl } from "./controlador/resumos-control";

export const rotas = Router();

const usuarioControl = new UsuarioControl();
const materiasControl = new MateriasControl();
const resumoControl = new ResumoControl();

rotas.post("/usuarios", usuarioControl.cadastrar.bind(usuarioControl));
rotas.post("/login", usuarioControl.login.bind(usuarioControl));

rotas.get("/materias", validarToken, materiasControl.listar.bind(materiasControl));

rotas.get("/resumes", validarToken, resumoControl.criarResumo.bind(resumoControl));