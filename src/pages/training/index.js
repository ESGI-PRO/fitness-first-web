import React from 'react';
import { Helmet } from 'react-helmet-async';
// @mui
import { Container} from '@mui/material';
import { getLoggedInUser } from '../../utils/auth.utils';
import TraineePage from './TraineePage';
import TrainerPage from './TrainerPage';

export default function TrainingPage() {
  const user = getLoggedInUser();

  return (
    <>
      <Helmet>
        <title> Dashboard: Training | Minimal UI </title>
      </Helmet>

      <Container>
       {
          user?.isTrainer ? <TrainerPage user={user} /> : <TraineePage  user={user}/>
       }
      </Container>
    </>
  );
}
