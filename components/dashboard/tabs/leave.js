import React from 'react'
import { useEffect } from 'react'

const Leave = (props) => {
  const stats = [
    { name: 'Annual Leave', stat: '14' },
    { name: 'Medical Leave', stat: '3' },
    { name: 'Pending', stat: '1' },
  ]

  return (
    <main className="-mt-24 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-10">
            <div className="px-4 sm:px-6 lg:px-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Leave</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    View your available leaves, pending applications, and apply for new leave here.
                  </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-neutral-800 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-neutral-500 focus:outline-none sm:w-auto"
                  >
                    Apply New
                  </button>
                </div>
              </div>
              <div>
                <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {stats.map((item) => (
                    <div key={item.name} className="px-4 py-5 bg-neutral-100 rounded-lg overflow-hidden sm:p-6">
                      <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                      <dd className="mt-1 text-3xl font-semibold text-gray-900">{item.stat}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Leave;