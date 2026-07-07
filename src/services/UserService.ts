import { UserRepository } from "../repositories/UserRepository";
import bcrypt from "bcrypt";
import { omitPassword } from "../utils/omitPassword";


// A camada Service é responsavel por chamar os metodos de Repository e cuidar das validações das nossas regras de negocio (ex: o usuario precisa ter um email valido, etc)

// Aqui estamos criando uma classe de erro que extende a classe Error
// Isso é para permitir que, mais tarde, o Controller identifique o tipo de erro de uma forma mais clara

export class NotFoundError extends Error {}

export const UserService = {

    // Como para listar não precisamos validar nada, aqui so chamamos o metodo do Repository mesmo, pois o Controller NÃO PODE se comunicar diretamente com Repository, e sim com Service
    async listAll() {
        return UserRepository.findAll();
    },

    async getById(id: number) {
        const user = await UserRepository.findById(id);

        // Aqui vai nossa primeira validade
        // Se não encontramos um user com esse id, ele não existe
        // Se não existe, vamos lançar um erro
        if (!user) {
            throw new NotFoundError("Usuario não encontrado!");
        }

        // Se encontrou, não cai no 'if' ali em cima, então podemos usar o return e retornar o user
        return user;
    },

    
    async create(data: { name: string, email: string, password: string }) {
        // Este método gera uma senha criptografada
        const hashedPassword = await bcrypt.hash(data.password, 10)


        // Isso gera um objeto que é mais omenos assim:
        /*
           const user = {
           name: "Joãozinho da Quebrada",
           email: "joaozinho@gmail.com",
           password: "agfislo14bjk3pnafdv909587t6"
           }
        */
        const user = await UserRepository.create({
            name: data.name,
            email: data.email,
            password: hashedPassword
        })
        
        return omitPassword(user)
    },

    async update(id:number, data: {name?:string, email?:string, password?:string}){
        // Encontra usuario por id
        const user = await UserRepository.findById(id)

        if (!user) {
            throw new NotFoundError("Usuario não encontrado!");
        }

        // Só vamos alterar/atualizar os campos que vierem
        // Assim, podemos atualizar só o nome, ou só o email, ou só o nome e senha, etc.
        if(data.name) user.name = data.name
        if(data.email) user.email = data.email
        
        // Se vier uma senha nova, a gente precisa criptografar ela de novo
        // Se não veio, mantemos a antiga, sem alteração
        if (data.password) user.password = await bcrypt.hash(data.password, 10)

        // Depois de tudo isso acima, chamamos o metodo create do repository (ele salva no banco)
        const updatedUser = await UserRepository.create(user)

        // Retorna o usuario sem a senha (por causa do omitPassword) para que não mostre a senha na resposta do servidor
        return omitPassword(updatedUser)

    },

     async delete(id: number) {
        const result = await UserRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundError('Post não encontrado.');
        }
    }

}