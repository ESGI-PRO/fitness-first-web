import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../iconify';

import AuthService from '../../../services/api/auth.service';
import { useAppState } from '../../../context/app-state-context';
import { colors } from '../../../constants/globals';


const authService = new AuthService();

export default function LoginForm() {
  const navigate = useNavigate();
  const {setAppState} = useAppState();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    error: ''
  });


  const login = () => {
    console.log('state', state);
    if (!state.email || !state.password) {
        setState({ ...state, error: 'Please fill all the fields' });
        return;
    }

    setLoading(true);
    authService.login({
      email: state.email,
      password: state.password
  }).then((res) => {
        setLoading(false);
        console.log('res', res);
        setAppState({user: res.user, tokens: res.tokens, error: res.errors});
        navigate('/dashboard', { replace: true });
    }).catch((err) => {
        setLoading(false);
        console.log('err', err);
    })
}

const onChange = (e) => {
  setState({ ...state, [e.target.name]: e.target.value });
}

  return (
    <>

      <Stack spacing={2}>

       {state.error &&  <p className="text-red-500 text-sm ">{state.error}</p>}

        <TextField name="email" label="Email address" onChange={onChange}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>


      <LoadingButton fullWidth size="large" type="submit"
      loading={loading}
      variant="contained"
      onClick={login}
      sx={{
        mt: 3,
        mb: 2,
        bgcolor: colors.primary,
        color: 'white',
        '&:hover': {
            bgcolor: colors.primary,
            color: 'white',
        },
      }}
      >
        Login
      </LoadingButton>
    </>
  );
}
