import React from "react";

const LoadingButton = (props) => {
  return (
    <button
      disabled={props.loading}
      type="submit"
      className="disabled:bg-opacity-75 disabled:hover:bg-neutral-800 disabled:hover:bg-opacity-75 w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium text-white bg-neutral-800 hover:bg-neutral-600"
    >
      {props.loading ?
        <svg role="status"
          className="inline w-5 h-5 mr-2 animate-pulse"
          viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50%" cy="50%" r="15" fill="white"/>
          Searching
        </svg>
        :
        <p>{props.label}</p>
      }
    </button>
  )
}

export default LoadingButton;