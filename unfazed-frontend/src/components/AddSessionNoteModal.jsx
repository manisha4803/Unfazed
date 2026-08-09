import { useEffect, useState } from "react";
import API from "../services/api";
import "./AddClientModal.css";

function AddSessionNoteModal({ closeModal, refreshNotes }) {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    title: "",
    client: "",
    notes: "",
    mood: "Good",
    nextSessionDate: "",
  });

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await API.get("/clients");
      setClients(res.data.clients || []);
    } catch (err) {
      console.error(err);
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

    if (!form.client) {
      alert("Please select a client");
      return;
    }

    try {
      await API.post("/session-notes", form);
      alert("Session Note Created Successfully");
      refreshNotes();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to create note");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>New Session Note</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Note Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <select
            name="client"
            value={form.client}
            onChange={handleChange}
            required
          >
            <option value="">Select Client</option>
            {clients.map((client) => (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ))}
          </select>

          <select
            name="mood"
            value={form.mood}
            onChange={handleChange}
          >
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Average">Average</option>
            <option value="Poor">Poor</option>
          </select>

          <input
            type="date"
            name="nextSessionDate"
            value={form.nextSessionDate}
            onChange={handleChange}
          />

          <textarea
            placeholder="Session Details / Observations..."
            name="notes"
            rows="4"
            value={form.notes}
            onChange={handleChange}
            required
          />

          <div className="modal-buttons">
            <button type="submit">Save Note</button>
            <button type="button" className="cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddSessionNoteModal;
