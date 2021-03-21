import React, { useEffect, useState } from "react";

const REPO_URL = "https://api.github.com/repos/josscii/micro-blog";

export default function Count() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    function fetchData() {
      fetch(REPO_URL, {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setCount(data.open_issues_count);
        })
        .catch(console.log);
    }

    fetchData();
  }, []);

  return <p>总计{count}条</p>;
}
