import React from "react";

export default function Hero() {
  return (
    <div>
      <style jsx>
        {`
          .hero {
            margin-right: auto;
            margin-left: auto;
            padding: 100px;
            display: flex;
            max-width: 1293px;
            border-radius: 32px;
            background-color: rgba(99, 102, 241, 0.05);
            background-image: url("https://uploads-ssl.webflow.com/60ec14d48c97af8448ff08ee/616fd3d38cab07742fb4e71e_blog.png");
            background-position: 50% 2%;
            background-size: 1720px;
            background-repeat: no-repeat;
            background-repeat-x: no-repeat;
            background-repeat-y: no-repeat;
          }

          .heading-wrap {
            margin-right: auto;
            margin-left: auto;
          }

          .heading {
            font-family: Moranga, sans-serif;
            font-size: 56px;
            line-height: 64px;
            font-weight: 500;
            letter-spacing: -0.5px;
          }
        `}
      </style>
      <div className="my-8 hero">
        <div className="heading-wrap">
          <h1 className="heading text-center">
            Never forget your Bookmarks,
            <br />
            with Rewind
            <br />
          </h1>
        </div>
      </div>
    </div>
  );
}
