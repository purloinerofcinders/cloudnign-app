import React from 'react'
import { useEffect, useState } from 'react'
import { CheckCircleIcon, ChevronRightIcon } from '@heroicons/react/solid'
import ApplyLeave from '../../applyLeave'

const Leave = (props) => {
  const [openApplyLeave, setOpenApplyLeave] = useState(false);

  const stats = [
    { name: 'Annual Leave', stat: '14' },
    { name: 'Medical Leave', stat: '3' },
    { name: 'Others (Click to expand)', stat: '80' },
  ]

  const applications = [
    {
      applicant: {
        name: 'Ricardo Cooper',
        email: 'ricardo.cooper@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Approved',
      href: '#',
    },
    {
      applicant: {
        name: 'Kristen Ramos',
        email: 'kristen.ramos@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Pending',
      href: '#',
    },
    {
      applicant: {
        name: 'Ted Fox',
        email: 'ted.fox@example.com',
        imageUrl:
          'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      date: '2020-01-07',
      dateFull: 'January 7, 2020',
      stage: 'Rejected',
      href: '#',
    },
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
                    onClick={() => setOpenApplyLeave(true)}
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
              <div className="bg-white mt-5 overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {applications.map((application) => (
                    <li key={application.applicant.email}>
                      <a href={application.href} className="block hover:bg-gray-50">
                        <div className="flex items-center px-4 py-4 sm:px-6">
                          <div className="min-w-0 flex-1 flex items-center">
                            <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                              <div>
                                <p className="text-sm font-medium text-neutral-800 truncate">Friday, 14/5/2022 - Monday, 16/5/2022</p>
                                <p className="mt-2 text-sm text-gray-500">
                                  <span className="truncate">Type: Annual Leave, Reason: Rest</span>
                                </p>
                              </div>
                              <div className=" md:block">
                                <div>
                                  <p className="text-sm text-gray-900">
                                    Applied on <time dateTime={application.date}>{application.dateFull}</time>
                                  </p>
                                  <p className="mt-2 flex items-center text-sm text-gray-500">
                                    <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" aria-hidden="true" />
                                    {application.stage}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div>
                            <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                          </div>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ApplyLeave open= {openApplyLeave} setOpen={setOpenApplyLeave}/>
    </main>
  )
}

export default Leave;