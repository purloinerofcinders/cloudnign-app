import React from 'react'
import { useState, useEffect } from 'react'

import { supabase } from '../utils/supabaseClient'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'

import styles from '../styles/Home.module.css'

import { Fragment } from 'react'
import { Menu, Popover, Transition, Dialog } from '@headlessui/react'
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  BellIcon,
  CashIcon,
  ClockIcon,
  MenuIcon,
  ReceiptRefundIcon,
  UsersIcon,
  XIcon,
  CheckIcon
} from '@heroicons/react/outline'
import { SearchIcon } from '@heroicons/react/solid'

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const signIn = async (email) => {
    try {
      const { error } = await supabase.auth.signIn({ email }, {
        redirectTo: 'http://localhost:3000/app'
      });
      if (error) throw error
      alert('Check your email for the login link!')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {

    }
  }

  return (
    <div className="flex h-screen">
      <div className="m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-12 w-auto"
            src="/noderas.png"
            alt="Noderas"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in / Sign up</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email and we will do the rest! No password is required.
          </p>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow-2xl sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); signIn(email); }}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-rose-400 focus:border-rose-400 sm:text-sm"
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember Email
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="stay-signed-in"
                    name="stay-signed-in"
                    type="checkbox"
                    className="h-4 w-4 text-rose-600 focus:ring-rose-500 border-gray-300 rounded"
                  />
                  <label htmlFor="stay-signed-in" className="ml-2 block text-sm text-gray-900">
                    Stay Signed-in
                  </label>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-rose-400 hover:bg-rose-600"
                >
                  Continue
                </button>
              </div>
            </form>

            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3">
                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Facebook</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with Twitter</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>

                <div>
                  <a
                    href="#"
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                  >
                    <span className="sr-only">Sign in with GitHub</span>
                    <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

