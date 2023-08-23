import { useMeeting } from "@videosdk.live/react-sdk";
import React from "react";
import { formatAMPM, nameTructed } from "../../utils/helper";
import { styled } from "styled-components";

const Message = styled.div`
  background: #f9fafe;
  border: #d5dee8;
  color: black;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  padding: 10px 8px;
  max-width: 100%;
`;

const Sender = styled.p`
  color: #175ef1;
  margin-bottom: 4px;
`;

const Time = styled.p`
  color: #c5ccd5;
  font-size: 12px;
`;

export const ChatMessage = ({ senderId, senderName, text, timestamp }) => {
  const mMeeting = useMeeting();
  const localParticipantId = mMeeting?.localParticipant?.id;
  const localSender = localParticipantId === senderId;

  return (
    <div
      className={`flex ${localSender ? "justify-end" : "justify-start"} mt-4`}
      style={{
        maxWidth: "100%",
      }}
    >
      <Message
        className={`flex ${localSender ? "items-end" : "items-start"} flex-col`}
        style={
          localSender
            ? { borderRadius: "6px 6px 0px 6px" }
            : { borderRadius: "0px 6px 6px 6px" }
        }
      >
        <Sender
          style={localSender ? { display: "none" } : { display: "block" }}
        >
          {nameTructed(senderName, 15)}
        </Sender>
        <div className="w-full">
          <p className="inline-block whitespace-pre-wrap break-words text-left w-full">
            {text}
          </p>
        </div>
        <div className="mt-1 w-full">
          <Time className="text-xs text-right">
            {formatAMPM(new Date(timestamp))}
          </Time>
        </div>
      </Message>
    </div>
  );
};
