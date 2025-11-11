export async function fetchSubreddit(subreddit) {
    const res = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
    if (!res.ok) throw new Error("Subreddit not found");
    const data = await res.json();
    return data.data.children.map((item) => item.data);
  }