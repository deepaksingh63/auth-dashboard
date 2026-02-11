import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    // Basic client-side validation
    if (!name.trim() || !email.trim() || !password.trim()) {
      setError("All fields are required");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        <h1 style={titleStyle}>Create Account</h1>

        <form onSubmit={handleRegister}>
          <label style={labelStyle}>Name</label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Email</label>
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <label style={labelStyle}>Password</label>
          <input
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          {/* ✅ INLINE ERROR MESSAGE */}
          {error && (
            <p style={errorStyle}>
              {error}
            </p>
          )}

          <button style={buttonStyle} disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "18px" }}>
          <Link to="/login" style={{ color: "#22d3ee" }}>
            Already have an account? Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ================= STYLES ================= */

const wrapperStyle = {
  position: "fixed",
  inset: 0,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "#3f405c",
  padding: "20px",
};

const cardStyle = {
  width: "100%",
  maxWidth: "420px",
  background: "#4b4c6a",
  padding: "40px",
  borderRadius: "18px",
  boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
};

const titleStyle = {
  textAlign: "center",
  fontSize: "22px",
  fontWeight: 600,
  marginBottom: "32px",
  color: "white",
};

const labelStyle = {
  color: "#e5e7eb",
  fontSize: "14px",
};

const inputStyle = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid #9ca3af",
  padding: "8px 0",
  marginBottom: "20px",
  color: "white",
  outline: "none",
};

const buttonStyle = {
  width: "100%",
  marginTop: "20px",
  padding: "12px",
  background: "#22d3ee",
  border: "none",
  borderRadius: "8px",
  fontWeight: "600",
  cursor: "pointer",
};

const errorStyle = {
  color: "#f87171",
  fontSize: "14px",
  marginTop: "-10px",
  marginBottom: "10px",
};
