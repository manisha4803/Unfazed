import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import API from "../services/api";
import "../styles/auth.css";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        if (res.data.therapist) {
          localStorage.setItem("therapist", JSON.stringify(res.data.therapist));
        }
        navigate("/dashboard");
      }
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Login Failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">

      <div className="left-panel">

        <h1>Unfazed</h1>

        <h2>
          Healing begins with
          <br />
          one calm step.
        </h2>

        <p>
          A peaceful platform for therapists to manage
          appointments, clients and sessions.
        </p>

      </div>

      <div className="login-card">

        <h2>Welcome Back 👋</h2>

        <p>Please login to continue</p>

        {errorMsg && <div style={{ color: "#d9534f", marginBottom: "15px", fontSize: "14px", fontWeight: 500 }}>{errorMsg}</div>}

        <form onSubmit={handleSubmit}>

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

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        <span>
          Don't have an account?
          <Link to="/signup"> Signup</Link>
        </span>

      </div>

    </div>
  );
}

export default Login;