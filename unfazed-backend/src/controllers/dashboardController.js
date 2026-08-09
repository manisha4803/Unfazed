const mongoose = require("mongoose");
const Client = require("../models/Client");
const Appointment = require("../models/Appointment");
const SessionNote = require("../models/SessionNote");
const Payment = require("../models/Payment");

const getDashboard = async (req, res) => {
  try {
    const therapistId = req.user.id;
    const therapistObjId = new mongoose.Types.ObjectId(therapistId);

    const totalClients = await Client.countDocuments({
      therapist: therapistId,
    });

    const totalAppointments = await Appointment.countDocuments({
      therapist: therapistId,
    });

    const totalNotes = await SessionNote.countDocuments({
      therapist: therapistId,
    });

    const totalRevenueResult = await Payment.aggregate([
      {
        $match: {
          therapist: therapistObjId,
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

    const totalRevenue = totalRevenueResult[0]?.revenue || 0;

    const upcomingAppointments = await Appointment.find({
      therapist: therapistId,
    })
      .populate("client", "name email phone")
      .sort({ date: 1, time: 1 })
      .limit(5);

    res.status(200).json({
      success: true,
      dashboard: {
        totalClients,
        totalAppointments,
        totalNotes,
        totalRevenue,
        upcomingAppointments,
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