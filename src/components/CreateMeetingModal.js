import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';



import { Container, Input } from '@mui/material';
import { getLoggedInUser } from '../utils/auth.utils';
import MeetingService from '../services/api/meeting.service';
import moment from 'moment';
import { set } from 'date-fns';


const meetingService = new MeetingService();

export default function CreationMeetingModal({ item , close}) {
    console.log("item", item);
    const user = getLoggedInUser();
    const [opponent, setOpponent] = React.useState(null);
    const [meeting, setMeeting] = React.useState({
        description: '',
        time: new Date(),
        date: new Date(),
    });

    React.useEffect(() => {
        const init = async () => {
            setOpponent(item);
        };
      init();
    }, []);



    const onChange= (e) => {
        setMeeting({
            ...meeting,
            description: e.target.value
        })
    };

    const onChangeTime= (time) => {
        setMeeting({
            ...meeting,
            time: time
        })
    };

    const onChangeDate= (date) => {
        setMeeting({
            ...meeting,
            date: date
        })
    };


    const  DatePicker = () => {
            return (
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                    <DateField name='date' label="Date" value={moment(meeting.date)} defaultValue={moment('2022-04-17')}  onChange={onChangeDate}/>
                </LocalizationProvider>
            )
    }

    const TimePicker = () => {
            return (
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
                    <TimeField name='time' label="Time"  value={moment(meeting.time)} defaultValue={moment('2022-04-17T18:30')} onChange={onChangeTime}/>
                </LocalizationProvider>
            )
    }


    const createMeeting = async () => {
        if (meeting.description && meeting.date && meeting.time && user && opponent) {
            const data = {
                date: meeting.date,
                time: meeting.time,
                sender_id: user.id,
                description: meeting.description,
                members: [opponent.id, user.id]
            }
            console.log("meeting-data", data);
            await meetingService.createMeeting(data);
            setMeeting({
                description: '',
                time: new Date(),
                date: new Date(),
            });
            close();
        }
    }


    return (
        <div className='flex flex-col bg-white shadow-lg rounded-2xl'>
         {/* Close icon */}
           <div className='flex justify-end m-1'>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 m-2 mb-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                onClick={() => close()}
            >
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
                />
            </svg>
        </div>



        <div className='flex flex-col  pb-12 px-16'>

            <div className='w-full'>
                <p  >Description</p>
                <Input
                    placeholder='Add Description'
                    multiline={true}
                    name='description'
                    onChange={onChange}
                    className='w-full mt-2'
                />


                <div className='pt-8'>
                        {TimePicker()}
                </div>


                <div className='pt-8'>
                    {DatePicker()}
                </div>

                <button className='mt-8 primaryColorBackground rounded-lg px-4 py-2 w-full' onClick={createMeeting}>
                    <p className='whiteColor12Medium' >Create Meeting</p>
                </button>
            </div >
            </div>
        </div>

    );
}
