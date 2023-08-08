import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Stack, Typography, Radio } from '@mui/material';
import { getLoggedInUser } from '../utils/auth.utils';
import { useAppState } from '../context/app-state-context';

const ExerciseCard = ({ exercise, handleChange, checked }) => {
  const {appState} = useAppState();
  const user = getLoggedInUser();

  return (
  <div className="exercise-card">
  <Link  to={`/exercise/${exercise.id}`}>
    <img src={exercise.gifUrl} alt={exercise.name} loading="lazy"  />
    <Stack direction="row">
      <Button sx={{ ml: '21px', color: '#fff', background: '#FFA9A9', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.bodyPart}
      </Button>
      <Button sx={{ ml: '21px', color: '#fff', background: '#FCC757', fontSize: '14px', borderRadius: '20px', textTransform: 'capitalize' }}>
        {exercise.target}
      </Button>
    </Stack>
    <Typography ml="21px" color="#000" fontWeight="bold" sx={{ fontSize: { lg: '24px', xs: '20px' } }} mt="11px" pb="10px" textTransform="capitalize">
      {exercise.name}
    </Typography>
  </Link>
  {handleChange && <div className='absolute top-2 right-4'>
    <Radio
      checked={checked}
      onClick={ () => handleChange({
        user_id: appState.selectedUser?.id,
        trainer_id: user?.id,
        content: exercise
      })}
      name="radio-button"
    />
    </div>}
  </div>

)};

export default ExerciseCard;
