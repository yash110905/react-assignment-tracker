import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [assignment, setAssignment] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const [assignments, setAssignments] = useState(() => {
    const savedAssignments = localStorage.getItem("assignments");

    return savedAssignments
      ? JSON.parse(savedAssignments)
      : [];
  });


  // Save assignments to Local Storage
  useEffect(() => {
    localStorage.setItem(
      "assignments",
      JSON.stringify(assignments)
    );
  }, [assignments]);


  const addAssignment = () => {
    if (assignment.trim() === "") return;

    const newAssignment = {
      id: Date.now(),
      title: assignment,
      dueDate,
      priority,
      completed: false
    };

    setAssignments([
      ...assignments,
      newAssignment
    ]);

    setAssignment("");
    setDueDate("");
    setPriority("Medium");
  };


  const deleteAssignment = (id) => {
    setAssignments(
      assignments.filter(
        (item) => item.id !== id
      )
    );
  };


  const toggleComplete = (id) => {
    setAssignments(
      assignments.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed
            }
          : item
      )
    );
  };


  // Search + Filter
  const filteredAssignments = assignments
    .filter((item) =>
      item.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((item) => {

      if (filter === "Completed") {
        return item.completed;
      }

      if (filter === "Pending") {
        return !item.completed;
      }

      return true;

    });


  return (
    <div className="container">

      <h1>Assignment Tracker</h1>


      {/* Add Assignment */}
      <div className="input-section">

        <input
          type="text"
          placeholder="Assignment name"
          value={assignment}
          onChange={(e) =>
            setAssignment(e.target.value)
          }
        />


        <input
          type="date"
          value={dueDate}
          onChange={(e) =>
            setDueDate(e.target.value)
          }
        />


        <select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value)
          }
        >
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>


        <button onClick={addAssignment}>
          Add Assignment
        </button>

      </div>


      <h2>My Assignments</h2>


      {/* Search */}
      <input
        className="search-box"
        type="text"
        placeholder="Search assignments..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* Filters */}
      <div className="filter-buttons">

        <button onClick={() => setFilter("All")}>
          All
        </button>

        <button onClick={() => setFilter("Completed")}>
          Completed
        </button>

        <button onClick={() => setFilter("Pending")}>
          Pending
        </button>

      </div>



      <ul>

        {filteredAssignments.map((item) => (

          <li key={item.id}>

            <input
              type="checkbox"
              checked={item.completed}
              onChange={() =>
                toggleComplete(item.id)
              }
            />


            <span
              className={
                item.completed
                  ? "assignment-info completed"
                  : "assignment-info"
              }
            >

              <b>{item.title}</b>

              <br />

              Due: {item.dueDate || "No date"}

              <br />


              <div
                className={`priority-${item.priority.toLowerCase()}`}
              >
                Priority: {item.priority}
              </div>


            </span>


            <button
              className="delete-btn"
              onClick={() =>
                deleteAssignment(item.id)
              }
            >
              Delete
            </button>


          </li>

        ))}

      </ul>


    </div>
  );
}

export default App;