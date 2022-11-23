import React from "react";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Tab(props) {
  return (
    <div>
      <div className="block">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex" aria-label="Tabs">
            {props?.tabs.map((tab) => (
              <a
                key={tab.name}
                onClick={() => tab.href()}
                href='#'
                className={classNames(
                  tab.index === props?.selectedTab
                    ? 'border-blue-300 text-neutral-600'
                    : 'border-transparent text-neutral-400 hover:text-gray-700 hover:border-gray-200',
                  'whitespace-nowrap flex border-b-4 font-semibold text-base pb-4'
                )}
                aria-current={tab.index === props?.selectedTab ? 'page' : undefined}
              >
                <span className="hover:bg-gray-100 rounded-full px-3 py-1.5">
                  {tab.name}
                </span>
                {tab.count ? (
                  <span className='py-0.5 px-2.5 text-xs font-extrabold md:inline-block text-blue-300'>
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