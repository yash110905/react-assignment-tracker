import { useState, useEffect } from "react";

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


  // Search + Filter logic
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
    <div>

      <h1>Assignment Tracker</h1>


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


      <h2>My Assignments</h2>


      {/* Search */}
      <input
        type="text"
        placeholder="Search assignments..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />


      {/* Filters */}
      <div>
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
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none"
              }}
            >
              <b>{item.title}</b>

              <br />

              Due: {item.dueDate || "No date"}

              <br />

              Priority: {item.priority}

            </span>


            <button
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