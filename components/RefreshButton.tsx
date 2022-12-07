import React from "react";

export default function Button({ fn }: { fn: () => void }) {
  return (
    <div
      className="pointer-events-auto cursor-pointer relative inline-flex rounded-md bg-white text-[0.8125rem] font-medium leading-5 text-slate-700 shadow-sm mt-4 ring-1 ring-slate-700/10 hover:bg-slate-50 hover:text-slate-900"
      onClick={fn}
    >
      <div className="flex py-2 px-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="mr-2.5 h-5 w-5 flex-none"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
          />
        </svg>
        Refresh
      </div>
      {/* <div className="border-l border-slate-400/20 py-2 px-2.5">12k</div> */}
    </div>
  );
}
