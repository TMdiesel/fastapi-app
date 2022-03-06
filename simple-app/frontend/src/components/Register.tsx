import { useState, useEffect } from "react";
export const Register = (): JSX.Element => {
  const [posts, setPosts] = useState([] as any[]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts", { method: "GET" })
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
      });
  }, []);
  console.log(posts[0]);

  return (
    <div>
      <h1>register</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
};
