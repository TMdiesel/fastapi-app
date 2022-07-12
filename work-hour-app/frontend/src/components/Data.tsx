import { readWorks, deleteWork } from "../apis";
import { useState, useEffect } from "react";
import { Work } from "../openapi";
import { Link } from "react-router-dom";

export const Data = () => {
  const [works, setWorks] = useState<Work[]>([]);
  useEffect(() => {
    readWorks().then((responses) => setWorks(responses));
  }, []);

  const toDateString = (datetime: Date): string => {
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    const day = datetime.getDay();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][day];
    return `${month}/${date} (${dayOfWeek})`;
  };
  const toTimeString = (datetime: Date | undefined): string => {
    if (datetime === undefined) {
      return "";
    }
    const hour = ("0" + datetime.getHours()).slice(-2);
    const minute = ("0" + datetime.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  };
  const onClickDelete = (workId: number) => {
    deleteWork(workId).then(() =>
      readWorks().then((responses) => setWorks(responses))
    );
  };

  return (
    <div className="box">
      <table className="table">
        <thead>
          <tr>
            <th>日付</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>作業時間</th>
            <th>項目</th>
            <th>メモ</th>
            <th>終了</th>
            <th>更新</th>
            <th>削除</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => {
            return (
              <tr key={work.workId}>
                <td>{toDateString(work.startDatetime)}</td>
                <td>{toTimeString(work.startDatetime)}</td>
                <td>{toTimeString(work.endDatetime)}</td>
                <td>{work.duration}</td>
                <td>{work.item}</td>
                <td>{work.memo}</td>
                <td>
                  {work.isActive && (
                    <button className="button is-info is-hoverrd is-small">
                      終了
                    </button>
                  )}
                </td>
                <td>
                  <Link to={`/update/${work.workId}`}>
                    <button className="button is-success is-hoverrd is-small">
                      更新
                    </button>
                  </Link>
                </td>
                <td>
                  <button
                    onClick={() => onClickDelete(work.workId)}
                    className="button is-danger is-hoverrd is-small"
                  >
                    削除
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
