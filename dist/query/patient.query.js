"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUERY = void 0;
exports.QUERY = {
    SELECT_PATIENTS: 'SELECT * FROM patients ORDER BY created_at DESC LIMIT 30',
    SELECT_PATIENT: 'SELECT * FROM patients WHERE id = ? ',
    CREATE_PATIENT: 'INSERT INTO patients (first_name, last_name, email, address, diagnosis, phone, status, image_url) VALUES(?, ?, ?, ?, ?, ?, ?, ?)',
    UPDATE_PATIENT: 'UPDATE patients SET first_name = ?, last_name = ?, email = ?, address = ?, diagnosis = ?, phone = ?, status = ?, image_url = ? WHERE id = ?',
    DELETE_PATIENT: 'DELETE FROM patients WHERE id = ?'
};
//# sourceMappingURL=patient.query.js.map