import React from 'react'
import { useState, useEffect } from 'react'

import { supabaseClient } from '../lib/supabase'

import Head from 'next/head'

import Dashboard from '../components/dashboard/dashboard';
import SignIn from '../components/signIn/signIn';
import SetupCompany from '../components/signIn/setupCompany';

export default function App() {
  const [session, setSession] = useState(null);
  const [newUser, setNewUser] = useState(false);
  const [profile, setProfile] = useState(null);

  const [company, setCompany] = useState();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  //setupcompany
  const [openSetupCompany, setOpenSetupCompany] = useState(false);

  const [companyName, setCompanyName] = useState('');
  const [companyAbout, setCompanyAbout] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [designation, setDesignation] = useState('');

  const supabase = supabaseClient();

  const getProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', session.user.id)
        .single();

      if (error)
        throw error;

      if (!data) {
        return {
          notFound: true,
        }
      } else {
        if (data.error) {
          alert(data.error);
        } else {
          if (data.length === 0) {
            setNewUser(true);
          } else {
            setNewUser(false);
            setProfile(data);
          }
        }
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

  const signIn = async (email) => {
    setLoading(true);

    try {
      const { error } = await supabase.auth.signIn({ email }, {
        redirectTo: process.env.HOSTNAME + 'home'
      });

      if (error)
        throw error;

      alert('Check your email for the login link!');
    } catch (error) {
      alert(error.error_description || error.message)
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
    if (session) 
      getProfile();
  }, [session]);

  useEffect(() => {
    if (profile)
      getCompany();
  }, [profile])

  return (
    <div>
      <Head>
        <title>Noderas - {session ? 'Welcome' : 'Login'}</title>
        <meta name="description" content="Noderas" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {session ?
        <Dashboard
          session={session}
          profile={profile}
          company={company}
        /> :
        <SignIn
          session={session}
          email={email}
          setEmail={setEmail}
          loading={loading}
          signIn={signIn}
        />}
      <SetupCompany 
        session={session} 
        show={newUser} />
    </div>
  )
}