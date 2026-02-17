const express = require('express');
const { body, param } = require('express-validator');
const {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
} = require('../controllers/appointmentController');
const validateRequest = require('../middleware/validateRequest');

const router = express.Router();

const appointmentValidationRules = [
  body('patientName').trim().notEmpty().withMessage('Patient name is required'),
  body('patientEmail').isEmail().withMessage('Valid patient email is required'),
  body('doctorName').trim().notEmpty().withMessage('Doctor name is required'),
  body('specialization').trim().notEmpty().withMessage('Specialization is required'),
  body('appointmentDate')
    .isISO8601()
    .withMessage('Appointment date must be a valid ISO date')
    .custom((value) => new Date(value) > new Date())
    .withMessage('Appointment date must be in the future'),
  body('status')
    .optional()
    .isIn(['BOOKED', 'COMPLETED', 'CANCELLED'])
    .withMessage('Status must be BOOKED, COMPLETED, or CANCELLED'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes max length is 500'),
];

const appointmentUpdateValidationRules = [
  param('id').isMongoId().withMessage('Valid appointment ID is required'),
  body('patientEmail').optional().isEmail().withMessage('Valid patient email is required'),
  body('appointmentDate')
    .optional()
    .isISO8601()
    .withMessage('Appointment date must be a valid ISO date'),
  body('status')
    .optional()
    .isIn(['BOOKED', 'COMPLETED', 'CANCELLED'])
    .withMessage('Status must be BOOKED, COMPLETED, or CANCELLED'),
  body('notes').optional().isLength({ max: 500 }).withMessage('Notes max length is 500'),
];

router.post('/', appointmentValidationRules, validateRequest, createAppointment);
router.get('/', getAllAppointments);
router.patch('/:id', appointmentUpdateValidationRules, validateRequest, updateAppointment);
router.delete(
  '/:id',
  [param('id').isMongoId().withMessage('Valid appointment ID is required')],
  validateRequest,
  cancelAppointment
);

module.exports = router;
