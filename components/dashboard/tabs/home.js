
import React from 'react'
import { useState } from 'react'

import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
} from '@heroicons/react/outline'

import InviteEmployee from '../inviteEmployee'

const Home = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const submitForm = async () => {
    try {
      const res = await fetch(`/api/postEmployee`, {
        method: 'POST',
        body: JSON.stringify({
          session: props?.session,
          profile: props?.profile,
          email: email
        })
      });

      const data = await res.json();

      if (!data) {
        return {
          notFound: true,
        }
      } else {
        if (data.error) {
          alert(data.error);
        } else {
          createProfile(data.user.id);
        }
      }
    } catch (error) {
      alert(error);
    }

    props.setOpenInviteEmployee(false);
  }

  const createProfile = async (userID) => {
    try {
      const res = await fetch(`/api/postProfile`, {
        method: 'POST',
        body: JSON.stringify({
          session: props?.session,
          profile: props?.profile,
          userID: userID,
          first_name: firstName,
          last_name: lastName,
          company_id: props?.company?.id,
          access_level: 2,
          designation: designation
        })
      });

      const data = await res.json();

      if (!data) {
        return {
          notFound: true,
        }
      } else {
        if (data.error) {
          alert(data.error);
        }
      }
    } catch (error) {
      alert(error);
    }
  }

  const user = {
    name: props.profile?.first_name + ' ' + props.profile?.last_name,
    email: 'chelsea.hagon@example.com',
    role: props.profile?.designation,
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const stats = [
    { label: 'Annual Leave Left', value: 12 },
    { label: 'Medical Leave Left', value: 4 }
  ]

  const actions = [
    {
      icon: ClockIcon,
      name: 'Apply Leave',
      description: 'Apply for annual, medical or urgent leave.',
      href: '#',
      iconForeground: 'text-emerald-700',
      iconBackground: 'bg-emerald-50',
    },
    {
      icon: BadgeCheckIcon,
      name: 'Make Announcement',
      description: 'Make an announcement to the entire company.',
      href: '#',
      iconForeground: 'text-violet-700',
      iconBackground: 'bg-violet-50',
    },
    {
      icon: UsersIcon,
      name: 'Invite Employee',
      description: 'Send an email invite to a new company.',
      onClick: () => props.setOpenInviteEmployee(true),
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
    },
    {
      icon: CashIcon,
      name: 'Some Action',
      description: 'Some Description',
      href: '#',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50'
    },
    {
      icon: ReceiptRefundIcon,
      name: 'Some Action',
      description: 'Some Description',
      href: '#',
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
    },
    {
      icon: AcademicCapIcon,
      name: 'Some Action',
      description: 'Some Description',
      href: '#',
      iconForeground: 'text-indigo-700',
      iconBackground: 'bg-indigo-50',
    },
  ]

  const recentHires = [
    {
      name: 'Leonard Krasner',
      handle: 'leonardkrasner',
      imageUrl:
        'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Floyd Miles',
      handle: 'floydmiles',
      imageUrl:
        'https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Emily Selman',
      handle: 'emilyselman',
      imageUrl:
        'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
    {
      name: 'Kristin Watson',
      handle: 'kristinwatson',
      imageUrl:
        'https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      href: '#',
    },
  ]

  const announcements = [
    {
      id: 1,
      title: 'Office closed on July 2nd',
      href: '#',
      preview:
        'Cum qui rem deleniti. Suscipit in dolor veritatis sequi aut. Vero ut earum quis deleniti. Ut a sunt eum cum ut repudiandae possimus. Nihil ex tempora neque cum consectetur dolores.',
    },
    {
      id: 2,
      title: 'New password policy',
      href: '#',
      preview:
        'Alias inventore ut autem optio voluptas et repellendus. Facere totam quaerat quam quo laudantium cumque eaque excepturi vel. Accusamus maxime ipsam reprehenderit rerum id repellendus rerum. Culpa cum vel natus. Est sit autem mollitia.',
    },
    {
      id: 3,
      title: 'Office closed on July 2nd',
      href: '#',
      preview:
        'Tenetur libero voluptatem rerum occaecati qui est molestiae exercitationem. Voluptate quisquam iure assumenda consequatur ex et recusandae. Alias consectetur voluptatibus. Accusamus a ab dicta et. Consequatur quis dignissimos voluptatem nisi.',
    },
  ]

  return (
    <main className="-mt-24 pb-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Profile</h1>
        {/* Main 3 column grid */}
        <div className="grid grid-cols-1 gap-4 items-start lg:grid-cols-3 lg:gap-8">
          {/* Left column */}
          <div className="grid grid-cols-1 gap-4 lg:col-span-2">
            {/* Welcome panel */}
            <section aria-labelledby="profile-overview-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <h2 className="sr-only" id="profile-overview-title">
                  Profile Overview
                </h2>
                <div className="bg-white p-6">
                  <div className="sm:flex sm:items-center sm:justify-between">
                    <div className="sm:flex sm:space-x-5">
                      {/* <div className="flex-shrink-0">
                        <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                      </div> */}
                      <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                        <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                        <p className="text-xl font-bold text-gray-900 sm:text-2xl">{props.profile?.first_name === undefined ? <span className='flex space-x-3'><span className="h-2 mb-2 w-28 bg-slate-200 rounded animate-pulse" /><span className="h-2 mb-2 w-10 bg-slate-200 rounded animate-pulse" /></span> : props.profile?.first_name + ' ' + props.profile?.last_name}</p>
                        <p className="text-sm font-medium text-gray-600">{props.profile?.designation === undefined ? <span className="h-2 w-40 bg-slate-200 rounded animate-pulse" /> : props.profile?.designation}</p>
                      </div>
                    </div>
                    <div className="mt-5 flex justify-center sm:mt-0">
                      <a
                        href="#"
                        className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                      >
                        View profile
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border-t border-gray-200 bg-gray-50 grid grid-cols-1 divide-y divide-gray-200 sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                  {stats.map((stat) => (
                    <div key={stat.label} className="px-6 py-5 text-sm font-medium text-center">
                      <span className="text-gray-900">{stat.value}</span>{' '}
                      <span className="text-gray-600">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Actions panel */}
            <section aria-labelledby="quick-links-title">
              <div className="rounded-lg bg-gray-200 overflow-hidden shadow divide-y divide-gray-200 sm:divide-y-0 sm:grid sm:grid-cols-2 sm:gap-px">
                <h2 className="sr-only" id="quick-links-title">
                  Quick links
                </h2>
                {actions.map((action, actionIdx) => (
                  <div
                    key={action.name}
                    className={classNames(
                      actionIdx === 0 ? 'rounded-tl-lg rounded-tr-lg sm:rounded-tr-none' : '',
                      actionIdx === 1 ? 'sm:rounded-tr-lg' : '',
                      actionIdx === actions.length - 2 ? 'sm:rounded-bl-lg' : '',
                      actionIdx === actions.length - 1 ? 'rounded-bl-lg rounded-br-lg sm:rounded-bl-none' : '',
                      'relative group bg-white p-6'
                    )}
                  >
                    <div>
                      <span
                        className={classNames(
                          action.iconBackground,
                          action.iconForeground,
                          'rounded-lg inline-flex p-3 ring-4 ring-white'
                        )}
                      >
                        <action.icon className="h-6 w-6" aria-hidden="true" />
                      </span>
                    </div>
                    <div className="mt-8">
                      <h3 className="text-lg font-medium">
                        <a onClick={action.onClick} className="focus:outline-none">
                          {/* Extend touch target to entire panel */}
                          <span className="absolute inset-0" aria-hidden="true" />
                          {action.name}
                        </a>
                      </h3>
                      <p className="mt-2 text-sm text-gray-500">
                        {action.description}
                      </p>
                    </div>
                    <span
                      className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
                      aria-hidden="true"
                    >
                      <svg
                        className="h-6 w-6"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
                      </svg>
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right column */}
          <div className="grid grid-cols-1 gap-4">
            {/* Announcements */}
            <section aria-labelledby="announcements-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900" id="announcements-title">
                    Announcements
                  </h2>
                  <div className="flow-root mt-6">
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                      {announcements.map((announcement) => (
                        <li key={announcement.id} className="py-5">
                          <div className="relative focus-within:ring-2 focus-within:ring-cyan-500">
                            <h3 className="text-sm font-semibold text-gray-800">
                              <a href={announcement.href} className="hover:underline focus:outline-none">
                                {/* Extend touch target to entire panel */}
                                <span className="absolute inset-0" aria-hidden="true" />
                                {/* {announcement.title} */}
                                <div className="h-3 mb-2 w-28 bg-slate-200 rounded animate-pulse" />
                              </a>
                            </h3>
                            <div className="mt-1 text-sm text-gray-600 line-clamp-2">
                              {/* {announcement.preview} */}
                              <div className="h-2 mb-2 w-80 bg-slate-200 rounded animate-pulse" />
                              <div className="h-2 mb-2 w-80 bg-slate-200 rounded animate-pulse" />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* Recent Hires */}
            <section aria-labelledby="recent-hires-title">
              <div className="rounded-lg bg-white overflow-hidden shadow">
                <div className="p-6">
                  <h2 className="text-base font-medium text-gray-900" id="recent-hires-title">
                    Upcoming Holidays
                  </h2>
                  <div className="flow-root mt-6">
                    <ul role="list" className="-my-5 divide-y divide-gray-200">
                      {recentHires.map((person) => (
                        <li key={person.handle} className="py-4">
                          <div className="flex items-center space-x-4">
                            <span className="h-2 mb-2 w-40 bg-slate-200 rounded animate-pulse" />
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="w-full flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <InviteEmployee
        open={props.openInviteEmployee}
        setOpen={props.setOpenInviteEmployee}
        company={props.company}
        firstName={firstName}
        lastName={lastName}
        designation={designation}
        email={email}
        setFirstName={setFirstName}
        setLastName={setLastName}
        setDesignation={setDesignation}
        setEmail={setEmail}
        submitForm={submitForm}
      />
    </main>
  );
}

export default Home;