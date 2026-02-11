import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch {
        logout();
      }
    };
    fetchProfile();
  }, []);

  /* ================= FETCH TASKS ================= */
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await api.get("/tasks");
        setTasks(res.data);
      } catch {
        logout();
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  /* ================= ADD TASK ================= */
  const addTask = async () => {
    if (!task.trim()) return;

    try {
      const res = await api.post("/tasks", { title: task });
      setTasks((prev) => [res.data, ...prev]);
      setTask("");
    } catch {
      alert("Failed to add task");
    }
  };

  /* ================= DELETE TASK ================= */
  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/${id}`);
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  /* ================= UPDATE TASK ================= */
  const updateTask = async (id, newTitle) => {
    if (!newTitle.trim()) return;

    try {
      const res = await api.put(`/tasks/${id}`, { title: newTitle });
      setTasks((prev) =>
        prev.map((t) => (t._id === id ? res.data : t))
      );
    } catch {
      alert("Update failed");
    }
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={wrapperStyle}>
      <div style={cardStyle}>
        {/* HEADER */}
        <div style={headerStyle}>
          <div>
            <h2 style={{ color: "white", margin: 0 }}>
              My Dashboard
            </h2>
            {user && (
              <p style={{ color: "#e5e7eb", fontSize: "14px", marginTop: "4px" }}>
                {user.name} • {user.email}
              </p>
            )}
          </div>
          <button onClick={logout} style={logoutStyle}>
            Logout
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={searchStyle}
        />

        {/* ADD TASK */}
        <div style={addWrapper}>
          <input
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a new task"
            style={inputStyle}
          />
          <button onClick={addTask} style={buttonStyle}>
            Add
          </button>
        </div>

        {/* TASK LIST */}
        <div style={{ marginTop: "20px" }}>
          {loading && (
            <p style={{ color: "#e5e7eb", textAlign: "center" }}>
              Loading tasks...
            </p>
          )}

          {!loading && filteredTasks.length === 0 && (
            <p style={{ color: "#e5e7eb", textAlign: "center" }}>
              No tasks found
            </p>
          )}

          {filteredTasks.map((t) => (
            <div key={t._id} style={taskStyle}>
              <input
                defaultValue={t.title}
                onBlur={(e) =>
                  updateTask(t._id, e.target.value)
                }
                style={editInput}
              />
              <button
                onClick={() => deleteTask(t._id)}
                style={deleteStyle}
              >
                ✕
              </button>
            </div>
          ))}
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
  padding: "20px", // 🔥 mobile support
};

const cardStyle = {
  width: "100%",
  maxWidth: "700px", // 🔥 responsive
  background: "#4b4c6a",
  padding: "30px",
  borderRadius: "18px",
  boxShadow: "0 25px 50px rgba(0,0,0,0.45)",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "10px",
};

const logoutStyle = {
  background: "transparent",
  border: "1px solid #ef4444",
  color: "#ef4444",
  padding: "6px 12px",
  borderRadius: "6px",
  cursor: "pointer",
};

const searchStyle = {
  width: "100%",
  padding: "8px",
  borderRadius: "6px",
  border: "1px solid #9ca3af",
  marginTop: "15px",
  background: "transparent",
  color: "white",
};

const addWrapper = {
  display: "flex",
  gap: "10px",
  marginTop: "15px",
  flexWrap: "wrap",
};

const inputStyle = {
  flex: 1,
  minWidth: "200px",
  padding: "10px",
  borderRadius: "6px",
  border: "1px solid #9ca3af",
  background: "transparent",
  color: "white",
};

const buttonStyle = {
  background: "#22d3ee",
  border: "none",
  borderRadius: "6px",
  padding: "10px 16px",
  fontWeight: "600",
  cursor: "pointer",
};

const taskStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "10px",
  padding: "10px",
  background: "#3f405c",
  borderRadius: "6px",
};

const editInput = {
  background: "transparent",
  border: "none",
  color: "white",
  width: "80%",
  outline: "none",
};

const deleteStyle = {
  background: "transparent",
  border: "none",
  color: "#ef4444",
  cursor: "pointer",
};
