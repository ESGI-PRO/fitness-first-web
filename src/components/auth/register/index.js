import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Select, MenuItem } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../iconify';

import AuthService from '../../../services/api/auth.service';
import { useAppState } from '../../../context/app-state-context';
import { colors } from '../../../constants/globals';
import { setLoggedInUser } from '../../../utils/auth.utils';



const authService = new AuthService();

export default function RegisterForm({update=false, user}) {
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

useEffect(() => {
  if(user){
    setState({
      email: user.email || '',
      password: user.password || '',
      confirm_password: user.password || '',
      username: user.userName || '',
      error: ''
    })
  }
}, [user])

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
    if(!update){
      if (!state.email || !state.password || !state.confirm_password || !state.mobile || !state.username) {
          setState({ ...state, error: 'Please fill all the fields' });
          return;
      }
    }
    if(state.password !== state.confirm_password){
        setState({ ...state, error: 'Password and confirm password should be same' });
        return;
    }

    setLoading(true);

    if(update === true){
      const data = {
        userName: state.username,
        email: state.email,
    }
    if(state.password){
      data.password = state.password;
    }
  console.log('data', data);
      authService.updateUser(data, user.id).then((res) => {
        setLoading(false);
        console.log('resherebro', res);
        reset();
        setAppState({user: res});
        setLoggedInUser(res);
      }).catch((err) => {
        setLoading(false);
        setState({ ...state, error: "Something went wrong updating user"});
        console.log('err', err);
      })
      return;
    }else{
      const data = {
        userName: state.username,
        email: state.email,
        password: state.password,
        mobileNumber: state.mobile,
        isTrainer: false,
    }
  
      authService.register(data).then((res) => {
        setLoading(false);
        console.log('res', res);
        reset();
        setAppState({user: res.user, tokens: res.token});
        navigate('/dashboard', { replace: true });

    }).catch((err) => {
        setLoading(false);
        setState({ ...state, error: err.response.errors});
    })
    }

}

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value, error: '' });
  }

  return (
    <>

      <Stack spacing={2}>

       {state?.error &&  <p className="text-red-500 text-sm ">{state.error}</p>}
        <TextField name="username" label="User Name"   onChange={onChange} value={state.username}/>

       {!update && <TextField name="mobile" label="Mobile Number" type='number' onChange={onChange} value={state.mobile}/>}

        <TextField name="email" label="Email address"  onChange={onChange} value={state.email}/>

        <TextField
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          value={state.password}
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
          value={state.confirm_password}
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
       { update ? 'Update' :'Login'}
      </LoadingButton>
    </>
  );
}
