import React from 'react';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
// @mui
import { styled, alpha } from '@mui/material/styles';
import { Box, Link, Drawer, Typography, Avatar } from '@mui/material';
// mock
import account from '../../../_mock/account';
// hooks
import useResponsive from '../../../hooks/useResponsive';
// components
import Logo from '../../../assets/images/Logo.png';
import Scrollbar from '../../../components/scrollbar';
import NavSection from '../../../components/nav-section';
//
import navConfig from './config';
import { getLoggedInUser } from '../../../utils/auth.utils';
import { APIClient } from '../../../services/api.client';
import notif from '../../../services/alert';
// @mui
import { LoadingButton } from '@mui/lab';
import { colors } from '../../../constants/globals'; 

// ----------------------------------------------------------------------

const client = new APIClient();

const NAV_WIDTH = 280;

const StyledAccount = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  padding: theme.spacing(2, 2.5),
  borderRadius: Number(theme.shape.borderRadius) * 1.5,
  backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

// ----------------------------------------------------------------------

Nav.propTypes = {
  openNav: PropTypes.bool,
  onCloseNav: PropTypes.func,
};

export default function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();
  const user = getLoggedInUser();
  const isDesktop = useResponsive('up', 'lg');
  const [loading, setLoading] = useState(false);

  const requestTrainer = async () => {
    setLoading(true);
    try {
      await client.post('/users/role/change_request/' + user?.id, {});
      notif.success('Request sent');
    }
    catch (error) {
      notif.error('Something went wrong');
      // console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        '& .simplebar-content': { height: 1, display: 'flex', flexDirection: 'column' },
      }}
    >
      <img src={Logo} alt="logo" style={{ width: '120px', height: '60px', margin: '20px 20px' }} />

      <Box sx={{ mb: 5, mx: 3 }}>
      <StyledAccount >

        <Link underline="none">
          <div className='flex flex-row'>
            <Avatar src={account.photoURL} alt="photoURL" />

            <Box sx={{ ml: 2 }}>

              <p className='blackColor14Medium'>
                {user?.userName}
              </p>

              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {user?.email}
              </Typography>

              <div className='flex w-full'>
        {
            user?.trainerSpeciality && <p className='primaryColor10SemiBold'>
                {
               user?.trainerSpeciality
            } TRAINER</p>}
        </div>
            </Box>
          </div>
        </Link>
        </StyledAccount>
      </Box>

      {!user?.isTrainer &&
            <LoadingButton size="small" type="submit"
            variant="text"
            loading={loading}
            onClick={requestTrainer}
            sx={{
              mt: 0,
              mb: 3,
              mx: 6,
              bgcolor: colors.primary,
              color: 'white',
              '&:hover': {
                  bgcolor: colors.primary,
                  color: 'white',
              },
            }}
            >
              To be a coach
            </LoadingButton> 
      }

      <NavSection data={navConfig(user)} />

      <Box sx={{ flexGrow: 1 }} />

    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: 'background.default',
              borderRightStyle: 'dashed',
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
