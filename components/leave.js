import React from 'react'
import { useState, useEffect, Fragment } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

import { Menu, Popover, Transition } from '@headlessui/react'
import {
  BellIcon,
  MenuIcon, UserIcon,
  XIcon,
} from '@heroicons/react/outline'

import Apply from "./leave.apply";
import Employees from "./dashboard.employees";
import Review from "./leave.review";

import { fetcher } from "../utilities/fetcher";
import {
  CheckCircleIcon,
  ChevronRightIcon,
  ClockIcon,
  CogIcon,
  MinusCircleIcon,
  XCircleIcon
} from "@heroicons/react/solid";
import { DateTime } from "luxon";
import Confirmation from "../libraries/confirmation";

const Leave = (props) => {
  const router = useRouter();

  const [currentTab, setCurrentTab] = useState('');

  const [openInviteEmployee, setOpenInviteEmployee] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [leaves, setLeaves] = useState([]);
  const [leaveApplications, setLeaveApplications] = useState([]);

  const tabs = ['review', 'apply', 'employees', 'company', 'access', 'help'];

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const user = {
    name: props.profile?.first_name + ' ' + props.profile?.last_name,
    email: 'chelsea.hagon@example.com',
    role: props.profile?.designation,
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const navigation = [
    { name: 'Home', link: 'home', current: currentTab === 'home' },
    { name: 'Leave', link: 'leave', current: currentTab === 'leave' },
    { name: 'Employees', link: 'employees', current: currentTab === 'employees' },
    { name: 'Company', link: 'company', current: currentTab === 'company' },
    { name: 'Access', link: 'access', current: currentTab === 'access' },
    { name: 'Help', link: 'help', current: currentTab === 'help' },
  ]

  const userNavigation = [
    { name: 'Profile', onClick: () => { } },
    { name: 'Settings', onClick: () => { } },
    { name: 'Sign out', onClick: () => props.signOut() },
  ]

  const getEmployees = async () => {
    const data = await fetcher(`/api/getEmployees`, 'POST', {
      session: props?.session,
      profile: props?.profile,
      company_id: props?.profile?.company_id
    });

    if (data?.error) {
      return;
    } else {
      return data?.employees;
    }
  }

  const getLeaves = async () => {
    const data = await fetcher(`/api/getLeaves`, 'POST', {
      session: props.session,
      profile: props.profile
    });

    if (data?.error) {
      return;
    } else {
      return data?.leaves;
    }
  }

  const getAllLeaves = async () => {
    const data = await fetcher(`/api/getAllLeaves`, 'POST', {
      session: props.session,
      profile: props.profile
    });

    if (data?.error) {
      return;
    } else {
      return data?.leaves;
    }
  }

  useEffect(() => {
    if (props.profile) {
      getEmployees().then(result => {
        setEmployees(result);
      });

      getLeaves().then(result => {
        setLeaves(result);
      });

      if (props.profile?.access_level === 1) {
        getAllLeaves().then(result => {
          const filteredLeaves = result.filter(application => application.applicant !== props.profile?.id && application.status === 1);

          setLeaveApplications(filteredLeaves);
        });
      }
    }
  }, [props.profile]);

  useEffect(() => {
    const tab = router.query?.tab;

    if (!tabs.includes(tab) && tab) {
      router.push('/404');
    } else {
      setCurrentTab(tab);
    }
  }, [router.query]);

  return (
    <>
      <div className="min-h-full">
        <main>
          <div className='text-center mt-10 mb-10'>
            <Image src='/cloudnigh.png' fill width='100' height='100' alt='cloudnigh'></Image>
          </div>

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="bg-white overflow-hidden rounded-3xl">
              <div className="px-4 py-5 sm:p-10">
                <div hidden={props.profile?.access_level !== 1} className="space-y-5 mb-10 flex flex-row justify-between">
                  <div className='bg-gray-100 rounded-full p-4'>
                    <button
                      type="button"
                      className={"font-bold text-3xl sm:text-4xl inline-flex items-center justify-center rounded-md px-3 py-2 border border-transparent focus:outline-none sm:w-auto " +
                        classNames(
                          currentTab === "apply" ? "text-neutral-600" : "text-neutral-300 hover:text-neutral-500"
                        )
                      }
                      onClick={() => router.push('/apply')}
                    >
                      Apply
                    </button>
                    <button
                      type="button"
                      className={"font-bold text-3xl sm:text-4xl inline-flex items-center justify-center rounded-md px-3 py-2 border border-transparent focus:outline-none sm:w-auto " +
                        classNames(
                          currentTab === "review" ? "text-neutral-600" : "text-neutral-300 hover:text-neutral-500"
                        )
                      }
                      onClick={() => router.push('/review')}
                    >
                      Review
                    </button>
                  </div>
                  <div className="flex h-fit justify-center items-center">
                    <button
                      type="button"
                      className="text-neutral-600 p-2 rounded-full hover:bg-gray-100 focus:outline-none"
                      onClick={() => alert('settings')}
                    >
                      <span className="sr-only">Settings</span>
                      <CogIcon className="w-8 h-auto" />
                    </button>
                  </div>
                </div>
                {
                  {
                    'apply':
                      <Apply
                        session={props.session}
                        profile={props.profile}
                        leaves={leaves}
                        leaveApplications={leaveApplications}
                        getLeaves={getLeaves}
                      />,
                    'review':
                      <Review
                        session={props.session}
                        profile={props.profile}
                        leaves={leaves}
                        leaveApplications={leaveApplications}
                      />,
                    'employees':
                      <Employees
                        profile={props.profile}
                        employees={employees}
                      />
                  }[router.query?.tab]
                }
              </div>
            </div>
          </div>
        </main>
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="py-8 text-sm text-white text-center sm:text-left">
              <span className="block sm:inline">&copy; 2022 Bleuhr Private Limited</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Leave;