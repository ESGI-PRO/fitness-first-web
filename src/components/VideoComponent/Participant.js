import React, {useState, useEffect, useRef} from "react";

const Participant = ({participant, handleLogout}) => {
    const [videoTracks, setVideoTracks] = useState([]);
    const [audioTracks, setAudioTracks] = useState([]);

    const videoRef = useRef();
    const audioRef = useRef();

    const trackpubsToTracks = (trackMap) => Array.from(trackMap.values()).map((publication) => publication.track).filter((track) => track !== null);

    useEffect(() => {
        setVideoTracks(trackpubsToTracks(participant.videoTracks));
        setAudioTracks(trackpubsToTracks(participant.audioTracks));

        const trackSubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => [
                    ...videoTracks,
                    track
                ]);
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => [
                    ...audioTracks,
                    track
                ]);
            }
        };

        const trackUnsubscribed = (track) => {
            if (track.kind === "video") {
                setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
            } else if (track.kind === "audio") {
                setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
            }
        };

        participant.on("trackSubscribed", trackSubscribed);
        participant.on("trackUnsubscribed", trackUnsubscribed);

        return() => {
            setVideoTracks([]);
            setAudioTracks([]);
            participant.removeAllListeners();
        };
    }, [participant]);

    useEffect(() => {
        const videoTrack = videoTracks[0];
        if (videoTrack) {
            videoTrack.attach(videoRef.current);
            return() => {
                videoTrack.detach();
            };
        }
    }, [videoTracks]);

    useEffect(() => {
        const audioTrack = audioTracks[0];
        if (audioTrack) {
            audioTrack.attach(audioRef.current);
            return() => {
                audioTrack.detach();
            };
        }
    }, [audioTracks]);

    return (
        <div className="video-comp">
            <video ref={videoRef}
                autoPlay={true}/>
            <audio ref={audioRef}
                autoPlay={true}
                muted={true}/> {/* Close icon */}
            <div onClick={
                    () => handleLogout()
                }
                className='flex justify-end m-1 absolute w-full pr-4'>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 cursor-pointer hover:bg-gray-200 rounded-full p-1 m-2 mb-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    onClick={
                        () => handleLogout()
                }>
                    <path strokeLinecap="round" strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"/>
                </svg>
            </div>
        </div>
    );
};

export default Participant;
