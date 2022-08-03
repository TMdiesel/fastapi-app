import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { updateWork, readWork } from "../apis";
import { WorkUpdate } from "../openapi";

export const Update = () => {
  const { workId } = useParams();
  const [workUpdate, setWorkUpdate] = useState<WorkUpdate>({} as WorkUpdate);

  useEffect(() => {
    readWork(Number(workId)).then((responses) => {
      const { workId, ...initWorkUpdate } = responses;
      setWorkUpdate(initWorkUpdate);
    });
  }, [workId]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    const name = event.target.name;
    setWorkUpdate((previous) => ({
      ...previous,
      [name]: ["startDatetime", "endDatetime"].includes(name)
        ? new Date(value)
        : value,
    }));
  };
  const handleOnChangeText = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setWorkUpdate((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
  };
  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    const duration = workUpdate.endDatetime
      ? Math.floor(
          (workUpdate.endDatetime.getTime() -
            workUpdate.startDatetime.getTime()) /
            60 /
            1000
        )
      : 0;
    console.log(duration);
    setWorkUpdate((previous) => {
      console.log(previous);
      return {
        ...previous,
        duration: duration,
        startDatetime: new Date(
          new Date(workUpdate.startDatetime).getTime() + 9 * 60 * 60 * 1000
        ),
        endDatetime: new Date(
          new Date(workUpdate?.endDatetime || new Date()).getTime() +
            9 * 60 * 60 * 1000
        ),
        isActive: false,
      };
    });
    setWorkUpdate((previous) => {
      console.log(previous);
      updateWork(Number(workId), previous);
      return previous;
    });
    //updateWork(Number(workId), {
    //  ...workUpdate,
    //  duration: duration,
    //  startDatetime: new Date(
    //    new Date(workUpdate.startDatetime).getTime() + 9 * 60 * 60 * 1000
    //  ),
    //  endDatetime: new Date(
    //    new Date(workUpdate?.endDatetime || new Date()).getTime() +
    //      9 * 60 * 60 * 1000
    //  ),
    //  isActive: false,
    //});
  };
  const toISOStringMin = (
    datetime: Date | string | undefined
  ): string | undefined => {
    if (datetime === undefined) {
      return;
    }
    if (typeof datetime === "string") {
      return datetime;
    }
    const year = datetime.getFullYear();
    const month = ("0" + (datetime.getMonth() + 1)).slice(-2);
    const date = ("0" + datetime.getDate()).slice(-2);
    const hour = ("0" + datetime.getHours()).slice(-2);
    const minute = ("0" + datetime.getMinutes()).slice(-2);
    return `${year}-${month}-${date}T${hour}:${minute}`;
  };

  return (
    <div className="box">
      <div className="field">
        <label className="label">開始時間</label>
        <div className="control">
          <input
            className="input"
            type="datetime-local"
            name="startDatetime"
            value={
              toISOStringMin(workUpdate.startDatetime) ||
              toISOStringMin(new Date())
            }
            onChange={handleOnChange}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">終了時間</label>
        <div className="control">
          <input
            className="input"
            type="datetime-local"
            name="endDatetime"
            value={
              toISOStringMin(workUpdate.endDatetime) ||
              toISOStringMin(new Date())
            }
            onChange={handleOnChange}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">項目</label>
        <div className="control">
          <input
            className="input"
            type="text"
            value={workUpdate.item || ""}
            name="item"
            onChange={handleOnChange}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">メモ</label>
        <div className="control">
          <textarea
            className="textarea"
            value={workUpdate?.memo || ""}
            name="memo"
            onChange={handleOnChangeText}
          ></textarea>
        </div>
      </div>
      <div className="field">
        <div className="control">
          <button
            className="button is-success is-hoverred"
            onClick={handleSubmit}
          >
            更新
          </button>
        </div>
      </div>
    </div>
  );
};
