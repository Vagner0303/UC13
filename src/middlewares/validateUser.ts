// Ele valida se name, email e password foram preenchidos corretamente

import { NextFunction, Request, Response } from "express";

export function validateUser(req: Request, res: Response, next: NextFunction) {
    // Pega os dados que vieram do corpo da requisição
    const { name, email, password } = req.body

    // Vamos fazer a validação agora
    if (!name || !email || !password) {
        return res.status(400).json({
            message: "Os campos name, email e password são obrigatorios, seu jaguara"
        })
    }

    // senha não pode termenos de 6 caracteries
    if (password.lenght < 6){
        return res.status(400).json({
            message: "A senha deve ter pelo menos 6 caracteres"
        })
    }

    // Se passou em todas as verificações, então deixamos a requisição seguir adiante e passar pela fronteira com o Brasil com as muanbas do Paraguai
    next()


}