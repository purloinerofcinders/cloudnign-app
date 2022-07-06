import React from 'react'
import { useState } from 'react'

import { Fragment } from 'react'
import { Transition, Dialog } from '@headlessui/react'

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

    // try {
    //   const { data, error } = await supabaseClient
    //     .from('companies')
    //     .insert([
    //       { company_name: companyName, about: companyAbout }
    //     ])
    //   if (error) throw error;

    //   let companyID = data[0].id;

    //   try {
    //     const { data, error } = await supabaseClient
    //       .from('profiles')
    //       .insert([
    //         { id: props.session.user.id, first_name: firstName, last_name: lastName, company_id: companyID, access_level: 1, designation: designation }
    //       ])
    //     if (error) throw error;
    //   } catch (error) {
    //     alert(error.error_description || error.message);
    //   }
    // } catch (error) {
    //   alert(error.error_description || error.message);
    // }
    // setOpen(false);
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

export default SetupCompany;