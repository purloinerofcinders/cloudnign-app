import React from "react";
import { useState } from 'react'
import { Switch } from '@headlessui/react'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Toggle(props) {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch.Label as="span" className="flex mr-3 space-x-3">
        <span className="text-sm font-medium text-gray-900">{props.label}</span>
        <span className="text-sm text-gray-500">{props.subLabel}</span>
      </Switch.Label>
      <Switch
        checked={props.enabled}
        onChange={props.setEnabled}
        className={classNames(
          props.enabled ? 'bg-neutral-800' : 'bg-gray-200',
          'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none'
        )}
      >
        <span
          aria-hidden="true"
          className={classNames(
            props.enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 rounded bg-white shadow transform ring-0 transition ease-in-out duration-200'
          )}
        />
      </Switch>
    </Switch.Group>
  )
}