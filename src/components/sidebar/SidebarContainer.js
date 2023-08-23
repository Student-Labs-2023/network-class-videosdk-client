import { useMeeting } from "@videosdk.live/react-sdk";
import React, { Fragment } from "react";
import useIsMobile from "../../hooks/useIsMobile";
import useIsTab from "../../hooks/useIsTab";

import { ChatPanel } from "./ChatPanel";
import { ParticipantPanel } from "./ParticipantPanel";
import { Dialog, Transition } from "@headlessui/react";
import { useMediaQuery } from "react-responsive";
import { useMeetingAppContext } from "../../MeetingAppContextDef";
import { sideBarModes } from "../../utils/common";

import styled from "styled-components";
import participantsIcon from "../../icons/participants-gray.svg";

const Container = styled.div``;

const Topbar = styled.div`
  margin-top: 30px;
  margin-bottom: 24px;
  display: flex;
  width: calc(100% - 28px);
  height: 34px;
  justify-content: space-between;
  align-items: center;
  padding: 0 14px;
`;

const TopbarTitle = styled.h2`
  color: #000;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
`;

const SideBarTabView = ({
  height,
  sideBarContainerWidth,
  panelHeight,
  panelHeaderHeight,
  panelHeaderPadding,
  panelPadding,
  handleClose,
  meetingMode,
}) => {
  const { participants } = useMeeting();
  const { sideBarMode, setSideBarMode } = useMeetingAppContext();

  return (
    <Container
      className="bg-white"
      style={{
        height: height,
        width: sideBarContainerWidth,
        paddingTop: panelPadding,
        paddingLeft: panelPadding,
        paddingRight: panelPadding,
        paddingBottom: panelPadding,
      }}
    >
      <div>
        <div
          className="bg-white"
          style={{
            height: height,
            // borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <>
            {sideBarMode === "PARTICIPANTS" ? (
              <>
                <Topbar>
                  <button
                    onClick={handleClose}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="21"
                      viewBox="0 0 26 21"
                      fill="none"
                    >
                      <path
                        d="M1 19L1 0.999891"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.8 1.59961L25 10.5997L17.8 19.5997"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.8001 10.5996H5.58571"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <TopbarTitle>
                    УЧАСТНИКИ ({new Map(participants)?.size})
                  </TopbarTitle>
                  <button
                    onClick={() => {
                      setSideBarMode((s) =>
                        s === sideBarModes.CHAT ? null : sideBarModes.CHAT
                      );
                    }}
                    isFocused={sideBarMode === "CHAT"}
                    tooltip="View Chat"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="24"
                      viewBox="0 0 26 24"
                      fill="none"
                    >
                      <path
                        d="M6.43555 7.69336H19.4808"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M6.43555 12.042H16.2195"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24.9164 10.9549V5.51933C24.9164 3.12769 22.9596 1.1709 20.568 1.1709H5.34843C2.9568 1.1709 1 3.12769 1 5.51933V21.3911C1 22.2608 1.65227 22.9131 2.52195 22.9131C2.9568 22.9131 3.28293 22.8043 3.60906 22.4782L6.21812 19.8692C7.08781 18.9995 8.17492 18.5646 9.26202 18.5646H11.8711H20.568C22.9596 18.5646 24.9164 16.6078 24.9164 14.2162V10.9549Z"
                        stroke="black"
                        stroke-width="1.5"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                </Topbar>
                {sideBarMode && (
                  <div
                    className={`flex items-center justify-between`}
                    style={{
                      padding: panelHeaderPadding,
                      height: panelHeaderHeight - 1,
                    }}
                  >
                    <p className="text-base text-black font-bold">
                      {sideBarMode === "PARTICIPANTS"
                        ? `${"Подключены" + ""} (${
                            new Map(participants)?.size
                          })`
                        : sideBarMode.charAt(0).toUpperCase() +
                            sideBarMode.slice(1).toLowerCase() || ""}
                    </p>
                  </div>
                )}
                <ParticipantPanel panelHeight={panelHeight} />
              </>
            ) : sideBarMode === "CHAT" ? (
              <>
                <Topbar>
                  <button
                    onClick={handleClose}
                    style={{ margin: 0, padding: 0 }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="26"
                      height="21"
                      viewBox="0 0 26 21"
                      fill="none"
                    >
                      <path
                        d="M1 19L1 0.999891"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M17.8 1.59961L25 10.5997L17.8 19.5997"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M23.8001 10.5996H5.58571"
                        stroke="#FF9900"
                        stroke-width="2"
                        stroke-miterlimit="10"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </button>
                  <TopbarTitle>ЧАТ КЛАССА</TopbarTitle>
                  <button
                    onClick={() => {
                      setSideBarMode((s) =>
                        s === sideBarModes.CHAT
                          ? sideBarModes.PARTICIPANTS
                          : null
                      );
                    }}
                    isFocused={sideBarMode === "CHAT"}
                    tooltip="View Chat"
                  >
                    <img
                      src={participantsIcon}
                      alt=""
                      style={{ width: "34px", height: "34px" }}
                    />
                  </button>
                </Topbar>
                <ChatPanel panelHeight={panelHeight} />
              </>
            ) : null}
          </>
        </div>
      </div>
    </Container>
  );
};

export function SidebarConatiner({
  height,
  sideBarContainerWidth,
  meetingMode,
}) {
  const { raisedHandsParticipants, sideBarMode, setSideBarMode } =
    useMeetingAppContext();
  const isMobile = useIsMobile();
  const isTab = useIsTab();
  const isLGDesktop = useMediaQuery({ minWidth: 1024, maxWidth: 1439 });
  const isXLDesktop = useMediaQuery({ minWidth: 1440 });

  const panelPadding = 8;

  const paddedHeight = height - panelPadding * 3.5;

  const panelHeaderHeight = isMobile
    ? 40
    : isTab
    ? 44
    : isLGDesktop
    ? 48
    : isXLDesktop
    ? 52
    : 0;

  const panelHeaderPadding = isMobile
    ? 6
    : isTab
    ? 8
    : isLGDesktop
    ? 10
    : isXLDesktop
    ? 12
    : 0;

  const handleClose = () => {
    setSideBarMode(null);
  };

  return sideBarMode ? (
    isTab || isMobile ? (
      <Transition appear show={sideBarMode ? true : false} as={Fragment}>
        <Dialog
          as="div"
          className="relative"
          style={{ zIndex: 9999 }}
          onClose={handleClose}
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
            <div className="fixed inset-0 bg-white bg-opacity-25" />
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
              <div className="flex h-screen items-center justify-center text-center">
                <Dialog.Panel className="w-screen transform overflow-hidden bg-white shadow-xl transition-all">
                  <SideBarTabView
                    height={"100%"}
                    sideBarContainerWidth={"100%"}
                    panelHeight={height}
                    raisedHandsParticipants={raisedHandsParticipants}
                    panelHeaderHeight={panelHeaderHeight}
                    panelHeaderPadding={panelHeaderPadding}
                    panelPadding={panelPadding}
                    handleClose={handleClose}
                  />
                </Dialog.Panel>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition>
    ) : (
      <SideBarTabView
        height={paddedHeight}
        sideBarContainerWidth={sideBarContainerWidth}
        panelHeight={paddedHeight - panelHeaderHeight - panelHeaderPadding}
        raisedHandsParticipants={raisedHandsParticipants}
        panelHeaderHeight={panelHeaderHeight}
        panelHeaderPadding={panelHeaderPadding}
        panelPadding={panelPadding}
        handleClose={handleClose}
        meetingMode={meetingMode}
      />
    )
  ) : (
    <></>
  );
}
