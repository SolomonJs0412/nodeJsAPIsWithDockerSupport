"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const patientRoutes = (0, express_1.Router)();
const patient_controller_1 = require("../controllers/patient.controller");
patientRoutes.route('/')
    .get(patient_controller_1.getPatients)
    .post(patient_controller_1.createPatient);
patientRoutes.route('/:patientId')
    .get(patient_controller_1.getPatient)
    .put(patient_controller_1.updatePatient)
    .delete(patient_controller_1.deletePatient);
exports.default = patientRoutes;
//# sourceMappingURL=patient.routes.js.map