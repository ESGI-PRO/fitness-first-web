import React, {useState, useEffect} from 'react';
import {Helmet} from 'react-helmet-async';
import {Box, Container} from '@mui/material';
import {getRandomeUserImage} from '../../constants/globals';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Pagination from '@mui/material/Pagination';
import ExerciseCard from '../../components/ExerciseCard';
import {exerciseOptions, fetchData} from '../../utils/fetchData';
import { useAppState } from '../../context/app-state-context';
import TrainingService from '../../services/api/training.service';
import notif from '../../services/alert';


const trainingService = new TrainingService();

export default function AssignExercisesPage({setOpenAssignExercises}) {
    const {appState} = useAppState();
    const [selectedExercises, setSelectedExercises] = useState([]);
    const [exercises, setExercises] = useState([]);
    const [exercisesPerPage] = useState(6);
    const [search, setSearch] = useState('');
    const [bodyPart, setBodyPart] = useState('all');
    const [currentPage, setCurrentPage] = useState(1);

    const assignTrainings = async () => {
        // console.log("selectedExercises", selectedExercises);
        await trainingService.createExercises({
            exercises: selectedExercises,
        }).then(() => {
            notif.success('Exercices assigné !')
        })
    };

    const updateTrainings = (exercise) => {
        // console.log("passedHere1", selectedExercises, exercise);
        if (selectedExercises.reduce((acc, item) => acc || item.content.id === exercise.content.id, false)) {
            // console.log("passedHere", selectedExercises);
            setSelectedExercises(selectedExercises.filter(item => item.content.id !== exercise.content.id));
        } else {
            // console.log("passedHere0", selectedExercises);
            setSelectedExercises([
                ...selectedExercises,
                exercise
            ]);
        }
    }

    const paginate = (event, value) => {
        setCurrentPage(value);

        window.scrollTo({top: 1800, behavior: 'smooth'});
    };

    useEffect(() => {
        const fetchExercisesData = async () => {
            let exercisesData = [];

            if (bodyPart === 'all') {
                const exercisesDataBefore = JSON.parse(localStorage.getItem('exercises'));
                if (exercisesDataBefore && exercisesDataBefore.length > 0) {
                    exercisesData = exercisesDataBefore;
                } else {
                    exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);
                    localStorage.setItem('exercises', JSON.stringify(exercisesData));
                }
            } else {
                const exercisesDataBefore = JSON.parse(localStorage.getItem('bodyPart'));
                if (exercisesDataBefore && exercisesDataBefore.length > 0) {
                    exercisesData = exercisesDataBefore;
                } else {
                    exercisesData = await fetchData(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, exerciseOptions);
                    localStorage.setItem('bodyPart', JSON.stringify(exercisesData));
                }
            }

            // console.log(exercisesData);
            setExercises(exercisesData);
        };

        fetchExercisesData();
    }, [bodyPart]);


    const handleSearch = async () => {
        if (search) {
            const exercisesData = await fetchData('https://exercisedb.p.rapidapi.com/exercises', exerciseOptions);

            const searchedExercises = exercisesData.filter((item) => item.name.toLowerCase().includes(search) || item.target.toLowerCase().includes(search) || item.equipment.toLowerCase().includes(search) || item.bodyPart.toLowerCase().includes(search),);

            window.scrollTo({top: 1800, left: 100, behavior: 'smooth'});

            setSearch('');
            setExercises(searchedExercises);
        }
    };

    const RenderExercises = () => {
        const indexOfLastExercise = currentPage * exercisesPerPage;
        const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
        const currentExercises = exercises?.slice(indexOfFirstExercise, indexOfLastExercise);

        return (
            <div className='flex flex-col flex-wrap'>
                <Box sx={
                    {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)'
                    }
                }>

                    {
                    currentExercises.map((exercise, idx) => {
                        return (
                            <Box sx={
                                {
                                    display: 'flex',
                                    m: '10px'
                                }
                            } key={idx} >
                                <ExerciseCard
                                    exercise={exercise}
                                    handleChange={updateTrainings}
                                    checked={
                                        selectedExercises.reduce((acc, item) => acc || item.content.id === exercise.id, false)
                                    }/>
                            </Box>
                        )
                    })
                } </Box>
            </div>
        )
    }

    return (
        <>
            <Helmet>
                <title>
                    Dashboard: Assign Exercises To User | Minimal UI
                </title>
            </Helmet>

            <Container>
                <div className='flex flex-row w-full justify-between'>
                    <div className="flex flex-row mb-2">
                        <ArrowBackIcon className="cursor-pointer"
                            onClick={
                                () => setOpenAssignExercises(false)
                            }/>
                        <img src={
                                getRandomeUserImage()
                            }
                            className='h-8 w-8 rounded-full ml-2'/>
                        <p className="text-xl font-bold ml-4">
                            {
                            appState.selectedUser
                            ?.userName[0]?.toUpperCase() + appState.selectedUser?.userName?.slice(1)
                        }</p>
                    </div>

                    <button disabled={
                            selectedExercises === 0
                        }
                        onClick={
                          () => assignTrainings()
                        }
                        className='px-5 py-2 flex flex-row items-center cursor-pointer primaryColorBackground'>
                        <p className="whiteColor14Medium mr-2">Assign Exercises</p>
                    </button>
                </div>

                <div className="w-full flex flex-row justify-between items-center shadow-md mt-12 mb-16">
                    <input type="text" placeholder="Search" className="px-2 py-2 w-full h-12"
                        value={search}
                        onChange={
                            (e) => setSearch(e.target.value.toLowerCase())
                        }/>
                    <button className="px-5 h-12 flex flex-row items-center cursor-pointer primaryColorBackground whiteColor12Medium"
                        onClick={handleSearch}
                        disabled={
                            !search
                    }>
                        Search
                    </button>
                </div>

                <div className="flex flex-row justify-end w-full mt-2 mb-4">
                    {
                    exercises ?. length > 0 && (
                        <Pagination color="standard" shape="rounded"
                            defaultPage={1}
                            count={
                                Math.ceil(exercises ?. length / exercisesPerPage)
                            }
                            page={currentPage}
                            onChange={paginate}
                            size="large"/>
                    )
                } </div>

                <div className="flex flex-col  overflow-y-scroll mt-2 items-center"
                    style={
                        {height: 'calc(100vh - 230px)'}
                }>

                    {
                    RenderExercises()
                } </div>
            </Container>
        </>
    );
}
