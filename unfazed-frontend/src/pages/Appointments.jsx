import { useEffect, useState } from "react";
import API from "../services/api";
import BookAppointmentModal from "../components/BookAppointmentModal";
import "../styles/appointments.css";

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const res = await API.get("/appointments");
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.client?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="appointments-page">
      <div className="appointments-header">
        <h1>Appointments</h1>

        <button
          className="book-btn"
          onClick={() => setShowModal(true)}
        >
          + Book Appointment
        </button>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="Search client..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="appointments-grid">
        {filteredAppointments.length > 0 ? (
          filteredAppointments.map((appointment) => (
            <div
              className="appointment-card"
              key={appointment._id}
            >
              <h3>{appointment.client?.name}</h3>

              <p>📅 {appointment.date}</p>

              <p>🕒 {appointment.time}</p>

              <span
                className={`status ${appointment.status?.toLowerCase()}`}
              >
                {appointment.status}
              </span>
            </div>
          ))
        ) : (
          <h3>No Appointments Found</h3>
        )}
      </div>

      {showModal && (
        <BookAppointmentModal
          closeModal={() => setShowModal(false)}
          refreshAppointments={fetchAppointments}
        />
      )}
    </div>
  );
}

export default Appointments;