import {CheckCircleIcon, XIcon, XCircleIcon} from '@heroicons/react/solid'

export default function Alert(props) {
  return (
    <div className={"rounded-md p-4 " + {'success': "bg-emerald-50", 'error': "bg-rose-50"}[props.state]}>
      <div className="flex">
        <div className="flex-shrink-0">
          {
            {
              'success': <CheckCircleIcon className="h-5 w-5 text-emerald-400" aria-hidden="true"/>,
              'error': <XCircleIcon className="h-5 w-5 text-rose-400" aria-hidden="true"/>
            }[props.state]
          }
        </div>
        <div className="ml-3">
          <p className={"text-sm font-medium " + {'success': "text-emerald-800", 'error': "text-rose-800"}[props.state]}>{props.message}</p>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              type="button"
              className={"inline-flex rounded-md p-1.5 focus:outline-none " + {'success': "bg-emerald-50 text-emerald-500 hover:bg-emerald-100", 'error': "bg-rose-50 text-rose-500 hover:bg-rose-100"}[props.state]}
              onClick={() => props.action()}
            >
              <span className="sr-only">Dismiss</span>
              <XIcon className="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}