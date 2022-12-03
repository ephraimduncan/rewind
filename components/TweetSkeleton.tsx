import React from "react";

export default function TweetSkeleton() {
  return (
    <div>
      <style jsx>
        {`
          .twitter-theme {
            --colors-blue: #0c00ff;
            --accents-1: #fafafa;
            --accents-2: #eaeaea;
            --bg-color: #fff;
            --tweet-font-color: #1c2022;
            --tweet-bg-color: #fff;
            --tweet-border: 1px solid #e1e8ed;
            --tweet-border-hover: 1px solid #ccd6dd;
            --colors-purple: #be00ff;
            --container-margin: 1.5rem 0;
          }

          .tweet {
            display: flex;
            flex-direction: column;
            max-width: 500px;
            min-width: 220px;
            margin: 1rem auto;
          }

          .tweet-skeleton-container {
            background: var(--tweet-bg-color);
            border: var(--tweet-border);
            border-radius: 5px;
            margin: var(--container-margin);
          }

          .tweet-button {
            color: var(--tweet-font-color);
            font-size: 0.875rem;
            padding: 0.5rem 1rem;
            margin-bottom: 1.5rem;
            background: transparent;
            border: var(--tweet-border);
            border-radius: 5px;
            outline: none;
            cursor: pointer;
            align-self: center;
          }

          .tweet-button:hover {
            border: var(--tweet-border-hover);
          }

          .tweet-skeleton-content {
            padding: 1.25rem 1.25rem 0.625rem;
          }

          .tweet-skeleton-footer {
            height: 2.5rem;
            padding: 0.625rem 1.25rem;
            border-top: var(--tweet-border);
          }

          .skeleton {
            display: block;
            width: 100%;
            border-radius: 5px;
            background-image: linear-gradient(
              270deg,
              var(--accents-1),
              var(--accents-2),
              var(--accents-2),
              var(--accents-1)
            );
            background-size: 400% 100%;
            animation: skeleton-loading 8s ease-in-out infinite;
          }

          @keyframes skeleton-loading {
            0% {
              background-position: 200% 0;
              background-position-x: 200%;
              background-position-y: 0px;
            }
            100% {
              background-position: -200% 0;
              background-position-x: -200%;
              background-position-y: 0px;
            }
          }
        `}
      </style>
      <div className="tweet twitter-theme">
        <div className="tweet-skeleton-container">
          <div className="tweet-skeleton-content">
            <span className="skeleton" style={{ height: "2.25rem" }}></span>
            <span
              className="skeleton"
              style={{
                height: "7rem",
                margin: "1.25rem 0",
              }}
            ></span>
            <span className="skeleton" style={{ height: "1.25rem" }}></span>
          </div>
          <div className="tweet-skeleton-footer">
            <span className="skeleton" style={{ height: "1.25rem" }}></span>
          </div>
        </div>
      </div>
    </div>
  );
}
