import { useEffect, useState } from "react";
import API from "../services/api";
import "./Navbar.css";

function Navbar() {
  const [therapist, setTherapist] = useState(null);

  useEffect(() => {
    fetchTherapist();
  }, []);

  const fetchTherapist = async () => {
    try {
      const res = await API.get("/auth/me");
      if (res.data.success && res.data.therapist) {
        setTherapist(res.data.therapist);
        localStorage.setItem("therapist", JSON.stringify(res.data.therapist));
      }
    } catch {
      const stored = localStorage.getItem("therapist");
      if (stored) {
        try {
          setTherapist(JSON.parse(stored));
        } catch (e) {
          console.error(e);
        }
      }
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning 👋";
    if (hour < 17) return "Good Afternoon 👋";
    return "Good Evening 👋";
  };

  const name = therapist?.name || "Therapist";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="navbar">
      <div>
        <h2>{getGreeting()}</h2>
        <p>Welcome back, {name}</p>
      </div>

      <div className="profile">
        <div className="avatar">
          {initial}
        </div>
      </div>
    </div>
  );
}

export default Navbar;