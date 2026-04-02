import { useState, useRef } from "react";

const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Instrument+Sans:wght@400;500;600&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    background: #f2efe8;
    min-height: 100vh;
    font-family: 'Instrument Sans', sans-serif;
    display: flex;
    justify-content: center;
    padding: 60px 20px;
  }

  .wrap { width: 100%; max-width: 560px; }

  /* ── Top bar ── */
  .topbar {
    display: flex;
    align-items: baseline;
    justify-content: space-between;
    border-bottom: 3px solid #111;
    padding-bottom: 12px;
    margin-bottom: 32px;
  }

  .logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 64px;
    letter-spacing: 2px;
    color: #111;
    line-height: 1;
  }

  .meta {
    text-align: right;
    font-size: 11px;
    color: #888;
    line-height: 1.7;
    letter-spacing: 0.5px;
  }

  .meta strong { color: #111; font-weight: 600; }

  /* ── Input row ── */
  .input-row {
    display: flex;
    gap: 0;
    margin-bottom: 40px;
    border: 2px solid #111;
    background: #fff;
  }

  .inp {
    flex: 1;
    border: none;
    outline: none;
    padding: 14px 18px;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 15px;
    background: transparent;
    color: #111;
  }

  .inp::placeholder { color: #bbb; }

  .add {
    background: #ffe500;
    border: none;
    border-left: 2px solid #111;
    padding: 0 22px;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 22px;
    letter-spacing: 1px;
    color: #111;
    cursor: pointer;
  }

  .add:hover { background: #f0d800; }
  .add:active { background: #d4be00; }

  /* ── Section label ── */
  .section-label {
    font-size: 10px;
    letter-spacing: 3px;
    text-transform: uppercase;
    color: #aaa;
    margin-bottom: 12px;
    font-weight: 600;
  }

  /* ── Task list ── */
  .list { display: flex; flex-direction: column; }

  .task {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 18px 0;
    border-bottom: 1.5px solid #ddd;
    position: relative;
  }

  .num {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 28px;
    color: #ddd;
    line-height: 1;
    min-width: 32px;
    user-select: none;
  }

  .task:hover .num { color: #bbb; }

  .task-body { flex: 1; min-width: 0; padding-top: 3px; }

  .task-text {
    font-size: 16px;
    font-weight: 500;
    color: #111;
    line-height: 1.4;
    cursor: pointer;
    display: inline;
  }

  .task-text.done {
    color: #bbb;
    text-decoration: line-through;
  }

  .task-sub {
    font-size: 11px;
    color: #bbb;
    margin-top: 4px;
    letter-spacing: 0.4px;
  }

  .task-actions {
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
    opacity: 0;
  }

  .task:hover .task-actions { opacity: 1; }

  .tick-btn {
    background: transparent;
    border: 1.5px solid #ccc;
    width: 20px; height: 20px;
    border-radius: 50%;
    cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0;
  }

  .tick-btn:hover { border-color: #111; }

  .tick-btn.done {
    background: #111;
    border-color: #111;
  }

  .tick-btn svg {
    width: 10px; height: 10px;
    stroke: #f2efe8;
    stroke-width: 2.5;
    fill: none;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  .del-btn {
    background: transparent;
    border: none;
    color: #ccc;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    padding: 0 2px;
    display: none;
  }

  .task:hover .del-btn { display: block; }
  .del-btn:hover { color: #e05a3a; }

  /* ── Empty ── */
  .empty {
    padding: 48px 0;
    font-size: 13px;
    color: #bbb;
    text-align: center;
    letter-spacing: 0.5px;
  }

  /* ── Footer ── */
  .footer {
    margin-top: 28px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #aaa;
  }

  .filters { display: flex; gap: 4px; }

  .fb {
    border: 1.5px solid transparent;
    background: transparent;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    padding: 5px 10px;
    cursor: pointer;
    color: #aaa;
    font-weight: 600;
  }

  .fb:hover { color: #111; border-color: #111; }
  .fb.on { color: #111; border-color: #111; background: #ffe500; }

  .clear {
    background: transparent;
    border: none;
    font-family: 'Instrument Sans', sans-serif;
    font-size: 11px;
    letter-spacing: 1px;
    text-transform: uppercase;
    font-weight: 600;
    color: #e05a3a;
    cursor: pointer;
    opacity: 0.6;
  }

  .clear:hover { opacity: 1; }
`;

let uid = 3;

export default function App() {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Call mom back", done: false, time: "9:41 AM" },
    { id: 2, text: "Submit the assignment", done: true, time: "Yesterday" },
  ]);
  const [val, setVal] = useState("");
  const [filter, setFilter] = useState("all");
  const ref = useRef();

  const add = () => {
    const t = val.trim();
    if (!t) return;
    const now = new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    setTasks(p => [{ id: uid++, text: t, done: false, time: now }, ...p]);
    setVal("");
    ref.current?.focus();
  };

  const toggle = id => setTasks(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));
  const remove = id => setTasks(p => p.filter(t => t.id !== id));

  const visible = tasks.filter(t =>
    filter === "active" ? !t.done : filter === "done" ? t.done : true
  );

  const left = tasks.filter(t => !t.done).length;
  const done = tasks.filter(t => t.done).length;

  const date = new Date().toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric" });

  return (
    <>
      <style>{CSS}</style>
      <div className="wrap">

        <div className="topbar">
          <div className="logo">Today.</div>
          <div className="meta">
            {date}<br />
            <strong>{left}</strong> left · <strong>{done}</strong> done
          </div>
        </div>

        <div className="input-row">
          <input
            ref={ref}
            className="inp"
            placeholder="What needs to be done?"
            value={val}
            onChange={e => setVal(e.target.value)}
            onKeyDown={e => e.key === "Enter" && add()}
          />
          <button className="add" onClick={add}>ADD</button>
        </div>

        <div className="section-label">
          {filter === "all" ? "All tasks" : filter === "active" ? "Active" : "Completed"}
        </div>

        {visible.length === 0
          ? <div className="empty">Nothing here.</div>
          : <div className="list">
              {visible.map((task, i) => (
                <div key={task.id} className="task">
                  <div className="num">{String(i + 1).padStart(2, "0")}</div>

                  <div className="task-body">
                    <div
                      className={`task-text ${task.done ? "done" : ""}`}
                      onClick={() => toggle(task.id)}
                    >
                      {task.text}
                    </div>
                    <div className="task-sub">{task.time}</div>
                  </div>

                  <div className="task-actions">
                    <button
                      className={`tick-btn ${task.done ? "done" : ""}`}
                      onClick={() => toggle(task.id)}
                    >
                      {task.done && (
                        <svg viewBox="0 0 10 10">
                          <polyline points="1.5,5 4,7.5 8.5,2.5" />
                        </svg>
                      )}
                    </button>
                    <button className="del-btn" onClick={() => remove(task.id)}>×</button>
                  </div>
                </div>
              ))}
            </div>
        }

        <div className="footer">
          <div className="filters">
            {["all", "active", "done"].map(f => (
              <button key={f} className={`fb ${filter === f ? "on" : ""}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          {done > 0 && (
            <button className="clear" onClick={() => setTasks(p => p.filter(t => !t.done))}>
              Clear done
            </button>
          )}
        </div>

      </div>
    </>
  );
}
