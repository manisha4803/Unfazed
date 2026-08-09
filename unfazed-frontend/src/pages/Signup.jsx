import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import "../styles/auth.css";

function Signup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setErrorMsg("");
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (!form.name.trim() || !form.email.trim() || !form.password) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (form.password !== form.confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    if (form.password.length < 6) {
      setErrorMsg("Password must be at least 6 characters long.");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/signup", {
        name: form.name.trim(),
        email: form.email.trim(),
        password: form.password,
      });

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.therapist) {
          localStorage.setItem("therapist", JSON.stringify(res.data.therapist));
        }
        navigate("/dashboard");
      }

    } catch (err) {
      if (!err.response) {
        setErrorMsg("Unable to connect to the backend server. Please make sure backend is running on http://localhost:5001.");
      } else {
        setErrorMsg(err.response?.data?.message || err.response?.data?.error || "Signup Failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="left-panel">
        <h1>Unfazed</h1>

        <h2>
          Begin your healing
          <br />
          journey today.
        </h2>

        <p>
          Create your therapist account and manage
          clients, appointments and sessions.
        </p>
      </div>

      <div className="login-card">

        <h2>Create Account 🌿</h2>

        <p>Signup to continue</p>

        {errorMsg && <div style={{ color: "#d9534f", marginBottom: "15px", fontSize: "14px", fontWeight: 500 }}>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />

          <div className="password-group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <div className="password-group">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="password-toggle-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Create Account"}
          </button>

        </form>

        <span>
          Already have an account?
          <Link to="/"> Login</Link>
        </span>

      </div>

    </div>
  );
}

export default Signup;