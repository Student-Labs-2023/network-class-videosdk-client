import React, { useState } from "react";
import styled from "styled-components";
import close from "../../icons/select.svg";
import open from "../../icons/select-active.svg";

const Container = styled.div`
  flex: 1 0 214px;
`;

const Text = styled.div`
  color: #5f6a77;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 400;
  margin-bottom: 21px;
`;

const Paragraph = styled.div`
  font-family: "Noto Sans";
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;

  color: black;
`;

const SelectBlock = styled.div`
  position: relative;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  align-items: center;
  gap: 27px;
  border-radius: 10px;
  box-shadow: 0px 0px 2px 0px #c5ccd5;
  background: white;

  &:hover {
    cursor: pointer;
  }
`;

const Selected = styled.div`
  flex: 1 1;
  display: inline-block;
  color: black;
  font-family: "Noto Sans";
  font-size: 18px;
  font-weight: 400;
`;

const Icon = styled.img`
  flex: 0 0;
  width: 34px;
  height: 34px;
`;

const SelectList = styled.div`
  padding: 20px 16px 16px;
  border-radius: 10px;
  background: white;
  box-shadow: 5px 5px 10px 0px #d5dee8;
  transition: all 0.3s ease;
`;

const SelectLink = styled.div`
  color: #7e8a98;
  font-family: "Noto Sans";
  font-size: 16px;
  font-weight: 400;

  &:hover {
    color: #000;
    cursor: pointer;
  }
`;

const Divider = styled.div`
  margin: 10px 0;
  width: 100%;
  height: 0.5px;
  background: #d5dee8;
`;

export const SelectDevice = (Props) => {
  const [selectActive, setSelectActive] = useState(false);
  const [selected, setSelected] = useState("По-умолчанию");

  return (
    <Container>
      <Text>{Props.title}</Text>
      <SelectBlock onClick={() => setSelectActive(!selectActive)}>
        <Selected>
          <Paragraph>{selected}</Paragraph>
        </Selected>
        {selectActive ? <Icon src={open} /> : <Icon src={close} />}
      </SelectBlock>
      <div style={{ borderTop: "6px solid transparent" }}>
        <SelectList
          style={
            selectActive
              ? { opacity: 1, visibility: "visible" }
              : { opacity: 0, visibility: "hidden" }
          }
        >
          {Props.list.length ? (
            Props.list.map((device) => {
              return (
                <>
                  <SelectLink
                    onClick={(e) => {
                      setSelected(e.currentTarget.innerHTML);
                      setSelectActive(!selectActive);
                      Props.setSelected((s) => ({
                        ...s,
                        id: device?.deviceId,
                      }));
                      Props.changeDevice(device?.deviceId);
                    }}
                  >
                    {device.label}
                  </SelectLink>
                  {device !== Props.list[Props.list.length - 1] ? (
                    <Divider />
                  ) : (
                    ""
                  )}
                </>
              );
            })
          ) : (
            <SelectLink style={{ pointerEvents: "none" }}>
              Нет устройств
            </SelectLink>
          )}
        </SelectList>
      </div>
    </Container>
  );
};
