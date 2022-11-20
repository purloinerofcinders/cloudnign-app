import React from "react";

import {CheckCircleIcon, XIcon, XCircleIcon} from '@heroicons/react/solid'
import {useEffect, useState} from "react";
import {Transition} from "@headlessui/react";

export default function Alert(props) {
  const [segue, setSegue] = useState(1);
  
  const timeoutMs = 3000;
  
  useEffect(() => {
    if (segue !== 3) {
      setSegue(2);

      const timeout = setTimeout(() => {
        setSegue(3);

        clearTimeout(timeout);
      }, timeoutMs);
    }
  })

  return (
    <Transition show={segue === 2}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className={"shadow rounded-md p-4 " + {'success': "bg-emerald-50", 'error': "bg-rose-50"}[props.alert?.state]}>
        <div className="flex">
          <div className="flex-shrink-0">
            {
              {
                'success': <CheckCircleIcon className="h-5 w-5 text-emerald-400" aria-hidden="true"/>,
                'error': <XCircleIcon className="h-5 w-5 text-rose-400" aria-hidden="true"/>
              }[props.alert?.state]
            }
          </div>
          <div className="ml-3">
            <p className={"text-sm font-medium " + {
              'success': "text-emerald-800",
              'error': "text-rose-800"
            }[props.alert?.state]}>{props.alert?.message}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className={"inline-flex rounded-md p-1.5 focus:outline-none " + {
                  'success': "bg-emerald-50 text-emerald-500 hover:bg-emerald-100",
                  'error': "bg-rose-50 text-rose-500 hover:bg-rose-100"
                }[props.alert?.state]}
                onClick={() => setSegue(3)}
              >
                <span className="sr-only">Dismiss</span>
                <XIcon className="h-5 w-5" aria-hidden="true"/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}