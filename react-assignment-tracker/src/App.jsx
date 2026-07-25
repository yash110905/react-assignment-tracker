import { useState } from "react";

function App() {
  const [assignment, setAssignment] = useState("");
  const [assignments, setAssignments] = useState([]);

  const addAssignment = () => {
    if (assignment.trim() === "") return;

    const newAssignment = {
      id: Date.now(),
      title: assignment,
      completed: false
    };

    setAssignments([...assignments, newAssignment]);
    setAssignment("");
  };


  const deleteAssignment = (id) => {
    setAssignments(
      assignments.filter((item) => item.id !== id)
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


  return (
    <div>
      <h1>Assignment Tracker</h1>

      <input
        type="text"
        placeholder="Enter assignment name"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
      />

      <button onClick={addAssignment}>
        Add Assignment
      </button>


      <h2>My Assignments</h2>

      <ul>
        {assignments.map((item) => (
          <li key={item.id}>

            <input
              type="checkbox"
              checked={item.completed}
              onChange={() => toggleComplete(item.id)}
            />

            <span
              style={{
                textDecoration: item.completed
                  ? "line-through"
                  : "none"
              }}
            >
              {item.title}
            </span>


            <button
              onClick={() => deleteAssignment(item.id)}
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