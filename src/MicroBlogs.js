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
        .then((issues) => {
          const regex = /(?:!\[(.*?)\]\((.*?)\))/g;

          const parsedIssues = issues.map((issue) => {
            return {
              id: issue.id,
              date: dayjs(issue.created_at).format("YYYY-MM-DD HH:mm"),
              labels: issue.labels,
              body: issue.body.replace(regex, "").trim(),
              images: Array.from(issue.body.matchAll(regex)).map(
                (match) => match[2]
              ),
              canExpand: function () {
                return this.body.length > 400;
              },
              expanded: false,
              text: function () {
                return this.expanded || !this.canExpand()
                  ? this.body
                  : this.body.substring(0, 400) + "...";
              },
            };
          });

          setIssues(parsedIssues);
        })
        .catch(console.log)
        .finally(() => setLoading(false));
    }

    setLoading(true);
    fetchData();
  }, []);

  var handleExpandClick = (issueId) => {
    setIssues((issues) => {
      return issues.map((issue) => {
        if (issue.id === issueId) {
          return { ...issue, expanded: !issue.expanded };
        } else {
          return issue;
        }
      });
    });
  };

  return (
    <>
      <ul>
        {issues.map((issue) => (
          <li
            className="border border-theme-border-light dark:border-theme-border-dark rounded p-2 text-sm mb-2"
            key={issue.id}
          >
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
              {issue.text()}
              {issue.canExpand() && (
                <span
                  className="text-theme-link-light dark:text-theme-link-dark cursor-pointer ml-1"
                  onClick={() => {
                    handleExpandClick(issue.id);
                  }}
                >
                  {issue.expanded ? "收起" : "展开"}
                </span>
              )}
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
          <span className="border-t border-theme-border-light dark:border-theme-border-dark w-10"></span>
          <span className="text-sm text-theme-border-light dark:text-theme-border-dark text-center py-4">
            到底了
          </span>
          <span className="border-t border-theme-border-light dark:border-theme-border-dark w-10"></span>
        </footer>
      )}
    </>
  );
}
