﻿import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tab(props) {
  return (
    <div>
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
        <select
          id="tabs"
          name="tabs"
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          defaultValue={props?.tabs[0]?.name}
        >
          {props?.tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {props?.tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => tab.href()}
                href='#'
                className={classNames(
                  tab.index === props?.selectedTab
                    ? 'border-blue-500 text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap flex py-4 px-1 border-b-2 font-medium text-sm'
                )}
                aria-current={tab.index === props?.selectedTab ? 'page' : undefined}
              >
                {tab.name}
                {tab.count ? (
                  <span
                    className={classNames(
                      tab.index === props?.selectedTab ? 'bg-indigo-100 text-blue-400' : 'bg-gray-100 text-gray-900',
                      'hidden ml-3 py-0.5 px-2.5 rounded-full text-xs font-medium md:inline-block'
                    )}
                  >
                    {tab.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}