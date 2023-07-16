import React, {useCallback, useEffect} from "react";
import * as Video from "twilio-video";
import Room from "./Room";

const VideoChat = ({roomName, accessToken, opponent, close}) => {
    const [room, setRoom] = React.useState(null);
    const [connecting, setConnecting] = React.useState(false);

    useEffect(() => {
        if (accessToken) {
            setConnecting(true);
            Video.connect(accessToken, {name: roomName}).then((room) => {
                setConnecting(false);
                setRoom(room);
            }).catch((err) => {
                console.error(err);
                setConnecting(false);
            });
        }
    }, [roomName, accessToken, opponent]);


    const handleLogout = useCallback(() => {
        setRoom((prevRoom) => {
            if (prevRoom) {
                prevRoom.localParticipant.tracks.forEach((trackPub) => {
                    trackPub.track.stop();
                });
                prevRoom.disconnect();
            }
            return null;
        });
        close();
    }, []);

    useEffect(() => {
        if (room) {
            const tidyUp = (event) => {
                if (event.persisted) {
                    return;
                }
                if (room) {
                    handleLogout();
                }
            };
            window.addEventListener("pagehide", tidyUp);
            window.addEventListener("beforeunload", tidyUp);
            return() => {
                window.removeEventListener("pagehide", tidyUp);
                window.removeEventListener("beforeunload", tidyUp);
            };
        }
    }, [room, handleLogout]);

    let render;
    if (room && !connecting) {
        render = (
            <Room room={room}
                handleLogout={handleLogout}/>
        );
    } else {
        render = (
            <div className="flex flex-col flex-1 h-screen items-center justify-center">
                <div class="loader">
                    <div class="inner one"></div>
                    <div class="inner two"></div>
                    <div class="inner three"></div>
                </div>
            </div>
        );
    }

    return <div> {render} </div>;
};

export default VideoChat;
