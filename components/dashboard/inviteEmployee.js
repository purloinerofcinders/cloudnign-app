import React from 'react'
import { useState, useEffect } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Fragment } from 'react'
import { Menu, Popover, Transition, Dialog } from '@headlessui/react'

const InviteEmployee = (props) => {
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
        <div className="fixed z-10 inset-0 overflow-y-auto" onSubmit={(e) => { e.preventDefault(); props?.submitForm(); }}>
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
              <Dialog.Panel className="relative">
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
                                  value={props.firstName}
                                  autoComplete="given-name"
                                  className="shadow-sm focus:ring-neutral-800 focus:border-neutral-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                  required
                                  onChange={(e) => props.setFirstName(e.target.value)}
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
                                  value={props.lastName}
                                  autoComplete="family-name"
                                  className="shadow-sm focus:ring-neutral-800 focus:border-neutral-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) => props.setLastName(e.target.value)}
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
                                  value={props.designation}
                                  autoComplete="designation"
                                  className="shadow-sm focus:ring-neutral-800 focus:border-neutral-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) => props.setDesignation(e.target.value)}
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
                                  value={props.email}
                                  autoComplete="email"
                                  className="shadow-sm focus:ring-neutral-800 focus:border-neutral-800 block w-full sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) => props.setEmail(e.target.value)}
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
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default InviteEmployee;

