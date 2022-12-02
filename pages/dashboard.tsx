import React from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";

export default function Dashboard() {
  return (
    <div>
      <style jsx>
        {`
          .container-2 {
            position: relative;
            z-index: 0;
            display: block;
            max-width: 1268px;
            margin-right: auto;
            margin-left: auto;
            grid-auto-columns: 1fr;
            gap: 16px;
            grid-template-columns: 1fr 1fr;
            grid-template-rows: auto auto;
            background-color: transparent;
          }

          .waitlist {
            padding: 80px 3% 0px;
          }

          .container-2.waitlist {
            display: flex;
            max-width: 1000px;
            padding-bottom: 60px;
            border-radius: 32px;
            background-color: rgba(99, 102, 241, 0.05);
            background-image: url("https://uploads-ssl.webflow.com/60ec14d48c97af8448ff08ee/616fd3d38cab07742fb4e71e_blog.png");
            background-position: 50% 2%;
            background-size: 1720px;
            background-repeat: no-repeat;
            background-repeat-x: no-repeat;
            background-repeat-y: no-repeat;
          }

          :-webkit-scrollbar {
            width: 0px;
          }

          .title-wrap-2 {
            display: flex;
            max-width: 800px;
            min-width: 800px;
            margin-right: auto;
            margin-left: auto;
            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            flex-direction: column;
            -webkit-box-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            align-items: center;
            text-align: center;
          }

          .tag {
            margin-bottom: 8px;
            font-family: "FT Polar", sans-serif;
            color: rgba(17, 17, 17, 0.8);
            font-size: 14px;
            font-weight: 500;
          }

          h1 {
            margin: 0px 0px 24px;
            font-family: "FT Polar", sans-serif;
            color: rgb(24, 24, 27);
            font-size: 56px;
            line-height: 64px;
            font-weight: 700;
            letter-spacing: -0.2px;
          }

          .heading {
            font-family: Moranga, sans-serif;
            color: rgb(17, 17, 17);
            font-weight: 400;
            text-align: left;
          }

          .heading.invite {
            text-align: center;
          }
        `}
      </style>
      <div>
        <Navbar />
      </div>
      <div className="my-8 container-2 waitlist snipcss-KQ9W2">
        <div className="title-wrap-2">
          <div className="tag">What are you waiting for?</div>
          <h1 className="heading invite">
            Never forget your Bookmarks,
            <br />
            with Rewind
            <br />
          </h1>
        </div>
      </div>
      <div>
        <Features />
      </div>
    </div>
  );
}
