import React from "react";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

import DropBox from "../libraries/dropbox";
import LoadingButton from "../libraries/loading-button";

const ApplyLeave = (props) => {
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
        <div
          className="fixed z-10 inset-0 overflow-y-auto"
          onSubmit={(e) => {
            e.preventDefault();
            props?.submit();
          }}
        >
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
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                              New Leave
                            </h3>
                            <p className="mt-1 text-sm text-gray-500">
                              Enter the details of your new leave application.
                            </p>
                          </div>
                          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="start-date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Start Date{" "} <span className="text-rose-600">*</span>
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="start-date"
                                  id="start-date"
                                  value={props.startDate}
                                  className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                  required
                                  onChange={(e) =>
                                    props.setStartDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="end-date"
                                className="block text-sm font-medium text-gray-700"
                              >
                                End Date{" "} <span className="text-rose-600">*</span>
                              </label>
                              <div className="mt-1">
                                <input
                                  type="date"
                                  name="end-date"
                                  id="end-date"
                                  value={props.endDate}
                                  className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                  required
                                  onChange={(e) =>
                                    props.setEndDate(e.target.value)
                                  }
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-4">
                              <DropBox title="Type" required items={props.items} selectedItem={props.type} setSelectedItem={props.setType} />
                            </div>
                            <div className="sm:col-span-5">
                              <label
                                htmlFor="Remarks"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Remarks
                              </label>
                              <div className="mt-1">
                                <input
                                  id="Remarks"
                                  name="Remarks"
                                  type="text"
                                  value={props.remarks}
                                  className="shadow-sm focus:ring-blue-400 focus:border-blue-400 block w-full sm:text-sm border-gray-300 rounded-md"
                                  onChange={(e) =>
                                    props.setRemarks(e.target.value)
                                  }
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
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-400 hover:bg-red-700"
                            onClick={() => props.setOpen(false)}
                          >
                            Cancel
                          </button>
                          <div className="w-fit">
                            <LoadingButton loading={props.loading} label="Done"></LoadingButton>
                          </div>
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
};

export default ApplyLeave;
