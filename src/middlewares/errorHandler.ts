import { NextFunction, Request, Response } from "express";

// Esse middleware vai formatar cada resposta de erro. Ao inves de cada controller ter que pegar um erro e formatar a mensagem bonitinha, ele faz isso para todo mundo, tipo aquele seu amigo que fez todo o trabalho enquanto tu ficou no celular pq voce sabia que ele ia fazer pra ti mesmo.
export function errorHandler(error:any, req:Request, res:Response, next:NextFunction){

    // Antes de mais nada, a gente mostra o erro "na forma original" dele para debugar
    console.log("Erro capturado pelo erroHandler: ", error)

    // essa tal de 'ER_DUP_ENTRY' é especifico do MySQL: ele acontece quando a gente tenta salvar algo que ja existe e tem UNIQUE (exemplo: criar um usuario com um email que ja existe)
    if (error.code === 'ER_DUP_ENTRY') {
        // status 409 é para entrada duplicada
        return res.status(409).json({
            message: 'Registro duplicado (email ja existente).'
        })
    }

    // Se for qualquer outro erro que a gente não previu pq n tem bola de cristal, ele vira um 500 generico
    return res.status(500).json({
        message: 'Erro interno do servidor: DEU MERDA'
    })
}