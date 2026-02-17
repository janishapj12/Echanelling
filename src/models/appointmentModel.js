const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema(
  {
    patientName: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
      maxlength: [100, 'Patient name cannot exceed 100 characters'],
    },
    patientEmail: {
      type: String,
      required: [true, 'Patient email is required'],
      lowercase: true,
      trim: true,
    },
    doctorName: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
      maxlength: [100, 'Doctor name cannot exceed 100 characters'],
    },
    specialization: {
      type: String,
      required: [true, 'Specialization is required'],
      trim: true,
      maxlength: [100, 'Specialization cannot exceed 100 characters'],
    },
    appointmentDate: {
      type: Date,
      required: [true, 'Appointment date is required'],
    },
    status: {
      type: String,
      enum: ['BOOKED', 'COMPLETED', 'CANCELLED'],
      default: 'BOOKED',
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Notes cannot exceed 500 characters'],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
