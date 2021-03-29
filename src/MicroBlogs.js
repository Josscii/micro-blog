import React, { useEffect, useState } from "react";
import dayjs from "dayjs";
import oval from "./oval.svg";

const ISSUE_URL = "https://api.github.com/repos/josscii/micro-blog/issues";

export default function MicroBlogs() {
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchData() {
      fetch(ISSUE_URL, {
        headers: {
          accept: "application/vnd.github.v3+json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setIssues(data);
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    }

    setLoading(true);
    fetchData();
  }, []);

  const regex = /(?:!\[(.*?)\]\((.*?)\))/g;

  const parsedIssues = issues.map((issue) => {
    return {
      id: issue.id,
      date: dayjs(issue.created_at).format("YYYY-MM-DD HH:mm"),
      labels: issue.labels,
      body: issue.body.replace(regex, "").trim(),
      images: Array.from(issue.body.matchAll(regex)).map((match) => match[2]),
    };
  });

  return (
    <>
      <ul>
        {parsedIssues.map((issue) => (
          <li className="border rounded p-2 text-sm mb-2" key={issue.id}>
            <div className="flex justify-between mb-1">
              <p>
                <span>{issue.date}</span>
                {issue.labels[0] && (
                  <span
                    className="text-xs px-1 py-0.5 rounded ml-2"
                    style={{
                      color: "#" + issue.labels[0].color,
                      borderColor: "#" + issue.labels[0].color,
                      borderWidth: "1px",
                    }}
                  >
                    {issue.labels[0].name}
                  </span>
                )}
              </p>
            </div>
            <p
              className="text-base"
              style={{ whiteSpace: "pre-line", wordBreak: "break-word" }}
            >
              {issue.body}
            </p>
            {issue.images.map((image) => (
              <img className="mt-2" src={image} alt={image} key={image} />
            ))}
          </li>
        ))}
      </ul>
      {loading && <img className="mx-auto w-5 h-5" src={oval} alt="loading" />}
      {!loading && (
        <footer className="flex justify-center items-center">
          <span className="border-t border-gray-300 w-10"></span>
          <span className="text-sm text-gray-300 text-center py-4">到底了</span>
          <span className="border-t border-gray-300 w-10"></span>
        </footer>
      )}
    </>
  );
}
