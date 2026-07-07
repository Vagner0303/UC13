import { AppDataSource } from "../config/data-source"
import { User } from '../models/User';

const repo = AppDataSource.getRepository(User);

export const UserRepository = {
    // Aqui vamos criar os metodos que fazem o CRUD de usuarios

    // Busca todos os usuarios
    async findAll() {
        // o metodo find() vem do TypeORM. Ele procura algo em uma tabela
        // ele aceita como parametro um objeto com acoes
        return repo.find({ relations:['posts'] })
    },

    async findById(id: number) {
        return repo.findOne({where: { id },relations:['posts']})
    },

    async create(data: {name: string, email: string, password: string}) {
        // cria o usuario
        const user = repo.create(data)
        // salva ele no banco
        return repo.save(user)
    },

    async delete(id:number){
        return repo.delete(id)
    }
}



// config, models, repositories, services, controllers, middlewares