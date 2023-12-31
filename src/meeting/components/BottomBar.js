import { Constants, useMeeting, usePubSub } from "@videosdk.live/react-sdk";
import React, { Fragment, useEffect, useMemo, useRef, useState } from "react";
import { ChevronDownIcon, DotsHorizontalIcon } from "@heroicons/react/outline";
import recordingBlink from "../../static/animations/recording-blink.json";
import useIsRecording from "../../hooks/useIsRecording";
import RecordingIcon from "../../icons/Bottombar/RecordingIcon";
import MicOnIcon from "../../icons/Bottombar/MicOnIcon";
import MicOffIcon from "../../icons/Bottombar/MicOffIcon";
import WebcamOnIcon from "../../icons/Bottombar/WebcamOnIcon";
import WebcamOffIcon from "../../icons/Bottombar/WebcamOffIcon";
import ScreenShareIcon from "../../icons/Bottombar/ScreenShareIcon";
import ChatIcon from "../../icons/Bottombar/ChatIcon";
import EndIcon from "../../icons/Bottombar/EndIcon";
import RaiseHandIcon from "../../icons/Bottombar/RaiseHandIcon";
import PipIcon from "../../icons/Bottombar/PipIcon";
import SettingsIcon from "../../icons/Bottombar/SettingsIcon";
import { OutlinedButton } from "../../components/buttons/OutlinedButton";
import useIsTab from "../../hooks/useIsTab";
import useIsMobile from "../../hooks/useIsMobile";
import { MobileIconButton } from "../../components/buttons/MobileIconButton";
import { sideBarModes } from "../../utils/common";
import { Dialog, Popover, Transition } from "@headlessui/react";
import { createPopper } from "@popperjs/core";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import useMediaStream from "../../hooks/useMediaStream";
import Popup from "../../components/Popup";
import Header from "./Settings/Header";
import mic from './store/mic';

