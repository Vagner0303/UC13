import express from 'express';
import * as dotenv from 'dotenv';
import { AppDataSource } from './config/data-source';
import { errorHandler } from './middlewares/errorHandler';
import { routes } from "./routes/index";

const app = express();
dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());
app.use(routes);

// initialize() é um metodo do TypeORM que abre a conexão com o banco usando as configurações que escrevemos no data-source.
// then() -> a função dentro dele é executada se der certo
// catch -> a função dentro dele roda se houver erro
AppDataSource.initialize().then(() => {
    console.log("Banco conectado com sucesso!!!");
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log("Servidor backend no ar");
    });
}).catch((error) => console.log("Erro ao conectar com o banco: " + error));