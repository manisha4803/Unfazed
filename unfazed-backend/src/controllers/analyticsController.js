const Client = require("../models/Client");
const Appointment = require("../models/Appointment");
const SessionNote = require("../models/SessionNote");
const Payment = require("../models/Payment");

const getAnalytics = async (req, res) => {
  try {
    const therapist = req.user.id;

    const totalClients = await Client.countDocuments({ therapist });

    const totalAppointments = await Appointment.countDocuments({ therapist });

    const completedAppointments = await Appointment.countDocuments({
      therapist,
      status: "Completed",
    });

    const totalNotes = await SessionNote.countDocuments({ therapist });

    const totalRevenue = await Payment.aggregate([
      {
        $match: {
          therapist: req.user.id,
          status: "Paid",
        },
      },
      {
        $group: {
          _id: null,
          revenue: { $sum: "$amount" },
        },
      },
    ]);

    res.status(200).json({
      success: true,
      analytics: {
        totalClients,
        totalAppointments,
        completedAppointments,
        totalNotes,
        revenue: totalRevenue[0]?.revenue || 0,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = { getAnalytics };