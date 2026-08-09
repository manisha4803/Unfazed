import { NavLink, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaChartBar,
  FaStickyNote,
  FaBell,
  FaSignOutAlt,
} from "react-icons/fa";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("therapist");
    navigate("/");
  };

  return (
    <div className="sidebar">

      <div className="logo">
        🌿 <span>Unfazed</span>
      </div>

      <nav>

        <NavLink to="/dashboard">
          <FaHome />
          Dashboard
        </NavLink>

        <NavLink to="/profile">
          <FaUserMd />
          Profile
        </NavLink>

        <NavLink to="/clients">
          <FaUsers />
          Clients
        </NavLink>

        <NavLink to="/appointments">
          <FaCalendarAlt />
          Appointments
        </NavLink>

        <NavLink to="/payments">
          <FaMoneyBillWave />
          Payments
        </NavLink>

        <NavLink to="/session-notes">
          <FaStickyNote />
          Session Notes
        </NavLink>

        <NavLink to="/notifications">
          <FaBell />
          Notifications
        </NavLink>

        <NavLink to="/analytics">
          <FaChartBar />
          Analytics
        </NavLink>

      </nav>

      <button className="logout" onClick={logout}>
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default Sidebar;