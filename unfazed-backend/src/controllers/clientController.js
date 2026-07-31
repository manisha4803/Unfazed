const Client = require("../models/Client");

const createClient = async (req, res) => {
  try {
    const client = await Client.create({
      therapist: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      success: true,
      client,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getClients = async (req, res) => {
  try {
    const clients = await Client.find({
      therapist: req.user.id,
    });

    res.status(200).json({
      success: true,
      clients,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createClient,
  getClients,
};