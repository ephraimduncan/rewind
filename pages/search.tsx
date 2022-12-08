import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import React from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import Layout from "../components/Layout";
import ShareModal from "../components/SharedModal";
import TweetSkeleton from "../components/TweetSkeleton";
import { Bookmark } from "../types/twitter";

export default function SearchPage(props: { bookmark: any }) {
  const [searchValue, setSearchValue] = React.useState("");
  const [searchResult, setSearchResult] = React.useState<any>();

  async function submit(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.code === "13") {
      event.preventDefault();

      const response = await fetch("http://localhost:3000/api/mongodb/search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue }),
      });

      const results = await response.json();

      setSearchResult(results);
      setSearchValue("");
    }
  }

  React.useEffect(() => {
    if (searchValue !== "") {
      fetch("http://localhost:3000/api/mongodb/search", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ searchValue }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setSearchResult(res);
        })
        .catch((e) => console.log(e));
    }
  }, [searchValue]);

  return (
    <Layout>
      <div className="flex items-center justify-center px-2 lg:m-6 ">
        <div className="max-w-lg w-full lg:max-w-3xl">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Search Shared Bookmarks"
              type="search"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              onKeyDown={submit}
            />
          </div>
        </div>
      </div>

      {searchResult && searchResult.length < 1 && (
        <h1 className="text-3xl my-8 font-bold leading-tight text-slate-900 text-center hover:text-slate-900">
          Enter a Search Term
        </h1>
      )}

      {searchResult && searchResult.length > 0 && (
        <div>
          {searchResult.map((bm: Bookmark) => {
            return (
              <div key={bm.id} className="my-8 flex flex-col max-w-fit mx-auto">
                <TwitterTweetEmbed
                  tweetId={bm.id}
                  options={{ align: "center" }}
                  placeholder={<TweetSkeleton />}
                />
              </div>
            );
          })}
        </div>
      )}
    </Layout>
  );
}