import styled from "styled-components";
import SubmitButton from "./Settings/ui/SubmitButton";
import CancelButton from "./Settings/ui/CancelButton";
import { observer } from "mobx-react-lite";
import formVisibleState from "./Settings/store/formVisibleState";
import MySettings from "./Settings/MySettings";
import ChannelSettings from "./Settings/ChannelSettings";
import webcamState from "./Settings/store/webcamState";
import screenshareState from "./Settings/store/screenshareState";
import microState from "./Settings/store/microState";
import recordState from "./Settings/store/recordState";
import nameState from "./Settings/store/nameState";
import { useUserData } from "../../helpers/useUserData";
import { useRoomData } from "../../helpers/useRoomData";
import activeUserSharing from "./Settings/store/activeUserSharing";

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  width: 223px;
`;

function PipBTN({ isMobile, isTab }) {
  const { pipMode, setPipMode } = useMeetingAppContext();

  const getRowCount = (length) => {
    return length > 2 ? 2 : length > 0 ? 1 : 0;
  };
  const getColCount = (length) => {
    return length < 2 ? 1 : length < 5 ? 2 : 3;
  };

  const pipWindowRef = useRef(null);
  const togglePipMode = async () => {
    //Check if PIP Window is active or not
    //If active we will turn it off
    if (pipWindowRef.current) {
      await document.exitPictureInPicture();
      pipWindowRef.current = null;
      return;
    }

    //Check if browser supports PIP mode else show a message to user
    if ("pictureInPictureEnabled" in document) {
      //Creating a Canvas which will render our PIP Stream
      const source = document.createElement("canvas");
      const ctx = source.getContext("2d");

      //Create a Video tag which we will popout for PIP
      const pipVideo = document.createElement("video");
      pipWindowRef.current = pipVideo;
      pipVideo.autoplay = true;

      //Creating stream from canvas which we will play
      const stream = source.captureStream();
      pipVideo.srcObject = stream;
      drawCanvas();

      //When Video is ready we will start PIP mode
      pipVideo.onloadedmetadata = () => {
        pipVideo.requestPictureInPicture();
      };
      await pipVideo.play();

      //When the PIP mode starts, we will start drawing canvas with PIP view
      pipVideo.addEventListener("enterpictureinpicture", (event) => {
        drawCanvas();
        setPipMode(true);
      });

      //When PIP mode exits, we will dispose the track we created earlier
      pipVideo.addEventListener("leavepictureinpicture", (event) => {
        pipWindowRef.current = null;
        setPipMode(false);
        pipVideo.srcObject.getTracks().forEach((track) => track.stop());
      });

      //These will draw all the video elements in to the Canvas
      function drawCanvas() {
        //Getting all the video elements in the document
        const videos = document.querySelectorAll("video");
        try {
          //Perform initial black paint on the canvas
          ctx.fillStyle = "black";
          ctx.fillRect(0, 0, source.width, source.height);

          //Drawing the participant videos on the canvas in the grid format
          const rows = getRowCount(videos.length);
          const columns = getColCount(videos.length);
          for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
              if (j + i * columns <= videos.length || videos.length == 1) {
                ctx.drawImage(
                  videos[j + i * columns],
                  j < 1 ? 0 : source.width / (columns / j),
                  i < 1 ? 0 : source.height / (rows / i),
                  source.width / columns,
                  source.height / rows
                );
              }
            }
          }
        } catch (error) {
          console.log(error);
        }

        //If pip mode is on, keep drawing the canvas when ever new frame is requested
        if (document.pictureInPictureElement === pipVideo) {
          requestAnimationFrame(drawCanvas);
        }
      }
    } else {
      alert("PIP is not supported by your browser");
    }
  };

  return isMobile || isTab ? (
    <MobileIconButton
      id="pip-btn"
      tooltipTitle={pipMode ? "Закрыть" : "Открыть"}
      buttonText={pipMode ? "Картинка в картинке" : "Картинка в картинке"}
      isFocused={pipMode}
      Icon={PipIcon}
      onClick={() => {
        togglePipMode();
      }}
      disabled={false}
    />
  ) : (
    <OutlinedButton
      Icon={PipIcon}
      onClick={() => {
        togglePipMode();
      }}
      isFocused={pipMode}
      tooltip={pipMode ? "Картинка в картинке" : "Картинка в картинке"}
      disabled={false}
    />
  );
}

const RaiseHandBTN = ({ isMobile, isTab }) => {
  const { publish } = usePubSub("RAISE_HAND");
  const RaiseHand = () => {
    publish("Raise Hand");
  };

  return isMobile || isTab ? (
    <MobileIconButton
      id="RaiseHandBTN"
      tooltipTitle={"Поднять руку"}
      Icon={RaiseHandIcon}
      onClick={RaiseHand}
      buttonText={"Поднять руку"}
    />
  ) : (
    <OutlinedButton
      onClick={RaiseHand}
      tooltip={"Поднять руку"}
      Icon={RaiseHandIcon}
    />
  );
};

const RecordingBTN = () => {
  const { startRecording, stopRecording, recordingState } = useMeeting();
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: recordingBlink,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
    height: 64,
    width: 160,
  };

  const isRecording = useIsRecording();
  const isRecordingRef = useRef(isRecording);

  useEffect(() => {
    isRecordingRef.current = isRecording;
  }, [isRecording]);

  const { isRequestProcessing } = useMemo(
    () => ({
      isRequestProcessing:
        recordingState === Constants.recordingEvents.RECORDING_STARTING ||
        recordingState === Constants.recordingEvents.RECORDING_STOPPING,
    }),
    [recordingState]
  );

  const _handleClick = () => {
    const isRecording = isRecordingRef.current;

    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  return (
    <OutlinedButton
      Icon={RecordingIcon}
      onClick={_handleClick}
      isFocused={isRecording}
      tooltip={
        recordingState === Constants.recordingEvents.RECORDING_STARTED
          ? "Остановить запись"
          : recordingState === Constants.recordingEvents.RECORDING_STARTING
          ? "Запись начинается"
          : recordingState === Constants.recordingEvents.RECORDING_STOPPED
          ? "Начать запись"
          : recordingState === Constants.recordingEvents.RECORDING_STOPPING
          ? "Запись останавливается"
          : "Начать запись"
      }
      lottieOption={isRecording ? defaultOptions : null}
      isRequestProcessing={isRequestProcessing}
    />
  );
};

const MicBTN = observer(({ selectMicDeviceId, setSelectMicDeviceId }) => {
  const mMeeting = useMeeting();
  const [mics, setMics] = useState([]);
  const localMicOn = mMeeting?.localMicOn;
  const changeMic = mMeeting?.changeMic;

  const user = useUserData();
  const room = useRoomData();

  const getMics = async (mGetMics) => {
    const mics = await mGetMics();

    mics && mics?.length && setMics(mics);
  };

  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = useRef();
  const tooltipRef = useRef();

  const openTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "top",
    });
    setTooltipShow(true);
  };
  const closeTooltip = () => {
    setTooltipShow(false);
  };

    function toggleMic() {
      if (room.micro_for === 'all' || mic.state === 'all') {
        mMeeting.toggleMic();
      }
      if (user.role === 'owner') {
        mMeeting.toggleMic();
      }
    }

  // автоматичексое отключения микро юзерам, если разрешение имеет только owner
  if (
    room.micro_for === "owner" &&
    user.role !== "owner" &&
    mMeeting.localMicOn
  ) {
    mMeeting.toggleMic();
  }

    useEffect(() => {
      console.log(mic.state);
    }, [mic.state])

  return (
    <>
      <OutlinedButton
        Icon={localMicOn ? MicOnIcon : MicOffIcon}
        onClick={toggleMic}
        borderColor={localMicOn && "#ffffff33"}
        isFocused={localMicOn}
        focusIconColor={localMicOn && "white"}
        tooltip={localMicOn ? "Выключить микрофон" : "Включить микрофон"}
        renderRightComponent={() => {
          return (
            <>
              <Popover className="relative">
                {({ close }) => (
                  <>
                    <Popover.Button className="flex items-center justify-center mt-1 mr-1">
                      <div
                        ref={btnRef}
                        onMouseEnter={openTooltip}
                        onMouseLeave={closeTooltip}
                      >
                        <button
                          onClick={(e) => {
                            getMics(mMeeting.getMics);
                          }}
                        >
                          <ChevronDownIcon
                            className="h-4 w-4"
                            style={{
                              color: mMeeting.localMicOn
                                ? "#5F6A77"
                                : "#5F6A77",
                              background: "white",
                            }}
                          />
                        </button>
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 bottom-full z-10 mt-3 w-72 -translate-x-1/2 transform px-4 sm:px-0 pb-4">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className={" bg-gray-750 py-1"}>
                            <div>
                              <div className="flex items-center p-3 pb-0">
                                <p className="ml-3 text-sm text-gray-900">
                                  {"MICROPHONE"}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                {mics.map(({ deviceId, label }, index) => (
                                  <div
                                    className={`px-3 py-1 my-1 pl-6 text-white text-left ${
                                      deviceId === selectMicDeviceId &&
                                      "bg-gray-150"
                                    }`}
                                  >
                                    <button
                                      className={`flex flex-1 w-full ${
                                        deviceId === selectMicDeviceId &&
                                        "bg-gray-150"
                                      }`}
                                      key={`mics_${deviceId}`}
                                      onClick={() => {
                                        setSelectMicDeviceId(deviceId);
                                        changeMic(deviceId);
                                        close();
                                      }}
                                    >
                                      {label || `Mic ${index + 1}`}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <div
                style={{ zIndex: 999 }}
                className={`${
                  tooltipShow ? "" : "hidden"
                } overflow-hidden flex flex-col items-center justify-center pb-4`}
                ref={tooltipRef}
              >
                <div className={"rounded-md p-1.5 bg-black "}>
                  <p className="text-base text-white ">{"Изменить микрофон"}</p>
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
});

const WebCamBTN = ({ setSelectWebcamDeviceId }) => {
  const mMeeting = useMeeting();
  const { selectWebcamDeviceId } = useMeetingAppContext();

  const [webcams, setWebcams] = useState([]);
  const { getVideoTrack } = useMediaStream();

  const localWebcamOn = mMeeting?.localWebcamOn;
  const disableWebcam = mMeeting?.disableWebcam;
  const changeWebcam = mMeeting?.changeWebcam;

  const getWebcams = async (mGetWebcams) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    const webcams = devices.filter(
      (d) =>
        d.kind === "videoinput" &&
        d.deviceId !== "default" &&
        d.deviceId !== "communications"
    );

    webcams && webcams?.length && setWebcams(webcams);
  };

  const [tooltipShow, setTooltipShow] = useState(false);
  const btnRef = useRef();
  const tooltipRef = useRef();

  const openTooltip = () => {
    createPopper(btnRef.current, tooltipRef.current, {
      placement: "top",
    });
    setTooltipShow(true);
  };
  const closeTooltip = () => {
    setTooltipShow(false);
  };

  return (
    <>
      <OutlinedButton
        Icon={localWebcamOn ? WebcamOnIcon : WebcamOffIcon}
        onClick={async () => {
          let track;
          if (!localWebcamOn) {
            track = await getVideoTrack({
              webcamId: selectWebcamDeviceId,
              encoderConfig: "h540p_w960p",
            });
          }
          mMeeting.toggleWebcam(track);
        }}
        borderColor={localWebcamOn && "#ffffff33"}
        isFocused={localWebcamOn}
        focusIconColor={localWebcamOn && "white"}
        tooltip={localWebcamOn ? "Выключить камеру" : "Включить камеру"}
        renderRightComponent={() => {
          return (
            <>
              <Popover className="relative">
                {({ close }) => (
                  <>
                    <Popover.Button className="flex items-center justify-center mt-1 mr-1">
                      <div
                        ref={btnRef}
                        onMouseEnter={openTooltip}
                        onMouseLeave={closeTooltip}
                      >
                        <button
                          onClick={(e) => {
                            getWebcams(mMeeting?.getWebcams);
                          }}
                        >
                          <ChevronDownIcon
                            className="h-4 w-4"
                            style={{
                              color: localWebcamOn ? "#5F6A77" : "#5F6A77",
                              background: "white",
                            }}
                          />
                        </button>
                      </div>
                    </Popover.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute left-1/2 bottom-full z-10 mt-3 w-72 -translate-x-1/2 transform px-4 sm:px-0 pb-4">
                        <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                          <div className={" bg-gray-750 py-1"}>
                            <div>
                              <div className="flex items-center p-3 pb-0">
                                <p className="ml-3 text-sm text-gray-900">
                                  {"WEBCAM"}
                                </p>
                              </div>
                              <div className="flex flex-col">
                                {webcams.map(({ deviceId, label }, index) => (
                                  <div
                                    className={`px-3 py-1 my-1 pl-6 text-white text-left ${
                                      deviceId === selectWebcamDeviceId &&
                                      "bg-gray-150"
                                    }`}
                                  >
                                    <button
                                      className={`flex flex-1 w-full ${
                                        deviceId === selectWebcamDeviceId &&
                                        "bg-gray-150"
                                      }`}
                                      key={`output_webcams_${deviceId}`}
                                      onClick={async () => {
                                        setSelectWebcamDeviceId(deviceId);
                                        await disableWebcam();
                                        let customTrack = await getVideoTrack({
                                          webcamId: deviceId,
                                          encoderConfig: "h540p_w960p",
                                        });

                                        changeWebcam(customTrack);
                                        setTimeout(() => {
                                          close();
                                        }, 200);
                                      }}
                                    >
                                      {label || `Webcam ${index + 1}`}
                                    </button>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
              <div
                style={{ zIndex: 999 }}
                className={`${
                  tooltipShow ? "" : "hidden"
                } overflow-hidden flex flex-col items-center justify-center pb-4`}
                ref={tooltipRef}
              >
                <div className={"rounded-md p-1.5 bg-black "}>
                  <p className="text-base text-white ">{"Изменить камеру"}</p>
                </div>
              </div>
            </>
          );
        }}
      />
    </>
  );
};

const ScreenShareBTN = observer(({ isMobile, isTab, activeEmail }) => {
  const { localScreenShareOn, toggleScreenShare, presenterId, participants } = useMeeting();
  const email = localStorage.getItem("email");
  const user = useUserData();
  const room = useRoomData();

  function toggleSharing() {
    for (let participant of participants.values()) {
      console.log(participant.id);
      if (participant.id === activeUserSharing.state) {
        console.log('log');
        if (participant.displayName === user.name_channel) {
          toggleScreenShare();
        }
      }
    }
  }

  useEffect(() => {
    toggleSharing();
  }, [activeUserSharing.state])

  useEffect(() => {
    console.log(presenterId);
  }, [presenterId])

  return isMobile || isTab ? (
    <MobileIconButton
      id="screen-share-btn"
      tooltipTitle={
        presenterId
          ? localScreenShareOn
            ? "Остановить демонстрацию"
            : null
          : "Демонстрировать экран"
      }
      buttonText={
        presenterId
          ? localScreenShareOn
            ? "Демонстрация"
            : null
          : "Демонстрация"
      }
      isFocused={localScreenShareOn}
      Icon={ScreenShareIcon}
      onClick={() => {
        toggleScreenShare();
      }}
      disabled={
        presenterId
          ? localScreenShareOn
            ? false
            : true
          : isMobile
          ? true
          : false
      }
    />
  ) : (
    <OutlinedButton
      Icon={ScreenShareIcon}
      onClick={() => {
        toggleScreenShare();
      }}
      isFocused={localScreenShareOn}
      tooltip={
        presenterId
          ? localScreenShareOn
            ? "Остановить демонстрацию"
            : null
          : "Демонстрировать экран"
      }
      disabled={presenterId ? (localScreenShareOn ? false : true) : false}
    />
  );
});

const LeaveBTN = ({ setIsMeetingLeft }) => {
  const { leave } = useMeeting();

  function toLobby() {
    window.location.href = `${process.env.REACT_APP_NETWORKCLASS_URL}/lobby`;
  }

  return (
    <OutlinedButton
      Icon={EndIcon}
      bgColor="#F95A39"
      onClick={() => {
        setIsMeetingLeft(true);
        leave();
        toLobby();
      }}
      tooltip="Выйти"
    />
  );
};

const ChatBTN = ({ isMobile, isTab }) => {
  const { sideBarMode, setSideBarMode } = useMeetingAppContext();
  return isMobile || isTab ? (
    <MobileIconButton
      tooltipTitle={"Открыть чат"}
      buttonText={"Чат"}
      Icon={ChatIcon}
      isFocused={sideBarMode === sideBarModes.CHAT}
      onClick={() => {
        setSideBarMode((s) =>
          s === sideBarModes.CHAT ? null : sideBarModes.CHAT
        );
      }}
    />
  ) : (
    <OutlinedButton
      Icon={ChatIcon}
      onClick={() => {
        setSideBarMode((s) =>
          s === sideBarModes.CHAT ? null : sideBarModes.CHAT
        );
      }}
      isFocused={sideBarMode === "CHAT"}
      tooltip="Открыть чат"
    />
  );
};

/* eslint-disable */
const SettingsBTN = observer(() => {
  const [popupActive, setPopupActive] = useState(false);

  function updateSettings(e) {
    e.preventDefault();

    const roomId = localStorage.getItem("roomId");
    const email = localStorage.getItem("email");

    const updatedSettings = {
      user_channel_name: nameState.state,
      webcam_for: webcamState.state,
      screenshare_for: screenshareState.state,
      screenrecord_for: recordState.state,
      micro_for: microState.state,
    };

      fetch(
        `https://network-class-server.ru/user_channels/setting/${roomId}/${email}`,
        {
          method : 'PUT',
          headers: {
            'Content-type': 'application/json',
          },
          body : JSON.stringify(updatedSettings),
        }
      )
        .then((response) => response.text())
        .then((response) => {
          response = JSON.parse(response);
          mic.change(response.micro_for);
        });
    }

  return (
    <>
      <Popup active={popupActive} setActive={setPopupActive}>
        <form onSubmit={updateSettings}>
          <Header />
          {formVisibleState.state === "my" ? (
            <MySettings />
          ) : (
            <ChannelSettings />
          )}
          <Buttons>
            <SubmitButton type="submit">Сохранить</SubmitButton>
            <CancelButton type="button" onClick={() => setPopupActive(false)}>
              Отмена
            </CancelButton>
          </Buttons>
        </form>
      </Popup>
      <OutlinedButton
        Icon={SettingsIcon}
        bgColor="#fff"
        onClick={() => {
          setPopupActive(true);
        }}
        tooltip="Открыть настройки"
      />
    </>
  );
});

