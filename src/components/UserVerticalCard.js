import React from 'react';
import {getRandomeUserImage} from '../constants/globals';
import {sub} from 'date-fns';
import { fDateTime, fAddMonths, fAddYears } from '../utils/formatTime';

function UserVerticalCard(props) {
    const {user, subscription} = props;

    const getEndDate = (name) => {
        const date = new Date(subscription.currentPeriodStart);
        if (name === '' || name === null || name === undefined) {
            name = 'Monthly'
        }
        
        switch (name) {
            case 'Monthly':
                return fDateTime(fAddMonths(date, 1));
            case 'SixMonths':
                return fDateTime(fAddMonths(date, 6));
            case 'Yearly':
                return fDateTime(fAddYears(date, 1));
            default:
                return fDateTime(fAddMonths(date, 1));
        }
    }

    if (user && subscription) {
        return (
            <div className='flex flex-row mt-4 mb-8'>
                <div className='flex my-4  flex-col items-center mr-6'>
                    <img src={
                            getRandomeUserImage()
                        }
                        className='h-32 w-32 rounded-full'/>
                </div>
                <div className='flex flex-1 flex-col'>

                <div className='flex flex-col w-full my-4'>
                        <p className='blackColor20Medium mb-2'>
                            {
                            user ?. userName[0].toUpperCase() + user ?. userName.slice(1)
                        } </p>
                        <p className='blackColor14Medium'>
                            {
                            user.email
                        }</p>
                        {
                        user ?. trainerSpeciality && <p className='primaryColor14SemiBold'>
                            {
                            user ?. trainerSpeciality
                        }
                            <span className='ml-2'>TRAINER</span></p>
                    } </div>

                    <p className='mb-4 mt-2 primaryColor14SemiBold'>Subscription</p>

                    <p className='blackColor14Medium'>
                        <span  className='mr-4 blackColor14SemiBold'>Plan:
                        </span>
                        {
                        subscription.plan ?. slug
                    } </p>
                    <p className='blackColor14Medium  mt-2'>
                        <span className='mr-4 blackColor14SemiBold' >Period Start:
                        </span>
                        {
                       fDateTime(subscription.currentPeriodStart)
                    } </p>
                    <p className='blackColor14Medium  mt-2'>
                        <span  className='mr-4 blackColor14SemiBold' >Period End:
                        </span>
                        {
                        getEndDate(subscription.plan?.name)
                    } </p>

                    <p className='blackColor14Medium mt-2'>
                        <span className='mr-4 blackColor14SemiBold' >Price:
                        </span>
                        {
                        subscription.plan ?. price/ 100
                    } €  </p>


                </div>
            </div>
        )
    }

    return user ? (
        <div className='flex my-4  w-full flex-col items-center'>
            <img src={
                    getRandomeUserImage()
                }
                className='h-32 w-32 rounded-full'/>
            <div className='flex flex-col justify-center items-center w-full ml-4 my-4'>
                <p className='blackColor20Medium mb-2'>
                    {
                    user ?. userName[0].toUpperCase() + user ?. userName.slice(1)
                } </p>
                <p className='blackColor14Medium'>
                    {
                    user ?. email
                }</p>
                {
                user ?. trainerSpeciality && <p className='primaryColor14SemiBold'>
                    {
                    user ?. trainerSpeciality
                }
                    TRAINER</p>
            } </div>

        </div>
    ) : null
}

export default UserVerticalCard;
