import React from "react";
import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";

import DropBox from "../libraries/dropbox";
import LoadingButton from "../libraries/loading-button";

const LeaveDetails = (props) => {
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
                <div className="bg-white mt-20 mb-20 overflow-hidden shadow rounded-3xl">
                  <div className="px-4 py-5 sm:p-6">
                    <form className="px-10 py-10 space-y-8">
                      <div className="space-y-8 divide-y divide-gray-200">
                        <div>
                          <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900 text-left">
                              Leave
                            </h3>
                            <p className="mt-1 text-sm text-gray-500 text-left">
                              Details of applied leave.
                            </p>
                          </div>
                          <div className="mt-6 bg-gray-100 px-7 py-7 rounded-lg">
                            <div className="grid gap-x-20 gap-y-6 grid-cols-1 text-left sm:grid-cols-2">
                              <div>
                                <p className="font-semibold text-neutral-400 font-mono text-xs">STATUS</p>
                                <p className="text-base text-neutral-800">Approved</p>
                              </div>
                              <div>
                                <p className="font-semibold text-neutral-400 font-mono text-xs">TYPE</p>
                                <p className="text-base text-neutral-800">Annual</p>
                              </div>
                              <div>
                                <p className="font-semibold text-neutral-400 font-mono text-xs">START DATE</p>
                                <p className="text-base text-neutral-800">1/1/1979</p>
                              </div>
                              <div>
                                <p className="font-semibold text-neutral-400 font-mono text-xs">END DATE</p>
                                <p className="text-base text-neutral-800">1/1/1900</p>
                              </div>
                              
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between">
                          <button
                            type="button"
                            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-red-400 hover:bg-red-500"
                            onClick={() => props.setOpen(false)}
                          >
                            Cancel
                          </button>
                          <div className="flex flex-row space-x-3">
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-red-400 shadow-sm text-sm font-medium rounded-full text-red-400 hover:bg-red-200"
                              onClick={() => props.setOpen(false)}
                            >
                              Delete
                            </button>
                            <button
                              type="button"
                              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-full text-white bg-amber-400 hover:bg-amber-500"
                              onClick={() => props.setOpen(false)}
                            >
                              Edit
                            </button>
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

export default LeaveDetails;
