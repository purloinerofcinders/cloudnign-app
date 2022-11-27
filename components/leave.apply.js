import React from 'react';
import { useState } from 'react';
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  XCircleIcon,
  MinusCircleIcon,
  CheckIcon,
  XIcon,
  AdjustmentsIcon,
  CogIcon
} from '@heroicons/react/solid';
import ApplyLeave from "./leave.apply.apply-leave";
import { DateTime } from 'luxon';

import { fetcher } from "../utilities/fetcher";

import Toggle from "../libraries/toggle";
import Confirmation from "../libraries/confirmation";
import { useRouter } from "next/router";
import DropBox from "../libraries/dropbox";
import LoadingButton from "../libraries/loading-button";

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

const Apply = (props) => {
  const [loading, setLoading] = useState(false);

  const [openApplyLeave, setOpenApplyLeave] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [type, setType] = useState(items[0]);
  const [remarks, setRemarks] = useState("");

  const [adminMode, setAdminMode] = useState(false);

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmation, setConfirmation] = useState({
    state: '', title: '', message: '', actionLabel: '', action: () => {
    }
  })

  const router = useRouter();

  const submit = async () => {
    setLoading(true);

    const data = await fetcher(`/api/postLeave`, 'POST', {
      session: props.session,
      applicant: props.profile?.id,
      start_date: startDate,
      end_date: endDate,
      type: type.id,
      remarks: remarks
    });


    if (data?.error) {
      setLoading(false);
      setOpenApplyLeave(false);

      return;
    } else {
      setLoading(false);
      setOpenApplyLeave(false);
      props?.getLeaves();

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
    <main>
      <div className="px-4 sm:px-6 lg:px-4">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-2xl font-semibold text-gray-800">Leave</h1>
            <p className="mt-2 text-sm font-normal text-gray-400">
              View your available leaves, pending applications, and apply for new leave here.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-full border border-transparent bg-blue-300 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-400 focus:outline-none sm:w-auto"
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
                <dd className="mt-1 text-3xl font-semibold text-neutral-800">{item.stat}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      <ApplyLeave
        open={openApplyLeave}
        setOpen={setOpenApplyLeave}
        loading={loading}
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
      <Confirmation state={confirmation.state} title={confirmation.title} message={confirmation.message} actionLabel={confirmation.actionLabel} action={confirmation.action} setShow={setShowConfirmation} show={showConfirmation} />
    </main>
  )
}

export default Apply;