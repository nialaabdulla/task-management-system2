import { useState, useEffect } from "react";
import "../styles/dashboard.css";


export default function Dashboard() {

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [activeTab, setActiveTab] = useState("all");
  const [dark, setDark] = useState(false);

  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "in_progress",
  });

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const addTask = () => {
    if (!form.title.trim()) return;

    setTasks([
      ...tasks,
      { id: Date.now(), ...form },
    ]);

    setForm({ title: "", description: "", status: "in_progress" });
  };

  const updateStatus = (id, status) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    activeTab === "all"
      ? tasks
      : tasks.filter((t) => t.status === activeTab);

  const count = {
    all: tasks.length,
    important: tasks.filter(t => t.status === "important").length,
    completed: tasks.filter(t => t.status === "completed").length,
    in_progress: tasks.filter(t => t.status === "in_progress").length,
  };

  const badgeClass = (status) => {
    if (status === "completed") return "badge bg-success";
    if (status === "important") return "badge bg-warning text-dark";
    return "badge bg-info";
  };

  const label = (status) => {
    if (status === "completed") return "Completed";
    if (status === "important") return "Important";
    return "In Progress";
  };

  return (
    <div className={dark ? "min-vh-100 bg-dark text-light py-4" : "min-vh-100 bg-light py-4"}>
      <div className="container">

        {/* NAVBAR */}
        <nav className={`navbar navbar-expand-lg shadow-sm px-4 mb-4 rounded ${dark ? "bg-secondary" : "bg-white"}`}>
          <span className="navbar-brand fw-bold">
            <i className="bi bi-kanban me-2"></i>Task Manager
          </span>

          {/* FILTERS */}
          <div className="mx-auto">
            <ul className="navbar-nav flex-row gap-2">
              {[
                ["all", "Dashboard"],
                ["important", "Important"],
                ["completed", "Completed"],
                ["in_progress", "In Progress"],
              ].map(([key, text]) => (
                <li key={key} className="nav-item">
                  <button
                    className={`btn btn-sm ${
                      activeTab === key ? "btn-primary" : "btn-outline-primary"
                    }`}
                    onClick={() => setActiveTab(key)}
                  >
                    {text}
                    <span className="badge bg-light text-dark ms-1">
                      {count[key]}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="d-flex align-items-center gap-2">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() => setDark(!dark)}
            >
              <i className={`bi ${dark ? "bi-sun" : "bi-moon"}`}></i>
            </button>

            <div className="dropdown">
              <button
                className="btn d-flex align-items-center gap-2 border rounded-pill px-3"
                data-bs-toggle="dropdown"
              >
                <div
                  className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center"
                  style={{ width: 36, height: 36 }}
                >
                  U
                </div>
                <span className="fw-semibold">user</span>
              </button>

              <ul className="dropdown-menu dropdown-menu-end shadow-sm">
                <li className="px-3 py-2">
                  <strong>user</strong><br />
                  <small className="text-muted">user@gmail.com</small>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>
                    <i className="bi bi-box-arrow-right me-2"></i>Logout
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        {/* ADD TASK */}
        <button
          className="btn btn-primary mb-4"
          data-bs-toggle="modal"
          data-bs-target="#taskModal"
        >
          <i className="bi bi-plus-circle me-2"></i>Add Task
        </button>

        {/* TASK GRID */}
        {filteredTasks.length === 0 ? (
          <div className="text-center text-muted py-5">
            <i className="bi bi-inbox fs-1 d-block mb-2"></i>
            No tasks found
          </div>
        ) : (
          <div className="row">
            {filteredTasks.map((task) => (
              <div key={task.id} className="col-lg-4 col-md-6 mb-4">
                <div className={`card shadow-sm h-100 ${dark ? "bg-secondary text-light" : ""}`}>
                  <div className="card-body d-flex flex-column justify-content-between">

                    <div>
                      <h6 className="fw-bold">{task.title}</h6>
                      <p className="text-muted small">{task.description || "No description"}</p>
                      <span className={badgeClass(task.status)}>{label(task.status)}</span>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <select
                        className="form-select form-select-sm w-50"
                        value={task.status}
                        onChange={(e) => updateStatus(task.id, e.target.value)}
                      >
                        <option value="in_progress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="important">Important</option>
                      </select>

                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => deleteTask(task.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <div className="modal fade" id="taskModal" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add Task</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <div className="modal-body">
              <input
                className="form-control mb-2"
                placeholder="Task title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              <textarea
                className="form-control mb-2"
                placeholder="Task description"
                rows="3"
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
              <select
                className="form-select"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="important">Important</option>
              </select>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-success" data-bs-dismiss="modal" onClick={addTask}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
