import express, { Application } from "express";
import ip from "ip";
import cors from "cors";

import {Code} from "../src/enum/code.enum";

export class App {
    private readonly app: Application;
    private readonly APPLICATION_RUNNING = "Application running on";
    private readonly ROUTE_NOT_FOUND =  "Route does not exist";

    constructor(private  readonly port: (string | number) = process.env.SERVER_PORT || 3000){
        this.app = express();
        this.middleWare();
        this.routes();
    }

    listen(): void {

    this.app.listen(this.port);
    console.info(`${this.APPLICATION_RUNNING} ${ip.address()}:${this.port}`)
 }

    private middleWare(): void {
     this.app.use(cors({origin: '*'}));
     this.app.use(express.json())
    }
    private routes() {
        this.app.use('/patients', (req, res) => {})
        this.app.get('/', (req, res) => res.status(Code.OK).send({message: 'Server is up now'}))
        this.app.all('*', (req, res) => res.status(Code.NOT_FOUND).send({message: this.ROUTE_NOT_FOUND}))
    }
}