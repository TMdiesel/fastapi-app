import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { updateWork, readWork } from "../apis";
import { WorkUpdate } from "../openapi";

export const Update = () => {
  const { workId } = useParams();
  const [workUpdate, setWorkUpdate] = useState<WorkUpdate>();

  useEffect(() => {
    readWork(Number(workId)).then((responses) => {
      const { workId, ...initWorkUpdate } = responses;
      setWorkUpdate(initWorkUpdate);
    });
  }, [workId]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log(event.target.value);
    //setWorkUpdate((previous) => ({ ...previous }));
  };
  const handleSubmit = () => {};

  return (
    <div>
      <input
        className="input"
        style={{ width: "33%" }}
        type="text"
        value={workUpdate?.memo}
        onChange={handleOnChange}
      ></input>
      <Link to="/data">
        <button
          className="button is-success is-hoverred"
          onClick={handleSubmit}
        >
          更新
        </button>
      </Link>
    </div>
  );
};
