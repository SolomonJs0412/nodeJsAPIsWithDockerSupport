import { Request, Response } from "express";

import { Patient } from "../interface/patient.interface";
import { connection } from "../config/mysql.config" ;
import { QUERY } from "../query/patient.query";
import { Code } from "../enum/code.enum";
import { Status } from "../enum/status.enum";
import { HttpResponse } from '../domain/response';
import { FieldPacket, OkPacket, ResultSetHeader, RowDataPacket } from "mysql2";

type ResultSet = [RowDataPacket[] | RowDataPacket[][] | OkPacket | OkPacket[] | ResultSetHeader, FieldPacket[]];

//get all patients from database
export const getPatients = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`);
    try {
        const pool = await connection(); 
        const result: ResultSet = await pool.query(QUERY.SELECT_PATIENTS);
        return res.status(Code.OK)
                .send(new HttpResponse(Code.OK, Status.OK, "Retrieved", result[0]));
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
                .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Not received data cause error from server")); 
    }
}

//get single patient from database
export const getPatient = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`);
    try {
        const pool = await connection(); 
        const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
        //check if  found data
        if((result[0] as Array<ResultSet>).length > 0){
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, "Retrieved", result[0]));
        } else {
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Not found patient"));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
                .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Not received data cause error from server")); 
    }
}

//create patient
export const createPatient = async (req: Request, res: Response): Promise<Response<Patient>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`);
    let patientValue: Patient = {...req.body};
    try {
        const pool = await connection(); 
        const result: ResultSet = await pool.query(QUERY.CREATE_PATIENT, Object.values(patientValue));
        patientValue = {id: (result[0] as ResultSetHeader).insertId, ...req.body}    
        return res.status(Code.CREATED)
                    .send(new HttpResponse(Code.CREATED, Status.CREATED, "Retrieved", patientValue));
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
                .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Not received data cause error from server")); 
    }
}

//update patient
export const updatePatient = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`);
    let patientValue: Patient = {...req.body};
    try {
        const pool = await connection(); 
        const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
        //check if  found data
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.UPDATE_PATIENT, [...Object.values(patientValue), req.params.patientId]);
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, "Updated", {...patientValue, id: req.params.patientId}));
        } else {
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Not found patient"));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
                .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Not received data cause error from server")); 
    }
}

//delete patient
export const deletePatient = async (req: Request, res: Response): Promise<Response<Patient[]>> => {
    console.info(`[${new Date().toLocaleString()}] Incoming ${req.method}${req.originalUrl} request from ${req.rawHeaders[0]}${req.rawHeaders[1]}`);
    try {
        const pool = await connection(); 
        const result: ResultSet = await pool.query(QUERY.SELECT_PATIENT, [req.params.patientId]);
        //check if  found data
        if((result[0] as Array<ResultSet>).length > 0){
            const result: ResultSet = await pool.query(QUERY.DELETE_PATIENT, [req.params.patientId]);
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.OK, Status.OK, "Delete"));
        } else {
            return res.status(Code.OK)
                    .send(new HttpResponse(Code.NOT_FOUND, Status.NOT_FOUND, "Not found patient"));
        }
    } catch (error: unknown) {
        console.error(error);
        return res.status(Code.INTERNAL_SERVER_ERROR)
                .send(new HttpResponse(Code.INTERNAL_SERVER_ERROR, Status.INTERNAL_SERVER_ERROR, "Not received data cause error from server")); 
    }
}