const ScreenShareBTNWrapper = observer(({ isMobile, isTab }) => {
  return (
    <ScreenShareBTN
      isMobile={isMobile}
      isTab={isTab}
      activeEmail={activeUserSharing.state}
    />
  );
});

export function BottomBar({
  bottomBarHeight,
  setIsMeetingLeft,
  selectWebcamDeviceId,
  setSelectWebcamDeviceId,
  selectMicDeviceId,
  setSelectMicDeviceId,
}) {
  const tollTipEl = useRef();
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const [open, setOpen] = useState(false);

  const handleClickFAB = () => {
    setOpen(true);
  };

  const handleCloseFAB = () => {
    setOpen(false);
  };

  const BottomBarButtonTypes = useMemo(
    () => ({
      END_CALL: "END_CALL",
      CHAT: "CHAT",
      PARTICIPANTS: "PARTICIPANTS",
      SCREEN_SHARE: "SCREEN_SHARE",
      WEBCAM: "WEBCAM",
      MIC: "MIC",
      RAISE_HAND: "RAISE_HAND",
      RECORDING: "RECORDING",
      PIP: "PIP",
      MEETING_ID_COPY: "MEETING_ID_COPY",
    }),
    []
  );

  const otherFeatures = [
    { icon: BottomBarButtonTypes.RAISE_HAND },
    { icon: BottomBarButtonTypes.PIP },
    { icon: BottomBarButtonTypes.SCREEN_SHARE },
    { icon: BottomBarButtonTypes.CHAT },
    { icon: BottomBarButtonTypes.PARTICIPANTS },
    { icon: BottomBarButtonTypes.MEETING_ID_COPY },
  ];

  return isMobile ? (
    <div
      className="flex items-center"
      style={{
        height: bottomBarHeight,
        borderTop: "0.5px solid #D5DEE8",
        background: "#F9FAFE",
        paddingLeft: "20px",
        justifyContent: "space-between",
      }}
    >
      <div className="flex items-center">
        <MicBTN
          selectMicDeviceId={selectMicDeviceId}
          setSelectMicDeviceId={setSelectMicDeviceId}
        />
        <WebCamBTN setSelectWebcamDeviceId={setSelectWebcamDeviceId} />
      </div>
      <div className="flex items-center">
        <RecordingBTN />
        <OutlinedButton Icon={DotsHorizontalIcon} onClick={handleClickFAB} />
        <Transition appear show={Boolean(open)} as={Fragment}>
          <Dialog
            as="div"
            className="relative"
            style={{ zIndex: 9999 }}
            onClose={handleCloseFAB}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="translate-y-full opacity-0 scale-95"
              enterTo="translate-y-0 opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="translate-y-0 opacity-100 scale-100"
              leaveTo="translate-y-full opacity-0 scale-95"
            >
              <div className="fixed inset-0 overflow-y-hidden">
                <div className="flex h-full items-end justify-end text-center">
                  <Dialog.Panel className="w-screen transform overflow-hidden bg-gray-800 shadow-xl transition-all">
                    <div className="grid container bg-gray-800 py-6">
                      <div className="grid grid-cols-12 gap-2">
                        {otherFeatures.map(({ icon }) => {
                          return (
                            <div
                              className={`grid items-center justify-center ${
                                icon === BottomBarButtonTypes.MEETING_ID_COPY
                                  ? "col-span-7 sm:col-span-5 md:col-span-3"
                                  : "col-span-4 sm:col-span-3 md:col-span-2"
                              }`}
                            >
                              {icon === BottomBarButtonTypes.RAISE_HAND ? (
                                <RaiseHandBTN
                                  isMobile={isMobile}
                                  isTab={isTab}
                                />
                              ) : icon === BottomBarButtonTypes.SCREEN_SHARE ? (
                                <ScreenShareBTN
                                  isMobile={isMobile}
                                  isTab={isTab}
                                />
                              ) : icon === BottomBarButtonTypes.CHAT ? (
                                <ChatBTN isMobile={isMobile} isTab={isTab} />
                              ) : icon === BottomBarButtonTypes.PARTICIPANTS ? (
                                <></>
                              ) : icon === BottomBarButtonTypes.PIP ? (
                                <PipBTN isMobile={isMobile} isTab={isTab} />
                              ) : null}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Dialog.Panel>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition>
      </div>
      <LeaveBTN />
    </div>
  ) : (
    <div
      className="md:flex lg:px-2 xl:px-6 px-2 hidden"
      style={{
        background: "#F9FAFE",
        paddingLeft: "50px",
        borderTop: "0.5px solid #D5DEE8",
        height: bottomBarHeight,
        justifyContent: "space-between",
      }}
    >
      <div className="flex items-center justify-center">
        <MicBTN />
        <WebCamBTN />
      </div>
      <div className="flex flex-1 items-center justify-center" ref={tollTipEl}>
        <RaiseHandBTN isMobile={isMobile} />
        <ScreenShareBTNWrapper isMobile={isMobile} />
        <RecordingBTN />
        <PipBTN isMobile={isMobile} />
        <SettingsBTN />
      </div>
      <div className="flex items-center justify-center">
        <LeaveBTN setIsMeetingLeft={setIsMeetingLeft} />
      </div>
    </div>
  );
}
