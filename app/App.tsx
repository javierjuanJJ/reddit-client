import React, { useState } from "react";
import "./App.css";
import Lane from "./Lane";

function App() {
  const [lanes, setLanes] = useState([]);

  return (
    <div className="app">
      <h1>Reddit Multi-Lane Client</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const name = e.target.subreddit.value.trim();
          if (name && !lanes.includes(name)) setLanes([...lanes, name]);
          e.target.reset();
        }}
      >
        <input name="subreddit" placeholder="Add subreddit..." />
        <button type="submit">Add Lane</button>
      </form>

      <div className="lanes">
        {lanes.map((sub) => (
          <div key={sub} className="lane">
            <h2>r/{sub}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}



export default App;