import React from 'react';
import VideoChat from './VideoChat';

const  VideoModal = ({roomName, accessToken, opponent, close}) => {

    return (
      <div className='flex flex-col flex-1 items-center justify-center '>
        <div className='flex flex-col bg-white shadow-lg rounded-2xl w-full'>
            <VideoChat close={close}  roomName={roomName} accessToken={accessToken} opponent={opponent} />
        </div>
      </div>

    )

}

export default VideoModal;