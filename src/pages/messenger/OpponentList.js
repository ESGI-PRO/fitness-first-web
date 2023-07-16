import React, {useEffect} from 'react';
import MessengerService  from '../../services/api/messenger.service';
import { getRandomeUserImage } from '../../constants/globals';
import { getLoggedInUser } from '../../utils/auth.utils';
import { icon } from '../../layouts/dashboard/nav/config';
import { StyledNavItemIcon } from '../../components/nav-section/styles';


const messengerService = new MessengerService();

function OpponentList({openChat}) {
    const user = getLoggedInUser();
    const [rooms, setRooms] = React.useState([]);

    useEffect(() => {
        messengerService.getAllUserRooms(user.id).then((res) => {
            console.log(res);
            setRooms(res?.rooms || []);
        });
    }, []);

    const RenderItem = ({item, index}) => {
        const opponent = item.members.find((member) => member.id !== user.id);

        return (
            <div className='mx-4 flex-col flex w-full'>
                <div className='flex   w-full flex-row items-center'>
               
                        <img src={
                                getRandomeUserImage()
                            }
                            className='h-8 w-8 rounded-full'/>
               
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

                        <div onClick={() => openChat(opponent, item)} className='cursor-pointer'>
                            <StyledNavItemIcon>{icon('ic_messenger')}</StyledNavItemIcon>
                        </div>
                    </div>
                </div>
                {
                index !== rooms.length - 1 && <div className='my-4 w-full grayColorBackground' style={{height: 0.5}}/>
                }
            </div>
        )
    }
    return (
        <div className="flex flex-1 mt-8" >
           {
                rooms.map((item, index) => {
                    return (
                        <RenderItem item={item} key={index} index={index} />
                    );
                }
                )
           }
        </div>
    );
}

export default OpponentList;