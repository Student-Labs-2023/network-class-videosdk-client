import { usePubSub } from "@videosdk.live/react-sdk";
import React, { useEffect, useRef } from "react";
import { formatDDMMYY, json_verify } from "../../utils/helper";
import { styled } from "styled-components";
import { ChatMessage } from "./ChatMessage";

const DateText = styled.div`
  padding-bottom: 14px;
  text-align: center;
  color: #a0afc1;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
`;

export const ChatMessages = ({ listHeight }) => {
  let date = "",
    diffDate = false;
  const listRef = useRef();
  const { messages } = usePubSub("CHAT");

  const scrollToBottom = (data) => {
    if (!data) {
      if (listRef.current) {
        listRef.current.scrollTop = listRef.current.scrollHeight;
      }
    } else {
      const { text } = data;

      if (json_verify(text)) {
        const { type } = JSON.parse(text);
        if (type === "CHAT") {
          if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
          }
        }
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return messages ? (
    <div ref={listRef} style={{ overflowY: "auto", height: listHeight }}>
      <div
        className="p-4 flex flex-col justify-end"
        style={{ minHeight: "100%" }}
      >
        {messages.reverse().map((msg, i) => {
          const { senderId, senderName, message, timestamp } = msg;
          const dateMessage = new Date(timestamp).getDay();

          diffDate = date !== dateMessage;
          date = diffDate ? dateMessage : date;

          return (
            <>
              {diffDate ? (
                <DateText>{formatDDMMYY(new Date(timestamp))}</DateText>
              ) : (
                ""
              )}
              <ChatMessage
                key={`chat_item_${i}`}
                {...{ senderId, senderName, text: message, timestamp }}
              />
            </>
          );
        })}
      </div>
    </div>
  ) : (
    <p>No messages</p>
  );
};
