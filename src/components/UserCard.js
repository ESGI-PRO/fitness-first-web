import React from 'react';
import {getRandomeUserImage} from '../constants/globals';

function UserCard(props) {
    const {user} = props;
    return user ?  (<div className='flex   w-full flex-row items-center'>
            <img src={
                    getRandomeUserImage()
                }
                className='h-8 w-8 rounded-full'/>
            <div className='flex flex-row justify-between items-end w-full ml-4'>
                <div>
                    <p className='blackColor18Medium'>
                        {
                        user?.userName[0].toUpperCase() + user?.userName.slice(1)
                    } </p>
                    {
                    user?.trainerSpeciality && <p className='grayColor14Regular'>
                        {
                        user?.trainerSpeciality
                    } </p>
                } </div>
            </div>
        </div>) : null
}

export default UserCard;
