import React from "react";
import { useState } from "react";
import { createWork } from "../apis";
import { Link } from "react-router-dom";

export const Home = () => {
  const [item, setItem] = useState<string>("item1");

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
    event: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setItem(event.target.value);
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    if (!item) return;
    createWork({
      item: item,
      isActive: true,
      startDatetime: new Date(),
    });
  };

  return (
    <div className="box">
      <div className="is-size-1">{getTime()}</div>
      <div className="columns is-centerd mt-5">
        <select
          className="select"
          onChange={handleItemChange}
          style={{ width: "33%" }}
        >
          <option value="item1">item1</option>
          <option value="item2">item2</option>
        </select>

        <Link to="/data">
          <button className="button is-info is-hoverrd" onClick={handleSubmit}>
            開始
          </button>
        </Link>
      </div>
    </div>
  );
};
