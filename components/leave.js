import React from 'react'
import { useState, useEffect, Fragment } from 'react'

import { useRouter } from 'next/router'
import Link from 'next/link'

import { Menu, Popover, Transition } from '@headlessui/react'
import {
  BellIcon,
  MenuIcon, UserIcon,
  XIcon,
} from '@heroicons/react/outline'

import Home from "./dashboard.home";
import Apply from "./apply";
import Employees from "./dashboard.employees";
import Review from "./review";

import {fetcher} from "../utilities/fetcher";

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
        {
          {
            'home':
              <Home
                session={props.session}
                profile={props.profile}
                company={props.company}
                openInviteEmployee={openInviteEmployee}
                setOpenInviteEmployee={setOpenInviteEmployee}
              />,
            'apply':
              <Apply
                session={props.session}
                profile={props.profile}
                leaves={leaves}
                leaveApplications={leaveApplications}
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