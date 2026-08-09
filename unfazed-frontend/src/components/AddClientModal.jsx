import { useState, useEffect } from "react";
import API from "../services/api";
import "./AddClientModal.css";

function AddClientModal({ closeModal, refreshClients, clientToEdit = null }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    notes: "",
  });

  useEffect(() => {
    if (clientToEdit) {
      setForm({
        name: clientToEdit.name || "",
        email: clientToEdit.email || "",
        phone: clientToEdit.phone || "",
        age: clientToEdit.age || "",
        gender: clientToEdit.gender || "",
        notes: clientToEdit.notes || "",
      });
    }
  }, [clientToEdit]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (clientToEdit) {
        await API.put(`/clients/${clientToEdit._id}`, form);
        alert("Client Updated Successfully");
      } else {
        await API.post("/clients", form);
        alert("Client Added Successfully");
      }

      refreshClients();
      closeModal();
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>{clientToEdit ? "Edit Client" : "Add New Client"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <input
            placeholder="Age"
            name="age"
            value={form.age}
            onChange={handleChange}
          />

          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <textarea
            placeholder="Notes"
            name="notes"
            value={form.notes}
            onChange={handleChange}
          />

          <div className="modal-buttons">
            <button type="submit">
              {clientToEdit ? "Update" : "Save"}
            </button>

            <button
              type="button"
              className="cancel"
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

export default AddClientModal;