const mongoose = require('mongoose');
const Appointment = require('../models/appointmentModel');
const ApiError = require('../utils/apiError');

/**
 * POST /api/v1/appointments
 * Book a new appointment.
 */
const createAppointment = async (req, res, next) => {
  try {
    const appointment = await Appointment.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: appointment,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * GET /api/v1/appointments
 * Retrieve all appointments.
 */
const getAllAppointments = async (req, res, next) => {
  try {
    const appointments = await Appointment.find().sort({ appointmentDate: 1 });

    return res.status(200).json({
      success: true,
      count: appointments.length,
      data: appointments,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * PATCH /api/v1/appointments/:id
 * Update appointment details.
 */
const updateAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, 'Invalid appointment ID'));
    }

    const appointment = await Appointment.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!appointment) {
      return next(new ApiError(404, 'Appointment not found'));
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      data: appointment,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * DELETE /api/v1/appointments/:id
 * Cancel an appointment by updating status to CANCELLED.
 */
const cancelAppointment = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return next(new ApiError(400, 'Invalid appointment ID'));
    }

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status: 'CANCELLED' },
      { new: true }
    );

    if (!appointment) {
      return next(new ApiError(404, 'Appointment not found'));
    }

    return res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createAppointment,
  getAllAppointments,
  updateAppointment,
  cancelAppointment,
};
