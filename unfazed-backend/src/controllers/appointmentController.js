const Appointment = require("../models/Appointment");
const Client = require("../models/Client");

const createAppointment = async (req, res) => {
  try {
    const { client, clientName, clientEmail, clientPhone, date, time, mode, status, notes } = req.body;

    let cName = clientName;
    let cEmail = clientEmail;
    let cPhone = clientPhone;

    if (client && (!cName || !cEmail || !cPhone)) {
      const existingClient = await Client.findById(client);
      if (existingClient) {
        cName = cName || existingClient.name;
        cEmail = cEmail || existingClient.email;
        cPhone = cPhone || existingClient.phone;
      }
    }

    const appointment = await Appointment.create({
      therapist: req.user.id,
      client: client || undefined,
      clientName: cName || "Guest Client",
      clientEmail: cEmail || "",
      clientPhone: cPhone || "",
      date,
      time,
      mode: mode || "Online",
      status: status || "Pending",
      notes: notes || "",
    });

    const populatedAppointment = await Appointment.findById(appointment._id).populate("client", "name email phone");

    res.status(201).json({
      success: true,
      appointment: populatedAppointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({
      therapist: req.user.id,
    })
      .populate("client", "name email phone")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).populate("client", "name email phone");

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteAppointment = async (req, res) => {
  try {
    await Appointment.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
  deleteAppointment,
};