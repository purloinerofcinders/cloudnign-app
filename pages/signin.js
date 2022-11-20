import React from 'react'
import {useState, useEffect} from 'react';

import {supabaseClient} from '../services/supabase';

import {useRouter} from 'next/router';

import Alert from "../libraries/alert";

import LoadingButton from "../libraries/loading-button";

const Form = (props) => {
  return (
    <div>
      <div className="flex h-screen">
        <div className="z-10 m-auto min-h-full flex flex-col justify-center">
          <div className="bg-white sm:py-8 px-10 sm:rounded-lg w-screen h-screen sm:w-full sm:h-full flex justify-center flex-row">
            <div className="flex flex-col justify-center">
              <div className="sm:px-10 sm:py-5">
                <div className="text-left mb-6 space-y-2">
                  <h2 className="text-5xl font-extrabold text-neutral-800">Log in </h2>
                  <h3 className="text-xl font-medium opacity-75 text-neutral-800">
                    <span className="text-stone-500">or</span> Sign up</h3>
                </div>
                <form className="space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  props.signIn(props.email);
                }}>
                  <div>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={props.email}
                        onChange={(e) => props.setEmail(e.target.value)}
                        autoComplete="email"
                        required
                        placeholder="Email address"
                        className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-400 focus:border-blue-400 text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between space-x-12 sm:space-x-20">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-stone-400 focus:outline-none focus:ring-transparent border-gray-300 rounded"
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
                        className="h-4 w-4 text-stone-400 focus:outline-none focus:ring-transparent border-gray-300 rounded"
                      />
                      <label htmlFor="stay-signed-in" className="ml-2 block text-sm text-gray-900">
                        Stay Signed-in
                      </label>
                    </div>
                  </div>
                  <div>
                    <LoadingButton loading={props.loading} label="Continue"></LoadingButton>
                  </div>
                </form>
                <div className="sm:hidden mt-20 text-center">
                  <p className="drop-shadow text-neutral-800 font-medium">Bleuhr Private Limited. 2022</p>
                </div>
                {/*<div className="mt-6">*/}
                {/*  <div className="relative">*/}
                {/*    <div className="absolute inset-0 flex items-center">*/}
                {/*      <div className="w-full border-t border-gray-300"/>*/}
                {/*    </div>*/}
                {/*    <div className="relative flex justify-center text-sm">*/}
                {/*      <span className="px-2 bg-white text-gray-500">Or continue with</span>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                
                {/*  <div className="mt-6 grid grid-cols-3 gap-3">*/}
                {/*    <div>*/}
                {/*      <a*/}
                {/*        href="#"*/}
                {/*        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"*/}
                {/*      >*/}
                {/*        <span className="sr-only">Sign in with Facebook</span>*/}
                {/*        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                {/*          <path*/}
                {/*            fillRule="evenodd"*/}
                {/*            d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z"*/}
                {/*            clipRule="evenodd"*/}
                {/*          />*/}
                {/*        </svg>*/}
                {/*      </a>*/}
                {/*    </div>*/}
                
                {/*    <div>*/}
                {/*      <a*/}
                {/*        href="#"*/}
                {/*        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"*/}
                {/*      >*/}
                {/*        <span className="sr-only">Sign in with Twitter</span>*/}
                {/*        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                {/*          <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"/>*/}
                {/*        </svg>*/}
                {/*      </a>*/}
                {/*    </div>*/}
                
                {/*    <div>*/}
                {/*      <a*/}
                {/*        href="#"*/}
                {/*        className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"*/}
                {/*      >*/}
                {/*        <span className="sr-only">Sign in with GitHub</span>*/}
                {/*        <svg className="w-5 h-5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">*/}
                {/*          <path*/}
                {/*            fillRule="evenodd"*/}
                {/*            d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"*/}
                {/*            clipRule="evenodd"*/}
                {/*          />*/}
                {/*        </svg>*/}
                {/*      </a>*/}
                {/*    </div>*/}
                {/*  </div>*/}
                {/*</div>*/}
              </div>
            </div>
          </div>
          <div className="hidden sm:block mt-10 text-center">
            <p className="drop-shadow text-white font-medium">Bleuhr Private Limited. 2022</p>
          </div>
        </div>
      </div>
      <div className="absolute px-10 bottom-10 w-full justify-items-center flex grid space-y-2 pointer-events-none">
        {
          props.alerts?.map((alert, index) => {
            if (alert.segue !== 3)
              return (
                <div key={index} className="max-w-max pointer-events-auto">
                  <Alert alert={alert} alerts={props.alerts} setAlerts={props.setAlerts}/>
                </div>
              )
          })
        }
      </div>
    </div>
  )
}

const Authenticated = () => {
  return (
    <div className="flex h-screen">
      <div className="m-auto min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <div className="text-center">
              <p
                className="mt-1 text-4xl font-extrabold drop-shadow text-white sm:text-5xl sm:tracking-tight lg:text-6xl">Signed
                In.</p>
              <p className="max-w-xl mt-5 mx-auto drop-shadow text-xl text-white">You may return to where you were. Or
                click&nbsp;
                <a href='/apply' className='underline font-semibold text-white hover:text-neutral-100'>here</a>
                &nbsp;to access the app.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const SignIn = () => {
  const [waiting, setWaiting] = useState(false);

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const [session, setSession] = useState(null);

  const [alerts, setAlerts] = useState([]);

  const supabase = supabaseClient();

  const router = useRouter();

  const hostName = process.env.NEXT_PUBLIC_HOSTNAME;
  const redirectTo = hostName + 'signin';

  const signIn = async (email) => {
    setLoading(true);

    try {
      const {error} = await supabase.auth.signIn({email}, {
        redirectTo: redirectTo
      });

      if (error)
        throw error;

      setAlerts([...alerts, {
        segue: 1,
        state: 'success',
        title: 'Success',
        message: 'Email sent! Check your inbox for the login link.'
      }]);


      setWaiting(true);
    } catch (error) {
      setAlerts([...alerts, {
        segue: 1,
        state: 'error',
        title: 'Error',
        message: error.message || error.error_description
      }]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    })
  }, []);

  useEffect(() => {
    if (session && waiting) {
      router.push('/apply');
    }
  }, [session])

  return (
    <div>
      {
        session ? <Authenticated/> : <Form
          email={email}
          setEmail={setEmail}
          signIn={signIn}
          loading={loading}
          alerts={alerts}
          setAlerts={setAlerts}
        />
      }
    </div>
  )
}

export default SignIn;