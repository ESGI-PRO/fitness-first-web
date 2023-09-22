import React, {useEffect} from 'react';

// @mui
import {useAppState} from '../../context/app-state-context';
import MeetingService from '../../services/api/meeting.service';
import {getRandomeUserImage, launchVideo} from '../../constants/globals';
import {getLoggedInUser} from '../../utils/auth.utils';
import {fDate, fTimestamp} from '../../utils/formatTime';
import { useModal } from '../../context/modal-context';
import VideoModal from '../../components/VideoComponent/VideoModal';


const meetingService = new MeetingService();

export default function MeetingPage() {
    const user = getLoggedInUser();
    const modal = useModal();
    const {appState, setAppState} = useAppState();

    useEffect(() => {
        const init = async () => {
         try{
            const meetings = await meetingService.getAllUserMeetings(user?.id) || [];
            // console.log("meetings", user, meetings);
            setAppState({meetings: meetings})
         }catch(error){
             // console.log("error", error);
         }
        };
        init();
    }, []);

    const joinMeeting = async (item) => {
        // console.log("item", item);
        const opponent = item.members.find((member) => member.id !== user.id);
        const {token} = await meetingService.getTwilioToken(user.id);
        const room = await meetingService.getRoomByIds([user.id, opponent.id]);
        // console.log("MeetingVideo", {
        //     opponent: opponent,
        //     token: token,
        //     roomName: room._id
        // });
        modal.showModal(<VideoModal opponent={opponent} accessToken={token} roomName={room._id} close={() => modal.hideModal()}/>)
    }



    const RenderItem = ({item}) => {
        const opponent = item.members.find((member) => member.id !== user.id);

        return (
            <div className='mx-4' style={{ width: 400 }}>
                <div className='flex flex-row items-center' >
                    <div>
                        <img src={getRandomeUserImage()}
                            className='h-8 w-8 rounded-full'/>
                    </div>
                    <div className='flex flex-row justify-between items-end w-full ml-4'>
                        <div>
                            <p className='blackColor18Medium'>
                                {
                                opponent.userName[0].toUpperCase() + opponent.userName.slice(1)
                            } </p>
                            {
                            opponent ?. trainerSpeciality && <p className='grayColor14Regular'>
                                {
                                opponent ?. trainerSpeciality
                            } </p>
                        } </div>

                        <div className='flex flex-col items-end mt-2 blackColor14SemiBold'>

                            {
                            item.date && <p> {
                                fDate(item.date)
                            } </p>
                        }
                            {
                            item.time && <p> {
                                fTimestamp(item.time)
                            } </p>
                        } </div>
                    </div>
                </div>
                <div>
                    <p className='mx-4 grayColor12Regular'>
                        {
                        item.description
                    } </p>
                </div>
              <div className='flex flex-row w-full justify-end'>
              <button className='mt-4 primaryColorBackground text-center py-2 px-4 rounded-lg self-end'
                    onClick={
                        () => joinMeeting(item)
                }>
                    <p className='whiteColor14SemiBold text-center text-white'>JOIN</p>
                </button>
              </div>
                <div className='my-4 grayColorBackground' style={{height: 0.5}}/>
            </div>
        )
    }

    return (
        <div className='flex flex-col items-center  w-full '>

            <div className='flex flex-col  box-screen-height mt-24 w-3/4'>

                {
                appState?.meetings && appState?.meetings.length > 0 ? appState.meetings.map((item, index) => <RenderItem item={item} key={index}/>) : 
                <div className='flex items-center justify-center'>
                    <p className='text-center text-5xl'>
                    You currently have no meetings
                </p>
                </div>
            } </div>
        </div>
    );
}
