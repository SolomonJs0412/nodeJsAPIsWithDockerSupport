import express, { Application, Request, Response } from "express";
import ip from "ip";
import cors from "cors";

import {Code} from './enum/code.enum';
import {Status} from './enum/status.enum';
import { HttpResponse } from './domain/response';
import  patientRoutes from './routes/patient.routes'

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
        this.app.use('/patients', patientRoutes)
        this.app.get('/', (req: Request, res: Response) => 
            res.status(Code.OK).send(new HttpResponse(Code.OK, Status.OK, "This is api v1.0")));
        this.app.all('*', (req: Request, res: Response) => 
            res.status(Code.NOT_FOUND).send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, this.ROUTE_NOT_FOUND)))
    }
}

