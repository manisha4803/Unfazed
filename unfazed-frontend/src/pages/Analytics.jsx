import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/analytics.css";

function Analytics() {

  const [analytics, setAnalytics] = useState({
    totalClients: 0,
    totalAppointments: 0,
    completedAppointments: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const res = await API.get("/analytics");
      setAnalytics(res.data.analytics);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="analytics-page">

      <h1>Analytics</h1>

      <div className="analytics-grid">

        <div className="box green">
          <h3>Total Clients</h3>
          <h1>{analytics.totalClients}</h1>
        </div>

        <div className="box blue">
          <h3>Total Appointments</h3>
          <h1>{analytics.totalAppointments}</h1>
        </div>

        <div className="box orange">
          <h3>Completed</h3>
          <h1>{analytics.completedAppointments}</h1>
        </div>

        <div className="box purple">
          <h3>Total Revenue</h3>
          <h1>₹ {analytics.totalRevenue}</h1>
        </div>

      </div>

      <div className="summary">

        <h2>Performance Summary</h2>

        <p>
          ✔ Total Clients : {analytics.totalClients}
        </p>

        <p>
          ✔ Total Sessions : {analytics.totalAppointments}
        </p>

        <p>
          ✔ Completed Sessions : {analytics.completedAppointments}
        </p>

        <p>
          ✔ Revenue Generated : ₹ {analytics.totalRevenue}
        </p>

      </div>

    </div>
  );
}

export default Analytics;