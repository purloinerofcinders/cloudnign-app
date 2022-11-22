import React from "react";

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
          <nav className="-mb-px flex" aria-label="Tabs">
            {props?.tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => tab.href()}
                href='#'
                className={classNames(
                  tab.index === props?.selectedTab
                    ? 'border-blue-500 text-neutral-600'
                    : 'border-transparent text-neutral-400 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap flex border-b-4 font-semibold text-base pb-4'
                )}
                aria-current={tab.index === props?.selectedTab ? 'page' : undefined}
              >
                <span className="hover:bg-gray-100 rounded-lg px-2 py-1">
                  {tab.name}
                </span>
                {tab.count ? (
                  <span className='hidden py-0.5 px-2.5 text-xs font-extrabold md:inline-block text-blue-400'>
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