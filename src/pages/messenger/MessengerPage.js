import React from 'react';
import Chat from '../../assets/images/Chat.png';
import {Stack} from '@mui/material';
import OpponentList from './OpponentList';
import ChatRoom from './ChatRoom';

export default function MessengerPage() {
    const [openRoom, setOpenRoom] = React.useState(false);
    const [opponent, setOpponent] = React.useState({});
    const [room, setRoom] = React.useState({});

    const openChat = (opponent, room) => {
        setOpponent(opponent);
        setRoom(room);
        setOpenRoom(true);
    }

    return (
        <div className='flex flex-col items-center  box-screen-height'>
            {
            !openRoom && <Stack sx={
                    {alignItems: 'center'}
                }
                flexWrap="wrap"
                px="40px"
                pt="8px">
                <img src={Chat}
                    alt="logo"
                    style={
                        {
                            width: '150px',
                            height: '80px'
                        }
                    }/>
            </Stack>
        }

            <div className='flex flex-1'
                style={
                    {
                        width: window.innerWidth > 600 ? '600px' : '100%'
                    }
            }>
                {
                openRoom ? <ChatRoom setOpenRoom={setOpenRoom}
                    opponent={opponent}
                    room={room}/> : <OpponentList openChat={openChat}
                    opponent={opponent}/>
            } </div>

        </div>
    );
}
