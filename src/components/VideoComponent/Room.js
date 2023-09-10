import React, { useEffect, useState } from "react";
import Participant from "./Participant";

const Room = ({ room, handleLogout }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };

    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="flex flex-row rounded-lg">

        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            handleLogout={handleLogout}
          />
        ) : (
          ""
        )}

   {/* <div className="flex flex-col mt-16  px-2" >
      <p className="text-lg">Remote participants</p>
      <div className="flex flex-1 remote-participants">{remoteParticipants}</div>
    </div>*/}
    </div>
  );
};

export default Room;
