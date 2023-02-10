import { Router } from 'express';

const patientRoutes = Router();
import { 
    getPatients, 
    getPatient, 
    createPatient, 
    updatePatient, 
    deletePatient } from "../controllers/patient.controller"

patientRoutes.route('/')
    .get(getPatients)
    .post(createPatient);

patientRoutes.route('/:patientId')
    .get(getPatient)
    .put(updatePatient)
    .delete(deletePatient);

export default patientRoutes;