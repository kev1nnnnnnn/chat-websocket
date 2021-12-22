import { serverHttp } from "./http";
import "./websocket";

serverHttp.listen(3000, () => console.log("Servidor rodando na porta 3000"));