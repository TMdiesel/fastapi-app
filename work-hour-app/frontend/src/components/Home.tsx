import React from "react";
import { useState } from "react";
import { createWork } from "../apis";

export const Home = () => {
  const [item, setItem] = useState<string>("");

  const getTime = (): string => {
    const now = new Date();
    const month = now.getMonth() + 1;
    const date = now.getDate();
    const day = now.getDay();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][day];
    const hour = ("0" + now.getHours()).slice(-2);
    const minute = ("0" + now.getMinutes()).slice(-2);
    return `${month}/${date} (${dayOfWeek}) ${hour}:${minute}`;
  };

  const handleItemChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setItem(event.target.value);
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    createWork({
      item: item,
      isActive: true,
      startDatetime: new Date(),
    });
  };

  return (
    <div>
      <div className="is-size-1 has-text-centered">{getTime()}</div>
      <input type="text" value={item} onChange={handleItemChange}></input>
      <button className="button is-info is-hoverrd" onClick={handleSubmit}>
        開始
      </button>
    </div>
  );
};
