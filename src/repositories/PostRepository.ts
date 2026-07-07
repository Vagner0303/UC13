import { AppDataSource } from "../config/data-source"
import { Post } from '../models/Post';
import { User } from "../models/User";

const repository = AppDataSource.getRepository(Post);

export const PostRepository = {
    async findAll() {
        return repository.find({ relations: ['user'] });
    },

    async findById(id: number) {
        return repository.findOne({
            where: { id },
            relations: ['user'],
        });
    },

      async create(data: {title: string, user: User}) {
   
        const post = repository.create(data)
        return post;
    },

    async save(post: Post) {
        return repository.save(post);
    },

    async delete(id: number) {
        return repository.delete(id);
    },
};