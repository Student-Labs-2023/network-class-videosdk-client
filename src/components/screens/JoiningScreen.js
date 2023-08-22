import React, { useEffect, useMemo, useRef, useState } from "react";
import { MeetingDetailsScreen } from "../MeetingDetailsScreen";
import { createMeeting, getToken, validateMeeting } from "../../api";
import ConfirmBox from "../ConfirmBox";
import { Constants } from "@videosdk.live/react-sdk";
import useIsMobile from "../../hooks/useIsMobile";
import WebcamOffIcon from "../../icons/WebcamOffIcon";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import MicOffIcon from "../../icons/MicOffIcon";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import micro from "../../icons/micro.svg";
import Header from "../Header";
import avatar from "../../icons/camera.svg";
import { SelectDevice } from "../buttons/SelectDevice";
import { ButtonWithTooltip } from "../buttons/ButtonWithTooltip";
import styles from "./styles.module.css";
import { BackButton } from "../buttons/BackButton";
import { CopyLink } from "../buttons/CopyLink";

let volumeInterval;
let analyser;
let audiostream;

export function JoiningScreen({
  participantName,
  setParticipantName,
  setMeetingId,
  setToken,
  setSelectedMic,
  setSelectedWebcam,
  setSelectedAudio,
  onClickStartMeeting,
  micEnabled,
  webcamEnabled,
  setWebcamOn,
  setMicOn,
  setMeetingMode,
  meetingMode,
}) {
  const [{ webcams, mics, audio }, setDevices] = useState({
    devices: [],
    webcams: [],
    audio: [],
    mics: [],
  });

  const [videoTrack, setVideoTrack] = useState(null);

  const [dlgMuted, setDlgMuted] = useState(false);
  const [dlgDevices, setDlgDevices] = useState(false);

  const videoPlayerRef = useRef();
  const popupVideoPlayerRef = useRef();

  const videoTrackRef = useRef();
  const audioTrackRef = useRef();
  const audioAnalyserIntervalRef = useRef();

  const [audioTrack, setAudioTrack] = useState(null);

  const isMobile = useIsMobile();

  const [speak, setSpeak] = useState(false);

  const webcamOn = useMemo(() => !!videoTrack, [videoTrack]);
  const micOn = useMemo(() => !!audioTrack, [audioTrack]);

  const [stateEnter, setStateEnter] = useState("Занятие началось");

  console.log(setStateEnter);

  useEffect(() => {
    getDevices({ micEnabled, webcamEnabled });
    volumeInterval = setInterval(handleAudioData, 10);
    return () => {
      clearInterval(volumeInterval);
      volumeInterval = undefined;
    };
  }, []);

  useEffect(() => {
    if (!volumeInterval && micOn)
      volumeInterval = setInterval(handleAudioData, 10);
    if (volumeInterval && !micOn) {
      handleAudioData();
      clearInterval(volumeInterval);
      volumeInterval = undefined;
    }
  }, [micOn]);

  useEffect(() => {
    audioTrackRef.current = audioTrack;

    startMuteListener();

    return () => {
      const currentAudioTrack = audioTrackRef.current;
      currentAudioTrack && currentAudioTrack.stop();
      audioTrackRef.current = null;
    };
  }, [audioTrack]);

  useEffect(() => {
    if (meetingMode === Constants.modes.VIEWER) {
      _handleTurnOffMic();
      _handleTurnOffWebcam();
    }
  }, [meetingMode]);

  useEffect(() => {
    videoTrackRef.current = videoTrack;

    if (videoTrack) {
      const videoSrcObject = new MediaStream([videoTrack]);

      if (videoPlayerRef.current) {
        videoPlayerRef.current.srcObject = videoSrcObject;
        videoPlayerRef.current.play();
      }

      setTimeout(() => {
        if (popupVideoPlayerRef.current) {
          popupVideoPlayerRef.current.srcObject = videoSrcObject;
          popupVideoPlayerRef.current.play();
        }
      }, 1000);
    } else {
      if (videoPlayerRef.current) {
        videoPlayerRef.current.srcObject = null;
      }
      if (popupVideoPlayerRef.current) {
        popupVideoPlayerRef.current.srcObject = null;
      }
    }
  }, [videoTrack]);

  const _handleTurnOffWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (videoTrack) {
      videoTrack.stop();
      setVideoTrack(null);
      setWebcamOn(false);
    }
  };
  const _handleTurnOnWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (!videoTrack) {
      getDefaultMediaTracks({ mic: false, webcam: true });
      setWebcamOn(true);
    }
  };

  const _toggleWebcam = () => {
    const videoTrack = videoTrackRef.current;

    if (videoTrack) {
      _handleTurnOffWebcam();
    } else {
      _handleTurnOnWebcam();
    }
  };
  const _handleTurnOffMic = () => {
    const audioTrack = audioTrackRef.current;

    if (audioTrack) {
      audioTrack.stop();

      setAudioTrack(null);
      setMicOn(false);
    }
  };
  const _handleTurnOnMic = () => {
    const audioTrack = audioTrackRef.current;

    if (!audioTrack) {
      getDefaultMediaTracks({ mic: true, webcam: false });
      setMicOn(true);
    }
  };
  const _handleToggleMic = () => {
    const audioTrack = audioTrackRef.current;

    if (audioTrack) {
      _handleTurnOffMic();
    } else {
      _handleTurnOnMic();
    }
  };

  const changeWebcam = async (deviceId) => {
    const currentvideoTrack = videoTrackRef.current;

    if (currentvideoTrack) {
      currentvideoTrack.stop();
    }

    const stream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId },
    });
    const videoTracks = stream.getVideoTracks();

    const videoTrack = videoTracks.length ? videoTracks[0] : null;

    setVideoTrack(videoTrack);
  };

  // const changeAudio = async (deviceId) => {};

  const changeMic = async (deviceId) => {
    const currentAudioTrack = audioTrackRef.current;
    currentAudioTrack && currentAudioTrack.stop();
    audiostream = await navigator.mediaDevices.getUserMedia({
      audio: { deviceId },
    });
    const audioTracks = audiostream.getAudioTracks();

    const audioTrack = audioTracks.length ? audioTracks[0] : null;
    clearInterval(audioAnalyserIntervalRef.current);

    setAudioTrack(audioTrack);

    const audioContext = new AudioContext();
    const audioSource = audioContext.createMediaStreamSource(audiostream);
    analyser = audioContext.createAnalyser();

    analyser.fftSize = 512;
    analyser.minDecibels = -127;
    analyser.maxDecibels = 0;
    analyser.smoothingTimeConstant = 0.4;

    audioSource.connect(analyser);
  };

  const getDefaultMediaTracks = async ({ mic, webcam, firstTime }) => {
    if (mic) {
      try {
        const audioConstraints = {
          audio: true,
        };

        audiostream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        );

        if (audiostream) {
          const audioTracks = audiostream.getAudioTracks();

          const audioTrack = audioTracks.length ? audioTracks[0] : null;

          setAudioTrack(audioTrack);

          const audioContext = new AudioContext();
          const audioSource = audioContext.createMediaStreamSource(audiostream);
          analyser = audioContext.createAnalyser();

          analyser.fftSize = 512;
          analyser.minDecibels = -127;
          analyser.maxDecibels = 0;
          analyser.smoothingTimeConstant = 0.4;

          audioSource.connect(analyser);

          if (firstTime) {
            setSelectedMic({
              id: audioTrack?.getSettings()?.deviceId,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }

    if (webcam) {
      const videoConstraints = {
        video: {
          width: 1280,
          height: 720,
        },
      };

      const stream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      const videoTracks = stream.getVideoTracks();

      const videoTrack = videoTracks.length ? videoTracks[0] : null;
      setVideoTrack(videoTrack);
      if (firstTime) {
        setSelectedWebcam({
          id: videoTrack?.getSettings()?.deviceId,
        });
      }
    }
  };

  async function startMuteListener() {
    const currentAudioTrack = audioTrackRef.current;

    if (currentAudioTrack) {
      if (currentAudioTrack.muted) {
        setDlgMuted(true);
      }

      currentAudioTrack.addEventListener("mute", (ev) => {
        setDlgMuted(true);
      });
    }
  }

  const getDevices = async ({ micEnabled, webcamEnabled }) => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();

      const webcams = devices.filter((d) => d.kind === "videoinput");
      const mics = devices.filter((d) => d.kind === "audioinput");
      const audio = devices.filter((d) => d.kind === "audiooutput");

      const hasMic = mics.length > 0;
      const hasWebcam = webcams.length > 0;

      setDevices({ webcams, mics, audio, devices });

      if (hasMic) {
        startMuteListener();
      }

      getDefaultMediaTracks({
        mic: hasMic && micEnabled,
        webcam: hasWebcam && webcamEnabled,
        firstTime: true,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handleAudioData = () => {
    if (audioTrack && micOn) {
      const threshold = 0.4;
      const audioLevel = getAudioLevel();

      if (audioLevel <= threshold) {
        setSpeak(true);
      } else {
        setSpeak(false);
      }
    } else setSpeak(false);
  };

  const getAudioLevel = () => {
    const bufferLength = analyser.frequencyBinCount;
    const volumes = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(volumes);
    let volumeSum = 0;
    for (let i = 0; i < bufferLength; i++) {
      const value = (volumes[i] - 128) / 128;
      volumeSum += Math.abs(value);
    }
    const averageVolume = volumeSum / volumes.length;
    const audioLevel = (averageVolume * 100) / 127;

    return audioLevel;
  };

  return (
    <div className="fixed inset-0">
      <Header />
      <div className="overflow-y-auto flex flex-col flex-1 h-screen bg-gray-0">
        <div
          className="flex flex-1 flex-col md:flex-row items-center justify-center"
          style={{ margin: "12px 42px 0 72px" }}
        >
          <div className="container grid  md:grid-flow-col grid-flow-row ">
            <div className="grid grid-cols-12">
              <div className="md:col-span-7 2xl:col-span-6 col-span-12">
                <div className="flex items-center justify-center p-1.5 sm:p-4 lg:p-6">
                  <div className="relative w-full md:pl-4 sm:pl-10 pl-5  md:pr-4 sm:pr-10 pr-5">
                    <BackButton />
                    <div
                      className="w-full relative"
                      style={{
                        height: "45vh",
                        minHeight: "300px",
                        minWidth: "500px",
                      }}
                    >
                      <video
                        autoPlay
                        playsInline
                        muted
                        ref={videoPlayerRef}
                        controls={false}
                        style={{
                          backgroundColor: "#D5DEE8",
                          transform: "scaleX(-1)",
                          outline: `${
                            speak ? "4px solid var(--blue, #175EF1)" : "none"
                          }`,
                        }}
                        className={
                          "rounded-[10px] h-full w-full object-cover flex items-center justify-center flip"
                        }
                      />
                      <img
                        src={micro}
                        alt=""
                        style={
                          speak
                            ? {
                                position: "absolute",
                                top: "11px",
                                left: "12px",
                              }
                            : { display: "none" }
                        }
                      ></img>

                      {!isMobile ? (
                        <>
                          <div className="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center">
                            {!webcamOn ? (
                              <p className="text-xl xl:text-lg 2xl:text-xl">
                                {meetingMode === Constants.modes.VIEWER ? (
                                  "You are not permitted to use your microphone and camera."
                                ) : (
                                  <div className={styles.camOff}>
                                    Камера выключена
                                  </div>
                                )}
                              </p>
                            ) : null}
                          </div>
                        </>
                      ) : null}
                      <div className="absolute xl:bottom-6 bottom-4 left-0 right-0">
                        <div className="container grid grid-flow-col space-x-4 items-center justify-center md:-m-2">
                          <ButtonWithTooltip
                            onClick={_handleToggleMic}
                            onState={micOn}
                            mic={true}
                            OnIcon={MicOnIcon}
                            OffIcon={MicOffIcon}
                            meetingMode={meetingMode}
                          />
                          <ButtonWithTooltip
                            onClick={_toggleWebcam}
                            onState={webcamOn}
                            mic={false}
                            OnIcon={WebcamOnIcon}
                            OffIcon={WebcamOffIcon}
                            meetingMode={meetingMode}
                          />
                        </div>
                      </div>
                    </div>

                    {!isMobile &&
                      meetingMode === Constants.modes.CONFERENCE && (
                        <div className={styles.settingsVideo}>
                          <SelectDevice
                            title="МИКРОФОН"
                            list={mics}
                            setSelected={setSelectedMic}
                            changeDevice={changeMic}
                          />
                          <SelectDevice
                            title="КАМЕРА"
                            list={webcams}
                            setSelected={setSelectedWebcam}
                            changeDevice={changeWebcam}
                          />
                          {/* <SelectDevice
                            title="ЗВУК"
                            list={audio}
                            setSelected={setSelectedAudio}
                            changeDevice={changeAudio}
                          /> */}
                        </div>
                      )}
                  </div>
                </div>
              </div>
              <div className="md:col-span-5 2xl:col-span-6 col-span-12 md:relative" style={{paddingTop: "100px"}}>
                <div className={styles.info}>
                  <img src={avatar} alt="" style={{ height: "86px", borderRadius: "10px" }} />
                  <div>
                    <div className={styles.title}>Математика 7 класс</div>
                    <CopyLink />
                  </div>
                  <div className={styles.owner}>Морозов Антон Дмитриевич</div>
                  <div className={styles.count}>0 участников</div>
                  <div style={{ textAlign: "center" }}>
                    <MeetingDetailsScreen
                      participantName={participantName}
                      setParticipantName={setParticipantName}
                      videoTrack={videoTrack}
                      setVideoTrack={setVideoTrack}
                      onClickStartMeeting={onClickStartMeeting}
                      onClickJoin={async (id) => {
                        const token = await getToken();
                        const valid = await validateMeeting({
                          roomId: id,
                          token,
                        });

                        if (valid) {
                          setToken(token);
                          setMeetingId(id);
                          if (videoTrack) {
                            videoTrack.stop();
                            setVideoTrack(null);
                          }
                          onClickStartMeeting();
                          setParticipantName("");
                        } else alert("Invalid Meeting Id");
                      }}
                      _handleOnCreateMeeting={async () => {
                        const token = await getToken();
                        const _meetingId = await createMeeting({ token });
                        setToken(token);
                        setMeetingId(_meetingId);
                        setParticipantName("");
                        return _meetingId;
                      }}
                    />
                    {stateEnter === "Занятие началось" ||
                    stateEnter === "Дождитесь разрешения на подключение" ? (
                      <div className={styles.stateOn}>{stateEnter}</div>
                    ) : (
                      <div className={styles.stateOff}>{stateEnter}</div>
                    )}
                  </div>
                </div>
              </div>
              {/* <div className="md:col-span-5 2xl:col-span-6 col-span-12 md:relative">
                <div className="flex flex-1 flex-col items-center justify-center xl:m-16 lg:m-6 md:mt-9 lg:mt-14 xl:mt-20 mt-3 md:absolute md:left-0 md:right-0 md:top-0 md:bottom-0">
                  <MeetingDetailsScreen
                    participantName={participantName}
                    setParticipantName={setParticipantName}
                    videoTrack={videoTrack}
                    setVideoTrack={setVideoTrack}
                    onClickStartMeeting={onClickStartMeeting}
                    onClickJoin={async (id) => {
                      const token = await getToken();
                      const valid = await validateMeeting({
                        roomId: id,
                        token,
                      });

                      if (valid) {
                        setToken(token);
                        setMeetingId(id);
                        if (videoTrack) {
                          videoTrack.stop();
                          setVideoTrack(null);
                        }
                        onClickStartMeeting();
                        setParticipantName("");
                      } else alert("Invalid Meeting Id");
                    }}
                    _handleOnCreateMeeting={async () => {
                      const token = await getToken();
                      const _meetingId = await createMeeting({ token });
                      setToken(token);
                      setMeetingId(_meetingId);
                      setParticipantName("");
                      return _meetingId;
                    }}
                  />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <ConfirmBox
        open={dlgMuted}
        successText="OKAY"
        onSuccess={() => {
          setDlgMuted(false);
        }}
        title="System mic is muted"
        subTitle="You're default microphone is muted, please unmute it or increase audio
            input volume from system settings."
      />

      <ConfirmBox
        open={dlgDevices}
        successText="DISMISS"
        onSuccess={() => {
          setDlgDevices(false);
        }}
        title="Mic or webcam not available"
        subTitle="Please connect a mic and webcam to speak and share your video in the meeting. You can also join without them."
      />
    </div>
  );
}
