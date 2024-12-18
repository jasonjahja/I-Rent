"use client"
import React from 'react';


export default function BackButton() {

  return (
    <button
      onClick={() => window.history.back()}
      className="absolute left-5 top-18 flex items-center justify-center w-12 h-12 bg-gray-200 rounded-full shadow-md hover:bg-gray-300 transition duration-200"
      aria-label="Go Back"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-7 h-7 text-gray-700"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    </button>
  );
}
