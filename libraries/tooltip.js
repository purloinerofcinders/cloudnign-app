import React, { useState } from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tooltip(props) {
  return (
    <div id="tooltip-default" role="tooltip" disabled={props.disabled} className="group-hover:visible group-hover:opacity-60 absolute -translate-y-12 z-10 py-2 px-3 origin-top text-sm font-medium text-white bg-neutral-800 opacity-0 invisible rounded-lg shadow-sm transition ease-in-out duration-300 tooltip dark:bg-gray-700">
      {props?.message}
    </div>
  )
}