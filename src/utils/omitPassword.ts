// esta função servira para remover o campo de senha (password) de um objeto User
// Isso vai fazer com que, quando chamarmos ela em Services, ele envia ao banco o usuario normal (completo) mas envia para o Controller um usuario que não contem a senha do usuario
import { User } from "../models/User"

export function omitPassword(user:User){
    // copiamos o valor da senha do user para a variavel password
    // ai, o resto (id, name, email) fica dentro da variavel rest
    // e é ela que retornamos
    const {password, ...rest} = user
    return rest
}