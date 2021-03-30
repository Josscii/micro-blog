import React from "react";
import githubIcon from "./github.png";
import weibIcon from "./weibo.png";

export default function About() {
  return (
    <div className="border border-theme-border-light dark:border-theme-border-dark rounded p-2">
      <p className="mb-0.5">关于我</p>
      <p className="mb-0.5">前 iOS 程序员，喜欢 Swift，React，学习前端中。</p>
      <div className="flex space-x-2 items-center">
        <a href="https://github.com/josscii">
          <img
            src={githubIcon}
            alt="github link"
            className="w-4 h-4"
            style={
              window.matchMedia("(prefers-color-scheme: dark)").matches
                ? {
                    filter: "invert(100%)",
                  }
                : {}
            }
          />
        </a>
        <a href="https://weibo.com/u/2268468831">
          <img src={weibIcon} alt="weibo link" className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
}
