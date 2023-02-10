import {App} from './app';
import { connection } from "./config/mysql.config";
const init = (): void => {
    const app = new App();
    app.listen();
}
connection();
init();