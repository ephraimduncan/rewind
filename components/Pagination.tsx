import React from "react";
import { ArrowLongLeftIcon, ArrowLongRightIcon } from "@heroicons/react/24/solid";

export default function Pagination({
  previousBookmark,
  nextBookmark,
  nextToken,
  previousToken,
}: any) {
  return (
    <nav className="max-w-xs px-4 mx-auto flex items-center justify-between sm:px-0">
      {previousToken && (
        <div className="-mt-px w-0 flex-1 flex cursor-pointer" onClick={previousBookmark}>
          <a className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500">
            <ArrowLongLeftIcon className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
            Previous
          </a>
        </div>
      )}

      {nextToken && (
        <div className="-mt-px w-0 flex-1 flex justify-end cursor-pointer" onClick={nextBookmark}>
          <a className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500">
            Next
            <ArrowLongRightIcon className="ml-3 h-5 w-5 text-gray-400" aria-hidden="true" />
          </a>
        </div>
      )}
    </nav>
  );
}
