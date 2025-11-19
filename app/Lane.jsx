import React, { useEffect, useState } from "react";
import { fetchSubreddit } from "./fetchSubreddit";

function Lane({ subreddit, onRemove }) {
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    async function load() {
      try {
        setStatus("loading");
        const data = await fetchSubreddit(subreddit);
        setPosts(data);
        setStatus("done");
      } catch (err) {
        setStatus("error");
      }
    }
    load();
  }, [subreddit]);

  if (status === "loading") return <div className="lane">Loading r/{subreddit}...</div>;
  if (status === "error") return <div className="lane">Error loading r/{subreddit}</div>;

  return (
    <div className="lane">
      <div className="lane-header">
        <h2>r/{subreddit}</h2>
        <button onClick={() => onRemove(subreddit)}>✖</button>
      </div>
      {posts.slice(0, 10).map((p) => (
        <div key={p.id} className="post">
          {p.thumbnail && p.thumbnail.startsWith("http") && (
            <img src={p.thumbnail} alt="" className="thumb" />
          )}
          <a href={`https://reddit.com${p.permalink}`} target="_blank" rel="noreferrer">
            {p.title}
          </a>
          <p>by {p.author} • 👍 {p.ups}</p>
        </div>

      ))}
    </div>
  );
}

export default Lane;