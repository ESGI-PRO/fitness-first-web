
import React, {useState, useEffect} from 'react';
import { getLoggedInUser } from '../../utils/auth.utils';
import MeetingService from '../../services/api/meeting.service';
import { useModal } from '../../context/modal-context';
import { getRandomeUserImage } from '../../constants/globals';
import CreationMeetingModal from '../../components/CreateMeetingModal';



const meetinService = new MeetingService();

export default function NewMeetingPage(){
    const user = getLoggedInUser();
    const modal = useModal();
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);

   useEffect(() => {
        const fetchUsers = async () => {
            try {
                if(user.traineeIds && user.traineeIds.length > 0) {
                    const users = await meetinService.getUsersByIds(user.traineeIds) || [];
                    setUsers(users);
                }
                if (user.trainerId){
                    const trainer = await meetinService.getUserById(user.trainerId);
                    trainer && setUsers([trainer]);
                }
            } catch (error) {
                setError(error);
            }
        };
      fetchUsers();
    }, []);

    const createMeeting = (item) => {
        // console.log("item", item);
        modal.showModal(<CreationMeetingModal item={item}  close={() => modal.hideModal()} />, true);
    }

    const RenderItem = ({ item }) => {
        // console.log("item", item);
        return item && <div className='mx-4 w-full' style={{
            minWidth: 400
        }}>
            <div
                onClick={() => createMeeting(item)}
                className='cursor-pointer flex flex-row items-center justify-between w-full'
            >
                <div>
                    <img
                        src={getRandomeUserImage()}
                        className='h-16 w-16 rounded-full'
                    />
                </div>

                <div className='flex flex-1 flex-col  ml-4'>
                    <p  className='blackColor18Medium'>
                        {item?.userName[0].toUpperCase() + item?.userName.slice(1)}
                    </p>
                    {item?.trainerSpeciality && <p className='grayColor14Medium'>
                        {item?.trainerSpeciality}
                    </p>}
                </div>
            </div>
            <div
            className='bg-gray-400 w-full my-4'
                style={{ height: 0.5}}
            />
        </div>;
    }

    return (
        <div className='flex flex-col items-center'>

            <div className='flex flex-col  box-screen-height mt-12 min-w-3/4'>

            <div className='flex flex-row w-full mb-8 '>
                <p className='my-8 w-full text-center blackColor16SemiBold' >
                    {user?.isTrainer ? "Retrouvez l'ensemble de vos mettings avec vos eleves ! " : "CHOOSE A TRAINER"}
                </p>
            </div>

     
      <div className='flex flex-col w-full items-center'>
      {
            users?.length > 0 ? users?.map((item, index) => {
                    return <RenderItem key={index} item={item} />
                }) : <p>{user?.isTrainer ? "NO TRAINEE YET" : "NO TRAINER YET"}</p>
            }
            </div>
       

        </div>
    </div>
    )
};
