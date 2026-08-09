import { useEffect, useState } from "react";
import API from "../services/api";
import StatCard from "../components/StatCard";
import "../styles/dashboard.css";

function Dashboard() {
  const [data, setData] = useState({
    totalClients: 0,
    totalAppointments: 0,
    totalRevenue: 0,
    totalNotes: 0,
    upcomingAppointments: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const res = await API.get("/dashboard");
      if (res.data.success && res.data.dashboard) {
        setData((prev) => ({
          ...prev,
          ...res.data.dashboard,
        }));
      }
    } catch (err) {
      console.error("Dashboard error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="cards">
        <StatCard
          title="Clients"
          value={loading ? "..." : data.totalClients}
          color="#72B37E"
        />

        <StatCard
          title="Appointments"
          value={loading ? "..." : data.totalAppointments}
          color="#5FA8D3"
        />

        <StatCard
          title="Revenue"
          value={loading ? "..." : `₹${data.totalRevenue || 0}`}
          color="#F4A261"
        />

        <StatCard
          title="Sessions"
          value={loading ? "..." : data.totalNotes}
          color="#A06CD5"
        />
      </div>

      <div className="dashboard-bottom">
        <div className="today-card">
          <h2>Upcoming Schedule 📅</h2>

          {data.upcomingAppointments && data.upcomingAppointments.length > 0 ? (
            data.upcomingAppointments.map((appt) => (
              <div className="schedule" key={appt._id}>
                <p>🕒 {appt.time} - {appt.date}</p>
                <span>{appt.client?.name || appt.clientName || "Client"}</span>
              </div>
            ))
          ) : (
            <p style={{ color: "#888", paddingTop: "10px" }}>No upcoming appointments scheduled.</p>
          )}
        </div>

        <div className="quote-card">
          <h2>Daily Reminder 🌿</h2>
          <p>
            Small conversations create
            meaningful healing.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;