import React, { useEffect, useState } from "react";
// @mui
import { Container } from "@mui/material";
import AuthService from "../../services/api/auth.service";
import { getLoggedInUser, setLoggedInUser } from "../../utils/auth.utils";
import UserTrainingList from "./UserExercises";
import UserVerticalCard from "../../components/UserVerticalCard";
import { getRandomeUserImage } from "../../constants/globals";
import MessengerService from "../../services/api/messenger.service";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";

const authService = new AuthService();
const messengerService = new MessengerService();

const AssignTrainerPage = ({ user, updateUser }) => {
  const [trainers, setTrainers] = useState(null);

  useEffect(() => {
    const init = async () => {
      const response = await authService.getAllTrainers();
      // console.log("response", response);
      setTrainers(response);
    };
    init();
  }, []);

  const connectToTrainer = async (item) => {
    const data = {
      sender_id: user.id,
      members: [item.id, user.id],
    };
    await messengerService.createRoom(data);
    await updateUser();
  };

  const RenderItem = ({ item, index }) => {
    return (
      <div className="mx-4 flex-col flex w-full">
        <div className="flex   w-full flex-row items-center">
          <img src={getRandomeUserImage()} className="h-8 w-8 rounded-full" />
          <div className="flex flex-row justify-between items-end w-full ml-4">
            <div>
              <p className="blackColor18Medium">
                {item.userName[0].toUpperCase() + item.userName.slice(1)}{" "}
              </p>
              {item?.trainerSpeciality && (
                <p className="grayColor14Regular">{item?.trainerSpeciality} </p>
              )}{" "}
            </div>

            <div
              onClick={() => connectToTrainer(item)}
              className="px-5 py-2 flex flex-row items-center cursor-pointer primaryColorBackground"
            >
              <p className="whiteColor14Medium mr-2">Connect</p>
              <KeyboardDoubleArrowRightIcon className="whiteColor14Medium" />
            </div>
          </div>
        </div>
        {index !== trainers.length - 1 && (
          <div
            className="my-8 w-full grayColorBackground"
            style={{ height: 0.5 }}
          />
        )}{" "}
      </div>
    );
  };

  const RenderTraineeList = () => {
    return (
      <div className="flex flex-col">
        <div className="flex flex-row w-full mb-8 ">
          <p className="my-8 w-full text-center blackColor16SemiBold">
            CONNECT TO TRAINER
          </p>
        </div>
        {trainers?.map((item, index) => {
          return <RenderItem item={item} key={index} index={index} />;
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col mt-8">
      <RenderTraineeList />
    </div>
  );
};

const TrainneeTrainingPage = ({ user }) => {
  const [trainer, setTrainer] = useState(null);

  useEffect(() => {
    const init = async () => {
      if (user) {
        const response = await authService.getUserById(user?.trainerId);
        // console.log("response", response);
        setTrainer(response);
      }
    };
    init();
  }, []);
  return (
    <div className="flex flex-col mt-8">
      <div className="flex flex-row w-full">
        <p className="blackColor20Medium">My Trainer</p>
      </div>
      <UserVerticalCard user={trainer} />
      <div className="flex flex-row w-full">
        <p className="blackColor20Medium">My Trainings</p>
      </div>
      <div>
        <UserTrainingList />
      </div>
    </div>
  );
};

export default function TraineePage() {
  const [user, setUser] = useState(getLoggedInUser());

  const updateUser = async () => {
    if (user) {
      const response = await authService.getUserById(user?.id);
      // console.log("response", response);
      setLoggedInUser(response);
      setUser(response);
    }
  };

  return (
    <Container>
      {" "}
      {user?.trainerId ? (
        <TrainneeTrainingPage user={user} />
      ) : (
        <AssignTrainerPage updateUser={updateUser} user={user} />
      )}{" "}
    </Container>
  );
}
