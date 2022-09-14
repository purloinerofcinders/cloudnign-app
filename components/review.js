import React, {useState} from "react";
import {useRouter} from "next/router";
import {fetcher} from "../utilities/fetcher";
import {
  CheckCircleIcon, CheckIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  MinusCircleIcon,
  XCircleIcon, XIcon
} from "@heroicons/react/solid";
import {DateTime} from "luxon";
import ApplyLeave from "./dashboard.leave.apply-leave";
import Confirmation from "../libraries/confirmation";
import Tab from "../libraries/tab";

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

const Review = (props) => {
  const [openApplyLeave, setOpenApplyLeave] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState(items[0]);
  const [remarks, setRemarks] = useState("");

  const [adminMode, setAdminMode] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmation, setConfirmation] = useState({state: '', title: '', message: '', actionLabel: '', action: () => {}})

  const router = useRouter();

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

  return (
    <main className="pb-8 mt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="shadow-xl bg-white dark:bg-neutral-800 overflow-hidden rounded-lg">
          <div className="px-4 py-5 sm:p-10">
            <div className="">
              <div className="flex flex-row justify-between">
                <div>
                  <button
                    type="button"
                    className="font-bold text-3xl sm:text-4xl inline-flex items-center justify-center rounded-md px-3 py-2 border border-transparent text-neutral-200 hover:text-neutral-800 focus:outline-none sm:w-auto"
                    onClick={() => router.push('/apply')}
                  >
                    Apply
                  </button>
                  <button
                    type="button"
                    className="font-bold text-3xl sm:text-4xl inline-flex items-center justify-center rounded-md px-3 py-2 border border-transparent text-blue-400 focus:outline-none sm:w-auto"
                    onClick={() => router.push('/review')}
                  >
                    Review
                  </button>
                </div>
                <div className="">
                  <button
                    type="button"
                    className="text-neutral-800 hover:text-neutral-600 focus:outline-none"
                    onClick={() => setAdminMode(true)}
                  >
                    <CogIcon className="w-8 h-auto"/>
                  </button>
                </div>
              </div>
              <div className="px-3">
                <Tab />
              </div>
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mt-8">
              <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                  <h1 className="text-xl font-semibold text-gray-900">Leave</h1>
                  <p className="mt-2 text-sm text-gray-700">
                    Leave applications for review.
                  </p>
                </div>
              </div>
              <div className="bg-white mt-5 overflow-hidden sm:rounded-md">
                <ul role="list" className="divide-y divide-gray-200">
                  {props?.leaveApplications?.length === 0 ?
                    <p className='text-center text-md font-semibold text-neutral-800'>Oops! We did not find anything.</p>
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
                                    title: 'Confirm Action',
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
                                    title: 'Confirm Action',
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
      <Confirmation state={confirmation.state} title={confirmation.title} message={confirmation.message} actionLabel={confirmation.actionLabel} action={confirmation.action} setShow={setShowConfirmation} show={showConfirmation}/>
    </main>
  )
}

export default Review;