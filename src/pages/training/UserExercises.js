import React, {useState, useEffect} from 'react';
import {Container, Box} from '@mui/material';
import {getRandomeUserImage} from '../../constants/globals';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ExerciseCard from '../../components/ExerciseCard';
import TrainingService from '../../services/api/training.service';
import { useAppState } from '../../context/app-state-context';
import { getLoggedInUser } from '../../utils/auth.utils';


const trainingService = new TrainingService();

export default function UserTrainingList({setOpenUserList}) {
    const user = getLoggedInUser();
    const {appState} = useAppState();
    const [exercises, setExercises] = useState([]);
    const currentUser = appState?.selectedUser;


    useEffect(() => {
        const fetchExercisesData = async () => {
            let exercisesData = [];
            if(user?.isTrainer){
                exercisesData = await trainingService.getAllUserTrainingByTrainer(currentUser?.id);
                setExercises(exercisesData.exercises);
            }else{
                exercisesData = await trainingService.getAllUserTraining(user.trainerId);
                setExercises(exercisesData.exercises);
            }

        };

        fetchExercisesData();
    }, []);

    return (
        <>
            <Container>
            {setOpenUserList &&
            <div className='flex flex-row w-full justify-between'>
                    <div className="flex flex-row mb-2">
                        <ArrowBackIcon className="cursor-pointer"
                            onClick={
                                () => setOpenUserList(false)
                            }/>
                        <img src={
                                getRandomeUserImage()
                            }
                            className='h-8 w-8 rounded-full ml-2'/>
                        <p className="text-xl font-bold ml-4">
                            {
                            currentUser?.userName[0]?.toUpperCase() + currentUser?.userName?.slice(1)
                        }</p>
                    </div>
                </div>}


                <div className="flex flex-col  overflow-y-scroll mt-2 items-center"
                    style={
                        {height: 'calc(100vh - 230px)'}
                }>

<div className='flex flex-col flex-wrap'>
          {  exercises && exercises.length > 0 ?   <Box sx={
                    {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    }
                }>
                    {
                    exercises?.map((exercise, idx) => {
                        return (
                            <Box sx={
                                    {
                                        display: 'flex',
                                        m: '10px'
                                    }
                                }
                                key={idx}>
                                <ExerciseCard exercise={exercise.content}/>
                            </Box>
                        )
                    })
                } 
                </Box> : <div className="flex flex-1 items-center justify-center">
                    <p className='text-xl font-bold ml-4 blackColor14SemiBold my-32'>
                        Pas de Training piur le moment !
                        Veuillez attendre que votre trainer vous créez un programme
                    </p>

                    </div>}
                </div>
                </div>

            </Container>
        </>
    );
}
