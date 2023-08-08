import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import {Container} from '@mui/material';
import { getLoggedInUser } from '../utils/auth.utils';
import UserVerticalCard from '../components/UserVerticalCard';
import RegisterForm from '../components/auth/register';
import { useAppState } from '../context/app-state-context';

export default function ProfilePage() {
  const {appState, setAppState} = useAppState();
  const user =  appState?.user || getLoggedInUser();
  const subscription = JSON.parse(localStorage.getItem('subscription')) || {};

  return (
    <>
      <Helmet>
        <title> Dashboard: Profile | Minimal UI </title>
      </Helmet>

      <Container>
      <div className='flex flex-col w-full items-center'>
        <UserVerticalCard user={user} subscription={subscription}/>

       <div className='flex flex-1 flex-col' style={{maxWidth: 500, minWidth: 400}}>
       <RegisterForm update={true} user={user} />
       </div>
      </div>
      </Container>
    </>
  );
}
