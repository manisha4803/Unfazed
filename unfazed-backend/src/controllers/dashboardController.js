const Client = require("../models/Client");
const Appointment = require("../models/Appointment");
const SessionNote = require("../models/SessionNote");

const getDashboard = async (req, res) => {
  try {
    const therapistId = req.user.id;

    const totalClients = await Client.countDocuments({
      therapist: therapistId,
    });

    const totalAppointments = await Appointment.countDocuments({
      therapist: therapistId,
    });

    const totalNotes = await SessionNote.countDocuments({
      therapist: therapistId,
    });

    res.status(200).json({
      success: true,
      dashboard: {
        totalClients,
        totalAppointments,
        totalNotes,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};