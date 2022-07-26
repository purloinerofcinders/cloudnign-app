import React from 'react'
import { useState, useEffect, Fragment } from 'react'
import { supabaseClient } from '../services/supabase';
import Head from 'next/head'
import Dashboard from "../components/dashboard";
import { useRouter } from 'next/router';
import { Transition, Dialog } from '@headlessui/react'

import {fetcher} from "../utilities/fetcher";

const SetupCompany = (props) => {
  const [open, setOpen] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');

  const submitForm = async () => {
    try {
      const res = await fetch(`/api/postCompany`, {
        method: 'POST',
        body: JSON.stringify({
          session: props?.session,
          company_name: companyName,
          company_about: companyAbout
        })
      });

      const data = await res.json();
      const companyID = data?.company_id;

      if (data?.error) {
        alert(data.error);
      } else {
        const res = await fetch(`/api/postProfile`, {
          method: 'POST',
          body: JSON.stringify({
            session: props.session,
            userID: props.session?.user?.id,
            first_name: firstName,
            last_name: lastName,
            company_id: companyID,
            access_level: 1,
            designation: designation
          })
        });

        const data = await res.json();

        if (!data?.error) {
          
        }
      }
    } catch (error) {
      alert(error);
    }
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
                              <input
                                type="text"
                                name="username"
                                id="username"
                                value={companyName}
                                autoComplete="username"
                                required
                                className="flex-1 focus:ring-sky-200 focus:border-sky-400 block w-full min-w-0 rounded-md sm:text-sm border-gray-300 rounde"
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
                                className="shadow-sm focus:ring-sky-200 focus:border-sky-400 block w-full sm:text-sm border border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-sky-200 focus:border-sky-400 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-sky-200 focus:border-sky-400 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-sky-200 focus:border-sky-400 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-sky-200 focus:border-sky-400 block w-full sm:text-sm border-gray-300 rounded-md"
                              >
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

export default function App() {
  const [authState, setAuthState] = useState('loading');

  const [session, setSession] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [profile, setProfile] = useState(null);

  const [company, setCompany] = useState();

  //setupcompany
  const [openSetupCompany, setOpenSetupCompany] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');

  const supabase = supabaseClient();

  const router = useRouter();

  const Loading = () => {
    return (
      <div className="flex h-screen">
        <div className="m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className='animate-bounce'>
            <svg role="status" className="inline w-10 h-10 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-neutral-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
            </svg>
          </div>
        </div>
      </div>
    );
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error)
        throw error

      router.push('/signin');
    } catch (error) {
      alert(error.error_description || error.message);
      router.push('/signin');
    }
  };

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id);

      if (error)
        throw error;

      if (data.length === 0)
        setNewUser(true);
      else {
        setNewUser(false);
        setProfile(data[0]);
      }

    } catch (error) {
      alert(error.message || error.error_description);
    }
  }

  const getCompany = async () => {
    try {
      const res = await fetch(`/api/getCompany`, {
        method: 'POST',
        body: JSON.stringify({
          session: session,
          profile: profile,
          company_id: profile?.company_id
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
          if (data.length === 0) {
            alert("not found");
          } else {
            setCompany(data?.company);
          }
        }
      }
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  useEffect(() => {
    if (session) {
      setAuthState('authenticated');
      getProfile();
    } else {
      setAuthState('searching');
    }
  }, [session]);

  useEffect(() => {
    if (authState === 'searching') {
      if (!session)
        setAuthState('requireSignIn');
    } else if (authState === 'requireSignIn') {
      router.push('/signin');
    }
  }, [authState])

  useEffect(() => {
    if (profile)
      getCompany();
  }, [profile])

  return (
    <div>
      <Head>
        <title>Minute Moon - {session ? 'Welcome' : 'Login'}</title>
        <meta name="description" content="Minute Moon" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        {
          'loading':
            <Loading />,
          'searching':
            <Loading />,
          'authenticated':
            <Dashboard
              session={session}
              profile={profile}
              company={company}
              signOut={signOut}
            />, '*':
            <Loading />
        }[authState]
      }
      <SetupCompany
        session={session}
        show={newUser} 
      />
    </div>
  )
}