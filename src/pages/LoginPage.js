import React, {useEffect} from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
import Logo from '../assets/images/Logo.png';
// sections
import  LoginForm  from '../components/auth/login';
import { isUserAuthenticated } from '../utils/auth.utils';
import { useAppState } from '../context/app-state-context';
import { useModal } from '../context/modal-context';
import AuthService from '../services/api/auth.service';
import SubscriptionCard from '../components/Subscription';


// ----------------------------------------------------------------------

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 580,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: 'calc(100vh - 100px)',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));

const authService = new AuthService();

export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const {setAppState} = useAppState();
  const modal = useModal();

  useEffect(() => {
    const init = async () => {
   const isSubscribe = await authService.isSubscribe() || false;
   console.log('isSubscribe', isSubscribe);

    if (isUserAuthenticated()) {
      if (isSubscribe) {
        setAppState({isSubscribe: true });
        navigate('/dashboard', { replace: true });
      }else{
        modal.showModal(<SubscriptionCard
          close={() => modal.hideModal()}
        />, true, true);
      }
    }

  };
  init();
  }, []);


  return (
    <>
      <Helmet>
        <title> Login </title>
      </Helmet>

      <StyledRoot>

        {mdUp && (
          <StyledSection>
            <img src="/assets/illustrations/illustration_login.png" alt="login" className='h-full' />
          </StyledSection>
        )}

        <Container maxWidth="sm" >
          <div className='mt-16 ml-6'>
          <img src={Logo} alt="logo" style={{ width: '120px', height: '70px'}}  />
          </div>

          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
              Sign in
            </Typography>

            <LoginForm />


            <Typography variant="body2" sx={{ mb: 5, mt: 4 }}>
              Don’t have an account? {''}
              <Link variant="subtitle2" to="/register" className='text-blue-500 underline'>Sign Up</Link>
            </Typography>
            
          </StyledContent>
        </Container>

      </StyledRoot>
    </>
  );
}
