import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3333, () => console.log("Servidor rodando na porta 3333"));