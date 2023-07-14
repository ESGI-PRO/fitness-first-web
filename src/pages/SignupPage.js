import React from 'react';
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
import  RegisterForm  from '../components/auth/register';

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

// ----------------------------------------------------------------------

export default function SignUpPage() {
  const mdUp = useResponsive('up', 'md');

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
          <div className='mt-8 ml-6'>
          <img src={Logo} alt="logo" style={{ width: '120px', height: '70px'}}  />
          </div>

          <StyledContent>
            <Typography variant="h4" gutterBottom sx={{mb: 4}}>
              Sign in
            </Typography>

            <RegisterForm />


            <Typography variant="body2" sx={{ mb: 5, mt: 4 }}>
              Already have an account? {''}
              <Link variant="subtitle2" to="/login" className='text-blue-500 underline'>Login</Link>
            </Typography>
            
          </StyledContent>
        </Container>

      </StyledRoot>
    </>
  );
}
