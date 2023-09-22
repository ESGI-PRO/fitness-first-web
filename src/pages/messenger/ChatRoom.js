import React, {useEffect, useState} from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import MessengerService from '../../services/api/messenger.service';
import SendIcon from '@mui/icons-material/Send';
import {getLoggedInUser} from '../../utils/auth.utils';
import {getRandomeUserImage} from '../../constants/globals';


const messengerService = new MessengerService();

function ChatRoom({setOpenRoom, opponent, room}) {
    const user = getLoggedInUser();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(() => {
        messengerService.getAllUserMessages(room._id).then((res) => {
            // console.log(res);
            setMessages(res ?. messages || []);
        });
    }, []);

    const onChange = (e) => {
        setMessage(e.target.value);
    };

    const sendMessage = () => {
        messengerService.createMessage({room_id: room._id, sender_id: user.id, message: message}).then((res) => {
            if(res.message){
                setMessages([
                    ...messages,
                    res.message
                ]);
                setMessage('');
            }
        })
    }


    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-row mb-2">
                <ArrowBackIcon className="cursor-pointer"
                    onClick={
                        () => setOpenRoom()
                    }/>
                <img src={
                        getRandomeUserImage()
                    }
                    className='h-8 w-8 rounded-full ml-2'/>
                <p className="text-xl font-bold ml-4">
                    {
                    opponent ?. userName[0] ?. toUpperCase() + opponent ?. userName ?. slice(1)
                }</p>
            </div>



                <div className="flex flex-col px-2  overflow-y-scroll shadow " style={{
                    height: 'calc(100vh - 230px)'
                }} >
                    {
                    messages.map((item, index) => {
                        return(item.sender_id.id === user.id ? (
                            <div key={index} className="flex flex-row justify-end pt-2 w-full">
                                <p className="primaryColorBackground text-white py-2 px-4 rounded-xl  mr-2 max-w-2/3">
                                    {
                                    item.message
                                }</p>
                            </div>
                        ) : (
                            <div key={index} className="flex flex-row justify-start pt-2 w-full">
                                <p className="bg-gray-200 py-2 px-4  rounded-xl  ml-2 max-w-2/3">
                                    {
                                    item.message
                                }</p>
                            </div>
                        ));
                    })
                } </div>

                <div className="flex flex-row w-full shadow-lg">
                    <input type="text" placeholder='Type your message here' className='flex flex-1  bg-white text-sm px-1'
                        style={{height: '40px'}}
                        value={message}
                        onChange={onChange}/>
                    <button className="primaryColor p-2 bg-white" onClick={sendMessage} >
                        <SendIcon/>
                    </button>
                </div>

        </div>
    )
}

export default ChatRoom;
