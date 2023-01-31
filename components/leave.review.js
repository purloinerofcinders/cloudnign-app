import React, { useState } from "react";
import { useRouter } from "next/router";
import { fetcher } from "../utilities/fetcher";
import {
  CheckCircleIcon, CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  MinusCircleIcon,
  XCircleIcon, XIcon
} from "@heroicons/react/solid";
import { DateTime } from "luxon";
import ApplyLeave from "./leave.apply.apply-leave";
import Confirmation from "../libraries/confirmation";
import Tab from "../libraries/tab";
import LeaveDetails from "./leave.review.details";

const items = [
  { id: 1, value: 'Annual' },
  { id: 2, value: 'Medical' },
  { id: 3, value: 'Urgent' },
  { id: 4, value: 'Others' },
]

const stats = [
  { name: 'Annual Leave', stat: '14' },
  { name: 'Medical Leave', stat: '3' },
  { name: 'Others (Click to expand)', stat: '80' },
]

const Review = (props) => {
  const [openApplyLeave, setOpenApplyLeave] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState(items[0]);
  const [remarks, setRemarks] = useState("");

  const [selectedTab, setSelectedTab] = useState(0);

  const [adminMode, setAdminMode] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmation, setConfirmation] = useState({
    state: '', title: '', message: '', actionLabel: '', action: () => {
    }
  })

  const [showRevokeConfirmation, setShowRevokeConfirmation] = useState(false);
  const [revokeConfirmation, setRevokeConfirmation] = useState({
    state: '', title: '', message: '', actionLabel: '', action: () => {
    }
  });

  const [showDetails, setShowDetails] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState();

  const router = useRouter();

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const submit = async () => {
    const data = await fetcher(`/api/postLeave`, 'POST', {
      session: props.session,
      applicant: props.profile?.id,
      start_date: startDate,
      end_date: endDate,
      type: type.id,
      remarks: remarks
    });

    if (data?.error) {
      return;
    } else {
      return;
    }
  }

  const updateLeave = async (id, status) => {
    const data = await fetcher(`/api/setLeave`, 'POST', {
      session: props?.session,
      id: id,
      new_status: status
    });

    if (data?.error) {
      setShowConfirmation(false);
      return;
    } else {
      setShowConfirmation(false);
      return;
    }
  }

  const revokeLeave = async (id) => {
    const data = await fetcher(`/api/setLeave`, 'POST', {
      session: props?.session,
      id: id,
      new_status: 4
    });

    if (data?.error) {
      setShowRevokeConfirmation(false);
      return;
    } else {
      setShowRevokeConfirmation(false);
      setShowDetails(false);
      return;
    }
  }

  const tabs = [
    { index: 0, name: 'My Leaves', href: () => { setSelectedTab(0); }, count: '52', current: true },
    { index: 1, name: 'Review', href: () => { setSelectedTab(1); }, count: '6', current: false },
  ]

  return (
    <main>
      <div className="">
        <div className="space-x-5 w-full px-3 mb-6">
          <Tab tabs={tabs} selectedTab={selectedTab} />
        </div>
      </div>
      <div id="leaves" className="" hidden={selectedTab !== 0}>
        <div className="bg-white overflow-auto sm:rounded-md max-h-96">
          <ul role="list" className="divide">
            {props?.leaves?.length === 0 ?
              <div className="px-4 bg-gray-50 py-20 rounded-lg text-center ">
                <h1 className='text-2xl font-semibold text-neutral-600'>No data found</h1>
                <p className='text-neutral-400'>We did not find any leaves created by you.</p>
              </div>
              :
              props?.leaves?.map((leave) => (
                <li key={leave.id}>
                  <div className="block py-0.5 px-3">
                    <a onClick={() => {
                      setShowDetails(true); 
                      setSelectedLeave(leave);

                      setRevokeConfirmation({
                        state: 'negative',
                        title: 'Revoke Leave',
                        message: 'Are you sure you would like to revoke this leave application?',
                        actionLabel: 'Revoke',
                        action: () => revokeLeave(leave.id)
                      });
                    }} className="flex items-center px-4 py-4 sm:px-6 hover:bg-gray-50  rounded-lg">
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
                                      <span className='flex'><ClockIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-amber-400" aria-hidden="true" />Pending</span>,
                                    2:
                                      <span className='flex'><CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-emerald-400" aria-hidden="true" />Approved</span>,
                                    3:
                                      <span className='flex'><XCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-rose-400" aria-hidden="true" />Denied</span>,
                                    4:
                                      <span className='flex'><MinusCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-neutral-400" aria-hidden="true" />Revoked</span>,
                                  }[leave.status]
                                }
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <ChevronRightIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      </div>
                    </a>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>

      <div id="toReview" className="bg-white mt-5 overflow-hidden sm:rounded-md" hidden={selectedTab !== 1}>
        <ul role="list" className="divide-y divide-gray-200">
          {props?.leaveApplications?.length === 0 ?
            <div className="px-4 bg-gray-50 py-20 rounded-lg text-center ">
              <h1 className='text-2xl font-semibold text-neutral-600'>No data found</h1>
              <p className='text-neutral-400'>We did not find any leaves that require your approval.</p>
            </div>
            :
            props.leaveApplications?.map((leave) => (
              <li key={leave.id}>
                <a href={leave.href} className="block hover:bg-gray-50">
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
                              Applicant: {leave.applicant}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-col space-x-5 lg:flex-row">
                      <button
                        type="button"
                        className="flex-shrink-0 p-1 text-emerald-400 rounded-full hover:text-emerald-600 hover:bg-emerald-400 hover:bg-opacity-10"
                        onClick={() => {
                          setConfirmation({
                            state: 'positive',
                            title: 'Approve Leave',
                            message: 'Are you sure you would like to approve this leave application?',
                            actionLabel: 'Approve',
                            action: () => updateLeave(leave.id, 2)
                          });

                          setShowConfirmation(true);
                        }}
                      >
                        <span className="sr-only">Approve</span>
                        <CheckIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                      <button
                        type="button"
                        className="flex-shrink-0 p-1 text-red-400 rounded-full hover:text-red-600 hover:bg-red-400 hover:bg-opacity-10"
                        onClick={() => {
                          setConfirmation({
                            state: 'negative',
                            title: 'Deny Leave',
                            message: 'Are you sure you would like to deny this leave application?',
                            actionLabel: 'Deny',
                            action: () => updateLeave(leave.id, 3)
                          });
                          setShowConfirmation(true);
                        }}
                      >
                        <span className="sr-only">Reject</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </a>
              </li>
            ))}
        </ul>
      </div>
      <LeaveDetails show={showDetails} setShow={setShowDetails} selectedLeave={selectedLeave} revokeLeave={revokeLeave} revokeConfirmation={revokeConfirmation} showRevokeConfirmation={showRevokeConfirmation} setShowRevokeConfirmation={setShowRevokeConfirmation} />
      <Confirmation show={showConfirmation} setShow={setShowConfirmation} confirmation={confirmation} />
    </main>
  )
}

export default Review;