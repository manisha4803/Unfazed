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
    }).sort({ createdAt: -1 });

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

const updateClient = async (req, res) => {
  try {
    const client = await Client.findOneAndUpdate(
      { _id: req.params.id, therapist: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client updated successfully",
      client,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteClient = async (req, res) => {
  try {
    const client = await Client.findOneAndDelete({
      _id: req.params.id,
      therapist: req.user.id,
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        message: "Client not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Client deleted successfully",
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
  updateClient,
  deleteClient,
};