import { useState } from "react";

function App() {
  const [title, setTitle] = useState("");

  return (
    <div>
      <h1>Assignment Tracker</h1>

      <input
        type="text"
        placeholder="Enter assignment name"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p>You typed: {title}</p>
    </div>
  );
}

export default App;