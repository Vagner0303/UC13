import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from './Post';
// Precisamos sinalizar ao TypeORM que esta classe sera mapeada em uma tabela
// Para fazer isso, utilizaremos um decorator:
// @Entity('users') indica que esta classe representa a tabela "users".
@Entity('users')
export class User {
    //PrimaryGeneratedColumn() indica que essse atributo sera uma coluna com PRIMARY KEY no banco de dados
    @PrimaryGeneratedColumn()
    id:number;
    
    // @Column marca o atribulo como uma coluna "normal"
    // length dis qual e o tamanho maximo de caracteres
    // nullable:false diz que não pode ser nula (tipo o NOT NULL)
    @Column({length:150, nullable:false})
    name:string;

    // Unique:true marca a coluna tendo um valor unico (que não pode repetir)
    @Column({length:100, unique:true})
    email:string;
    
    @Column({select:false})
    password:string;

    // @OneToMany indica que o User pode ter varios posts
    // Precisamos passar dois parametros:
    // () => Post => função que retorna a entidade relacionada
    // post => post.user -> indica qual a propriedade na classe Post que referencia o User
    // Com tudo isso definido, o TypeORM consegue criar automaticamente as ligações entre as tabelas e as chaves estrangeiras
    // Temos que fazer sempre para todos os envolvidos, nesse caso, tanto para user quanto para Post.
    @OneToMany(() => Post, post => post.user)
    posts:Post[]
 }