const Dashboard = (props) => {
  const router = useRouter();

  const [profile, setProfile] = useState(props.profile);
  const [company, setCompany] = useState();

  const [openInviteEmployee, setOpenInviteEmployee] = useState(false);

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error
      alert('Signed out.')
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {

    }
  };

  const inviteEmployee = () => {
    setOpenInviteEmployee(true);
  };

  const getCompany = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .select()
        .eq('id', profile?.company_id);

      if (error) throw error

      setCompany(data[0]);
    } catch (error) {
      alert(error.error_description || error.message)
    } finally {

    }
  };

  const user = {
    name: profile?.first_name + ' ' + profile?.last_name,
    email: 'chelsea.hagon@example.com',
    role: profile?.designation,
    imageUrl:
      'https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  }

  const navigation = [
    { name: 'Home', onClick: () => { }, link: 'home', current: true },
    { name: 'Profile', onClick: () => { }, link: 'profile', current: false },
    { name: 'Employees', onClick: () => { }, link: 'employees', current: false },
    { name: 'Company', onClick: () => { }, link: 'company', current: false },
    { name: 'Access', onClick: () => { }, link: 'access', current: false },
    { name: 'Help', onClick: () => { }, link: 'help', current: false },
  ]

  const userNavigation = [
    { name: 'Your Profile', onClick: '#' },
    { name: 'Settings', onClick: '#' },
    { name: 'Sign out', onClick: () => signOut() },
  ]

  const stats = [
    { label: 'Annual Leave Left', value: 12 },
    { label: 'Medical Leave Left', value: 4 }
  ]

  const actions = [
    {
      icon: ClockIcon,
      name: 'Apply Leave',
      href: '#',
      iconForeground: 'text-teal-700',
      iconBackground: 'bg-teal-50',
    },
    {
      icon: BadgeCheckIcon,
      name: 'Make Announcement',
      href: '#',
      iconForeground: 'text-purple-700',
      iconBackground: 'bg-purple-50',
    },
    {
      icon: UsersIcon,
      name: 'Invite Employee',
      onClick: () => inviteEmployee(),
      iconForeground: 'text-sky-700',
      iconBackground: 'bg-sky-50',
    },
    {
      icon: CashIcon,
      name: 'a',
      href: '#',
      iconForeground: 'text-yellow-700',
      iconBackground: 'bg-yellow-50'
    },
    {
      icon: ReceiptRefundIcon,
      name: 'b',
      href: '#',
      iconForeground: 'text-rose-700',
      iconBackground: 'bg-rose-50',
    },
    {
      icon: AcademicCapIcon,
      name: 'c',
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

  useEffect(() => {
    setProfile(props.profile);
  }, [props]);

  useEffect(() => {
    if (profile)
      getCompany();
  }, [profile]);

  const Home = () => {
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
                        <div className="flex-shrink-0">
                          <img className="mx-auto h-20 w-20 rounded-full" src={user.imageUrl} alt="" />
                        </div>
                        <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                          <p className="text-sm font-medium text-gray-600">Welcome back,</p>
                          <p className="text-xl font-bold text-gray-900 sm:text-2xl">{user.name}</p>
                          <p className="text-sm font-medium text-gray-600">{user.role}</p>
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
                          Doloribus dolores nostrum quia qui natus officia quod et dolorem. Sit repellendus qui ut at
                          blanditiis et quo et molestiae.
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
                                  {announcement.title}
                                </a>
                              </h3>
                              <p className="mt-1 text-sm text-gray-600 line-clamp-2">{announcement.preview}</p>
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
                      Recent Hires
                    </h2>
                    <div className="flow-root mt-6">
                      <ul role="list" className="-my-5 divide-y divide-gray-200">
                        {recentHires.map((person) => (
                          <li key={person.handle} className="py-4">
                            <div className="flex items-center space-x-4">
                              <div className="flex-shrink-0">
                                <img className="h-8 w-8 rounded-full" src={person.imageUrl} alt="" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 truncate">{person.name}</p>
                                <p className="text-sm text-gray-500 truncate">{'@' + person.handle}</p>
                              </div>
                              <div>
                                <a
                                  href={person.href}
                                  className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
                                >
                                  View
                                </a>
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
            </div>
          </div>
        </div>
      </main>
    );
  }

  const Employees = () => {
    useEffect(() => {

    });

    const people = [
      {
        name: 'Lindsay Walton',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walto',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
      },
      {
        name: 'Lindsay Walt',
        title: 'Front-end Developer',
        department: 'Optimization',
        email: 'lindsay.walton@example.com',
        role: 'Member',
        image:
          'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
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
                    <h1 className="text-xl font-semibold text-gray-900">Employees</h1>
                    <p className="mt-2 text-sm text-gray-700">
                      A list of all the users in your account including their name, title, email and role.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                      Add user
                    </button>
                  </div>
                </div>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                Name
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Title
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Status
                              </th>
                              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                Role
                              </th>
                              <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {people.map((person) => (
                              <tr key={person.email}>
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                  <div className="flex items-center">
                                    <div className="h-10 w-10 flex-shrink-0">
                                      <img className="h-10 w-10 rounded-full" src={person.image} alt="" />
                                    </div>
                                    <div className="ml-4">
                                      <div className="font-medium text-gray-900">{person.name}</div>
                                      <div className="text-gray-500">{person.email}</div>
                                    </div>
                                  </div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <div className="text-gray-900">{person.title}</div>
                                  <div className="text-gray-500">{person.department}</div>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                  <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                                    Active
                                  </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{person.role}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                  <a href="#" className="text-indigo-600 hover:text-indigo-900">
                                    Edit<span className="sr-only">, {person.name}</span>
                                  </a>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <>
      <div className="min-h-full">
        <Popover as="header" className="pb-24 bg-neutral-800">
          {({ open }) => (
            <>
              <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="relative flex flex-wrap items-center justify-center lg:justify-between">
                  {/* Logo */}
                  <div className="absolute left-0 py-5 flex-shrink-0 lg:static">
                    <div className='flex' style={{ gap: 15, alignItems: 'center' }}>
                      <a href="#">
                        <span className="sr-only">Noderas</span>
                        {/* https://tailwindui.com/img/logos/workflow-mark-cyan-200.svg */}
                        <img
                          className="h-6 w-auto sm:h-7"
                          src="/noderas-white.png"
                          alt="Noderas"
                          fill="#000"
                        />
                      </a>
                      <h2 className="text-2xl font-bold leading-7 text-white sm:text-3xl sm:truncate">{company?.name}</h2>
                    </div>
                  </div>

                  {/* Right section on desktop */}
                  <div className="hidden lg:ml-4 lg:flex lg:items-center lg:py-5 lg:pr-0.5">
                    <button
                      type="button"
                      className="flex-shrink-0 p-1 text-white rounded-full hover:text-white hover:bg-white hover:bg-opacity-10"
                    >
                      <span className="sr-only">View notifications</span>
                      <BellIcon className="h-6 w-6" aria-hidden="true" />
                    </button>

                    {/* Profile dropdown */}
                    <Menu as="div" className="ml-4 relative flex-shrink-0">
                      <div>
                        <Menu.Button className="bg-white rounded-full flex text-sm ring-2 ring-white ring-opacity-20">
                          <span className="sr-only">Open user menu</span>
                          <img className="h-8 w-8 rounded-full" src={user.imageUrl} alt="" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right z-40 absolute -right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                <a
                                  onClick={item.onClick}
                                  className={classNames(
                                    active ? 'bg-gray-100' : '',
                                    'block px-4 py-2 text-sm text-gray-700'
                                  )}
                                >
                                  {item.name}
                                </a>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>

                  <div className="w-full py-5 lg:border-t lg:border-white lg:border-opacity-20">
                    <div className="lg:grid lg:grid-cols-3 lg:gap-8 lg:items-center">
                      {/* Left nav */}
                      <div className="hidden lg:block lg:col-span-2">
                        <nav className="flex space-x-4">
                          {navigation.map((item) => (
                            <Link href={"/" + item.link} key={item.name}>
                              <a className={classNames(
                                item.current ? 'text-white' : 'text-neutral-400',
                                'text-sm font-medium rounded-md bg-white bg-opacity-0 px-3 py-2 hover:bg-opacity-10'
                              )}
                                aria-current={item.current ? 'page' : undefined}>{item.name}</a>
                            </Link>
                          ))}

                        </nav>
                      </div>
                      {/* <div className="px-12 lg:px-0">
                        <div className="max-w-xs mx-auto w-full lg:max-w-md">
                          <label htmlFor="search" className="sr-only">
                            Search
                          </label>
                          <div className="relative text-white focus-within:text-gray-600">
                            <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                              <SearchIcon className="h-5 w-5" aria-hidden="true" />
                            </div>
                            <input
                              id="search"
                              className="block w-full text-white bg-white bg-opacity-20 py-2 pl-10 pr-3 border border-transparent rounded-md leading-5 focus:text-gray-900 placeholder-white focus:outline-none focus:bg-opacity-100 focus:border-transparent focus:placeholder-gray-500 focus:ring-0 sm:text-sm"
                              placeholder="Search"
                              type="search"
                              name="search"
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>

                  {/* Menu button */}
                  <div className="absolute right-0 flex-shrink-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="bg-transparent p-2 rounded-md inline-flex items-center justify-center text-cyan-200 hover:text-white hover:bg-white hover:bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white">
                      <span className="sr-only">Open main menu</span>
                      {open ? (
                        <XIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      )}
                    </Popover.Button>
                  </div>
                </div>
              </div>

              <Transition.Root as={Fragment}>
                <div className="lg:hidden">
                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Popover.Overlay className="z-20 fixed inset-0 bg-black bg-opacity-25" />
                  </Transition.Child>

                  <Transition.Child
                    as={Fragment}
                    enter="duration-150 ease-out"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="duration-150 ease-in"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Popover.Panel
                      focus
                      className="z-30 absolute top-0 inset-x-0 max-w-3xl mx-auto w-full p-2 transition transform origin-top"
                    >
                      <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y divide-gray-200">
                        <div className="pt-3 pb-2">
                          <div className="flex items-center justify-between px-4">
                            <div>
                              <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/workflow-mark-cyan-600.svg"
                                alt="Workflow"
                              />
                            </div>
                            <div className="-mr-2">
                              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-cyan-500">
                                <span className="sr-only">Close menu</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                              </Popover.Button>
                            </div>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {navigation.map((item) => (
                              <a
                                key={item.name}
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div className="pt-4 pb-2">
                          <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                              <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt="" />
                            </div>
                            <div className="ml-3 min-w-0 flex-1">
                              <div className="text-base font-medium text-gray-800 truncate">{user.name}</div>
                              <div className="text-sm font-medium text-gray-500 truncate">{user.email}</div>
                            </div>
                            <button
                              type="button"
                              className="ml-auto flex-shrink-0 bg-white p-1 text-gray-400 rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
                            >
                              <span className="sr-only">View notifications</span>
                              <BellIcon className="h-6 w-6" aria-hidden="true" />
                            </button>
                          </div>
                          <div className="mt-3 px-2 space-y-1">
                            {userNavigation.map((item) => (
                              <a
                                key={item.name}
                                onClick={item.onClick}
                                className="block rounded-md px-3 py-2 text-base text-gray-900 font-medium hover:bg-gray-100 hover:text-gray-800"
                              >
                                {item.name}
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Popover.Panel>
                  </Transition.Child>
                </div>
              </Transition.Root>
            </>
          )}
        </Popover>
        {
          {
            'home': <Home />,
            'employees': <Employees />
          }[router?.query?.tab]
        }
        <footer>
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
            <div className="border-t border-gray-200 py-8 text-sm text-gray-400 text-center sm:text-left">
              <span className="block sm:inline">&copy; 2022 Noderas Private Limited</span>{' '}
              <span className="block sm:inline">All rights reserved.</span>
            </div>
          </div>
        </footer>
      </div>
      <InviteEmployee open={openInviteEmployee} setOpen={setOpenInviteEmployee} company={company} />
    </>
  )
}

const SetupCompany = (props) => {
  const [open, setOpen] = useState(false)

  const [companyName, setCompanyName] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [country, setCountry] = useState('');

  const submitForm = async () => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert([
          { company_name: companyName, about: companyAbout }
        ])
      if (error) throw error;

      let companyID = data[0].id;

      try {
        const { data, error } = await supabase
          .from('profiles')
          .insert([
            { id: props.session.user.id, first_name: firstName, last_name: lastName, company_id: companyID, access_level: 1, designation: designation }
          ])
        if (error) throw error;
      } catch (error) {
        alert(error.error_description || error.message);
      }
    } catch (error) {
      alert(error.error_description || error.message);
    }
    setOpen(false);
  }

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-white mt-20 mb-20 overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:px-6">
                  {/* header below*/}
                  <div className="px-10 py-10 text-lg max-w-prose mx-auto">
                    <h1>
                      <span className="block text-base text-center text-neutral-800 font-semibold tracking-wide uppercase">
                        Introduction
                      </span>
                      <span className="mt-2 block text-3xl text-center leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        Welcome to Noderas!
                      </span>
                    </h1>
                    <p className="mt-8 text-xl text-gray-500 leading-8">
                      You are the company's administrator! We just need a few details from you before you proceed.
                    </p>
                  </div>
                </div>
                <div className="px-4 py-5 sm:p-6">
                  <form className="px-10 py-10 space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                      <div>
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Company</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            We need your company's details for your employees to identify with!
                          </p>
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-4">
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                              Company Name <span className='text-rose-600'>*</span>
                            </label>
                            <div className="mt-1 flex rounded-md shadow-sm">
                              {/* <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                                noderas.com/
                              </span> */}
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={companyName}
                                autoComplete="username"
                                required
                                className="flex-1 focus:ring-neutral-600 focus:border-neutral-500 block w-full min-w-0 rounded-none rounded-r-md sm:text-sm border-gray-300"
                                onChange={(e) => setCompanyName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-6">
                            <label htmlFor="about" className="block text-sm font-medium text-gray-700">
                              About
                            </label>
                            <div className="mt-1">
                              <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                                defaultValue={''}
                                onChange={(e) => setCompanyAbout(e.target.value)}
                              />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Write a few sentences about the company.</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-8">
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Personal Information</h3>
                          <p className="mt-1 text-sm text-gray-500">Use a permanent address where you can receive mail.</p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                              First name <span className='text-rose-600'>*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                value={firstName}
                                autoComplete="given-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                              Last name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                              Designation
                            </label>
                            <div className="mt-1">
                              <input
                                id="designation"
                                name="designation"
                                type="text"
                                autoComplete="designation"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setDesignation(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
                              Country
                            </label>
                            <div className="mt-1">
                              <select
                                id="country"
                                name="country"
                                autoComplete="country-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
                                <option>Singapore</option>
                                <option>Singapore</option>
                                <option>Singapore</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="pt-5">
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-neutral-800 hover:bg-neutral-600"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const InviteEmployee = (props) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('');

  const submitForm = async () => {
    try {
      const res = await fetch(`/api/inviteEmployee`, {
        method: 'POST',
        body: email
      });
      const data = await res.json();

      if (!data) {
        return {
          notFound: true,
        }
      } else {
        if (data.error) {
          alert(data.error.message);
        } else {
          createProfile(data.user.id);
        }
      }
    } catch (error) {
      alert(error);
    }

    props.setOpen(false);
  }

  const createProfile = async (userID) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .insert([
          { id: userID, first_name: firstName, last_name: lastName, company_id: props?.company?.id, access_level: 2, designation: designation }
        ])
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={props.setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto" onSubmit={(e) => { e.preventDefault(); submitForm(); }}>
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-white mt-20 mb-20 overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                <div className="px-4 py-5 sm:p-6">
                  <form className="px-10 py-10 space-y-8 divide-y divide-gray-200">
                    <div className="space-y-8 divide-y divide-gray-200">
                      <div>
                        <div>
                          <h3 className="text-lg leading-6 font-medium text-gray-900">Employee</h3>
                          <p className="mt-1 text-sm text-gray-500">
                            We need your employee's details to begin.
                          </p>
                        </div>
                        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                          <div className="sm:col-span-3">
                            <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                              First name <span className='text-rose-600'>*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="first-name"
                                id="first-name"
                                value={firstName}
                                autoComplete="given-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                required
                                onChange={(e) => setFirstName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-3">
                            <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                              Last name
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setLastName(e.target.value)}
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-4">
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                              Designation
                            </label>
                            <div className="mt-1">
                              <input
                                id="designation"
                                name="designation"
                                type="text"
                                autoComplete="designation"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setDesignation(e.target.value)}
                              />
                            </div>
                          </div>
                          <div className="sm:col-span-5">
                            <label htmlFor="designation" className="block text-sm font-medium text-gray-700">
                              Email Address <span className='text-rose-600'>*</span>
                            </label>
                            <div className="mt-1">
                              <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                autoComplete="email"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                onChange={(e) => setEmail(e.target.value)}
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-5">
                      <div className="flex justify-between">
                        <button
                          type="button"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-700"
                          onClick={() => props.setOpen(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-neutral-800 hover:bg-neutral-600"
                        >
                          Done
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [profile, setProfile] = useState(null);

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session?.user.id);

      if (error) {
        throw error;
      }

      if (data.length === 0) {
        setNewUser(true);
      } else {
        setNewUser(false);
        setProfile(data[0]);
      }

    } catch (error) {
      alert(error.error_description || error.message);
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session())

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, []);

  useEffect(() => {
    if (session) {
      getProfile();
    }
  }, [session]);

  return (
    <div>
      <Head>
        <title>Noderas - {session ? 'Welcome' : 'Login'}</title>
        <meta name="description" content="Noderas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ? <Dashboard profile={profile} /> : <SignIn />}
      <SetupCompany session={session} show={newUser} />
    </div>
  )
}