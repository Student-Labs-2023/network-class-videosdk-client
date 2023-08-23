import { usePubSub } from "@videosdk.live/react-sdk";
import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import EmojiPicker from "emoji-picker-react";
import emojiIcon from "../../icons/emoji.svg";

const Input = styled.input`
  background: white;
  padding: 10px 10px 10px 52px;
  height: 44px;
  color: black;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 400;
  line-height: normal;
  border-radius: 8px;
  border: none;
  box-shadow: 0px 0px 2px 0px #c5ccd5;

  &::placeholder {
    color: #5f6a77;
  }
  &:focus::placeholder {
    opacity: 0;
  }
  &:focus {
    box-shadow: none;
    border: 1.5px solid blue;
  }
`;

const Send = styled.button`
  display: flex;
  width: 44px;
  height: 44px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 0px #c5ccd5;

  &:hover {
    background: var(--blue, #175ef1);
    transition: all 0.3s ease;
  }
  &:hover > svg path {
    stroke: white;
  }
`;

const Emoji = styled.div`
  position: absolute;
  top: 5px;
  left: 10px;
  display: flex;
  width: 34px;
  height: 34px;
  justify-content: center;
  align-items: center;

  &:hover {
    cursor: pointer;
  }
`;

const EmojiList = styled.div`
  position: absolute;
  top: -410px;
  left: 0;
  transition: all 0.2s ease;
`;

export const ChatInput = ({ inputHeight }) => {
  const [message, setMessage] = useState("");
  const [emojiActive, setEmojiActive] = useState(false);
  const { publish } = usePubSub("CHAT");
  const input = useRef();

  return (
    <div
      className="w-full flex items-center px-2"
      style={{ height: inputHeight, background: "#FFF", gap: "6px" }}
    >
      <div className="relative flex-1">
        <Emoji
          onClick={() => {
            const prev = emojiActive;
            setEmojiActive(!prev);
          }}
        >
          <img src={emojiIcon} alt="" />
        </Emoji>
        <EmojiList
          style={
            emojiActive
              ? { opacity: 1, visibility: "visible" }
              : { opacity: 0, visibility: "hidden" }
          }
        >
          <EmojiPicker
            width={350}
            height={400}
            searchDisabled="true"
            emojiStyle="google"
            previewConfig={{ showPreview: false }}
            onEmojiClick={(e) => setMessage((input) => input + e.emoji)}
          />
        </EmojiList>
        <Input
          type="text"
          className="w-full"
          placeholder="Введите сообщение"
          autoComplete="off"
          ref={input}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              const messageText = message.trim();

              if (messageText.length > 0) {
                publish(messageText, { persist: true });
                setTimeout(() => {
                  setMessage("");
                }, 100);
                input.current?.focus();
              }
            }
          }}
        />
      </div>
      <span className="inset-y-0 flex mr-2">
        <Send
          type="submit"
          className="p-1 focus:outline-none focus:shadow-outline"
          onClick={() => {
            setEmojiActive(false);
            const messageText = message.trim();
            if (messageText.length > 0) {
              publish(messageText, { persist: true });
              setTimeout(() => {
                setMessage("");
              }, 100);
              input.current?.focus();
            }
          }}
        >
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="send">
              <path
                id="Vector"
                d="M26.3 6C27.2 6 28 6.79995 28 7.69995C28 7.89995 28 8.10005 27.9 8.30005L20.5 26.8C20.2 27.5 19.5 28 18.8 28C18.3 28 17.8 27.8 17.5 27.5L6.60001 16.6C6.30001 16.3 6.10001 15.8 6.10001 15.3C6.10001 14.6 6.59999 13.9 7.29999 13.6L25.8 6.19995C25.9 5.99995 26.1 6 26.3 6Z"
                stroke="#A0AFC1"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                id="Vector_2"
                d="M27.5 6.5L11 21V26.6C11 27.4 11.6 28 12.4 28C12.8 28 13.2 27.8 13.4 27.5L15.3 25.3"
                stroke="#A0AFC1"
                stroke-width="1.5"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </Send>
      </span>
    </div>
  );
};
