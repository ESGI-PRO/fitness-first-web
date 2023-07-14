import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Select, MenuItem } from '@mui/material';
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    confirm_password: '',
    mobile: '',
    username: '',
    error: ''
  });

  const reset = () => {
    setState({
      email: '',
      password: '',
      confirm_password: '',
      mobile: '',
      username: '',
      error: ''
    });
  }

  const register = () => {

    if (!state.email || !state.password || !state.confirm_password || !state.mobile || !state.username) {
        setState({ ...state, error: 'Please fill all the fields' });
        return;
    }
    if(state.password !== state.confirm_password){
        setState({ ...state, error: 'Password and confirm password should be same' });
        return;
    }
    const data = {
      userName: state.username,
      email: state.email,
      password: state.password,
      mobileNumber: state.mobile,
      isTrainer: false,
  }

    setLoading(true);
    authService.register(data).then((res) => {
        setLoading(false);
      console.log('res', res);
        reset();
        setAppState({user: res.user, tokens: res.token});
        navigate('/dashboard', { replace: true });

    }).catch((err) => {
        setLoading(false);
        setState({ ...state, error: err.response.errors});
        console.log('err', err);
    })
}

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value, error: '' });
  }

  return (
    <>

      <Stack spacing={2}>

       {state?.error &&  <p className="text-red-500 text-sm ">{state.error}</p>}
        <TextField name="username" label="User Name"   onChange={onChange} />

        <TextField name="mobile" label="Mobile Number" type='number' onChange={onChange}/>

        <TextField name="email" label="Email address"  onChange={onChange} />

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
        <TextField
          name="confirm_password"
          label="Confirm Password"
          type={showConfirmPassword ? 'text' : 'password'}
          onChange={onChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  <Iconify icon={showConfirmPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>


      <LoadingButton fullWidth size="large" type="submit"
      variant="contained"
      loading={loading}
      onClick={register}
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
