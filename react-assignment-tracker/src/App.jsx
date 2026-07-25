import { useState } from "react";

function App() {
  const [assignment, setAssignment] = useState("");

  return (
    <div>
      <h1>Assignment Tracker</h1>

      <input
        type="text"
        placeholder="Enter assignment name"
        value={assignment}
        onChange={(e) => setAssignment(e.target.value)}
      />

      <p>Assignment: {assignment}</p>
    </div>
  );
}

export default App;