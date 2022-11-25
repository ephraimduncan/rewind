import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <div>
      <div>Home Page</div>

      <Link href="/">
        <button>Log In</button>
      </Link>
    </div>
  );
}
