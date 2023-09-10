import React, {useEffect, useState} from 'react';
import {Helmet} from 'react-helmet-async';
import {Container} from '@mui/material';
import AuthService from '../../services/api/auth.service';
import {getRandomeUserImage} from '../../constants/globals';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import AssignExercisesPage from './AssignExercisesPage';
import {useAppState} from '../../context/app-state-context';
import UserTrainingList from './UserExercises';

const authService = new AuthService();

export default function TrainerPage({user}) {
    const [users, setUsers] = useState([]);
    const {appState, setAppState} = useAppState();
    const [state, setState] = useState({trainerPage: true, openAssignExercises: false, userList: false});

    useEffect(() => {
        const init = async () => {
            if (user) {
                const response = await authService.getUsersByIds(user ?. traineeIds);
                console.log('response', response);
                setUsers(response);
            }
        };
        init();
    }, []);

    const assignTrainings = (item) => {
        setAppState({
            ...appState,
            selectedUser: item
        })
        setState({
            ...state,
            openAssignExercises: true,
            trainerPage: false
        });
    };

    const setOpenAssignExercises = (val) => {
        setState({
            ...state,
            openAssignExercises: val,
            trainerPage: !val,
            userList: false
        });
    }

    const setOpenUserList = (value) => {
        setState({
            ...state,
            userList: value,
            trainerPage: !value
        });
    }

    const openUserList = (item) => {
            setOpenUserList(true)
            setAppState({
                selectedUser: item
            })
    }


    const RenderItem = ({item, index}) => {

        return (
            <div className='mx-4 flex-col flex w-full'>
                <div className="flex flex-row w-full">
                        <button onClick={() => openUserList(item)}
                            className="pr-5 py-2 flex flex-row items-center cursor-pointer">
                            <p className="text-blue-500 mr-2">View Exercises</p>
                            <KeyboardDoubleArrowRightIcon className="text-blue-500"/>
                        </button>
                </div>

                <div className='flex   w-full flex-row items-center'>
                    <img src={
                            getRandomeUserImage()
                        }
                        className='h-8 w-8 rounded-full'/>
                    <div className='flex flex-row justify-between items-end w-full ml-4'>
                        <div>
                            <p className='blackColor18Medium'>
                                {
                                item.userName[0].toUpperCase() + item.userName.slice(1)
                            } </p>
                            {
                            item ?. trainerSpeciality && <p className='grayColor14Regular'>
                                {
                                item ?. trainerSpeciality
                            } </p>
                        } </div>

                        <div onClick={
                                () => assignTrainings(item)
                            }
                            className='px-5 py-2 flex flex-row items-center cursor-pointer primaryColorBackground'>
                            <p className="whiteColor14Medium mr-2">Assign Exercises</p>
                            <KeyboardDoubleArrowRightIcon className="whiteColor14Medium"/>
                        </div>
                    </div>
                </div>
                {
                index !== users.length - 1 && <div className='my-8 w-full grayColorBackground'
                    style={
                        {height: 0.5}
                    }/>
            } </div>
        )
    }

    const RenderTraineeList = () => {
        return(users ?. map((item, index) => {
            return (
                    <RenderItem item={item}
                        key={index}
                        index={index}/>
            );
        }))
    }

    return (
        <>
            <Helmet>
                <title>
                    Dashboard: Training</title>
            </Helmet>

            <Container>
                <div className="flex flex-1 mt-8  flex-col">
                    {
                    state.openAssignExercises && <AssignExercisesPage setOpenAssignExercises={setOpenAssignExercises}
                       />
                }
                {
                    state.trainerPage && <RenderTraineeList />
                }
                    {
                    state.userList && <UserTrainingList setOpenUserList={setOpenUserList}
                     />
                } </div>
            </Container>
        </>
    );
}
