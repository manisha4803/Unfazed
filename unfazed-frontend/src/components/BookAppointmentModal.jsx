import { useEffect, useState } from "react";
import API from "../services/api";
import "./BookAppointmentModal.css";

function BookAppointmentModal({ closeModal, refreshAppointments }) {
  const [clients, setClients] = useState([]);

  const [form, setForm] = useState({
    client: "",
    date: "",
    time: "",
    status: "Pending",
    notes: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data.clients || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/appointments", form);

      alert("Appointment Booked");

      refreshAppointments();

      closeModal();

    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="appointment-modal">

        <h2>Book Appointment</h2>

        <form onSubmit={handleSubmit}>

          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            required
          >
            <option value="">Select Client</option>

            {clients.map((client) => (
              <option
                key={client._id}
                value={client._id}
              >
                {client.name}
              </option>
            ))}

          </select>

          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Pending</option>
            <option>Confirmed</option>
          </select>

          <textarea
            name="notes"
            placeholder="Notes"
            value={form.notes}
            onChange={handleChange}
          />

          <div className="modal-btns">

            <button type="submit">
              Book
            </button>

            <button
              type="button"
              className="cancel-btn"
              onClick={closeModal}
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default BookAppointmentModal;