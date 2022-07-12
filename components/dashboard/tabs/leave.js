import React from 'react';
import {useEffect, useState} from 'react';
import {CheckCircleIcon, ChevronRightIcon, ClockIcon, XCircleIcon, MinusCircleIcon} from '@heroicons/react/solid';
import ApplyLeave from '../../applyLeave';
import {DateTime} from 'luxon';

const items = [
  {id: 1, value: 'Annual'},
  {id: 2, value: 'Medical'},
  {id: 3, value: 'Urgent'},
  {id: 4, value: 'Others'},
]

const stats = [
  {name: 'Annual Leave', stat: '14'},
  {name: 'Medical Leave', stat: '3'},
  {name: 'Others (Click to expand)', stat: '80'},
]

const Leave = (props) => {
  const [openApplyLeave, setOpenApplyLeave] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState(items[0]);
  const [remarks, setRemarks] = useState("");

  const submit = async () => {
    try {
      const res = await fetch(`/api/postLeave`, {
        method: 'POST',
        body: JSON.stringify({
          session: props.session,
          applicant: props.profile?.id,
          start_date: startDate,
          end_date: endDate,
          type: type.id,
          remarks: remarks
        })
      });

      const data = await res.json();

      if (data?.error) {
        alert(data.error);
      } else {

      }
    } catch (error) {
      alert(error);
    }
  }

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
                  {props?.leaves.length === 0 ?
                    <p className='text-center text-md font-semibold text-neutral-800'>Oops! We did not find anything.</p>
                    :
                    props.leaves?.map((leave) => (
                      <li key={leave.applicant}>
                        <a href={leave?.href} className="block hover:bg-gray-50">
                          <div className="flex items-center px-4 py-4 sm:px-6">
                            <div className="min-w-0 flex-1 flex items-center">
                              <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                                <div>
                                  <div className="flex space-x-5">
                                    <p className="text-sm font-medium text-neutral-800 truncate">
                                      Starts <span className="font-semibold text-sky-600">{DateTime.fromISO(leave.start_date).toLocaleString()}</span>
                                    </p>
                                    <p className="text-sm font-medium text-neutral-800 truncate">
                                      Ends <span className="font-semibold text-sky-600">{DateTime.fromISO(leave.end_date).toLocaleString()}</span>
                                    </p>
                                  </div>
                                  <div className="flex space-x-5">
                                    
                                  
                                  <p className="mt-2 text-sm text-gray-500">
                                    <span className="truncate">Type:&nbsp;
                                      <span className="font-semibold">
                                        {
                                          {
                                            1: 'Annual',
                                            2: 'Medical',
                                            3: 'Urgent',
                                            4: 'Others'
                                          }[leave.type]
                                        }
                                      </span>
                                    </span>
                                  </p>
                                  <p className="mt-2 text-sm text-gray-500">
                                    Remarks: <span className="font-semibold">{leave.remarks}</span>
                                  </p>
                                  </div>
                                </div>
                                <div className=" md:block">
                                  <div>
                                    <p className="text-sm text-gray-900">
                                      Applied on <span className="font-semibold text-sky-600">{DateTime.fromISO(leave.created_at).toLocaleString(DateTime.DATETIME_FULL)}</span>
                                    </p>
                                    <p className="mt-2 flex items-center text-sm text-gray-500">
                                      {
                                        {
                                          1:
                                            <span className='flex'><ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-amber-400" aria-hidden="true"/>Pending</span>,
                                          2:
                                            <span className='flex'><CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" aria-hidden="true"/>Approved</span>,
                                          3:
                                            <span className='flex'><XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400" aria-hidden="true"/>Denied</span>,
                                          4:
                                            <span className='flex'><MinusCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" aria-hidden="true"/>Cancelled</span>,
                                        }[leave.status]
                                      }
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div>
                              <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true"/>
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
      <ApplyLeave
        open={openApplyLeave}
        setOpen={setOpenApplyLeave}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        type={type}
        items={items}
        setType={setType}
        remarks={remarks}
        setRemarks={setRemarks}
        submit={submit}
      />
    </main>
  )
}

export default Leave;