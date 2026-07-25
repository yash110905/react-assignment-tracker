import { useState } from "react";

function App() {
  const [assignment, setAssignment] = useState("");
  const [assignments, setAssignments] = useState([]);

  const addAssignment = () => {
    if (assignment.trim() === "") return;

    setAssignments([
      ...assignments,
      assignment
    ]);

    setAssignment("");
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
        {assignments.map((item, index) => (
          <li key={index}>
            {item}
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;