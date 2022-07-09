import { readWork } from "../fetcher";
import { useState, useEffect } from "react";
import { Work } from "../openapi";

export const Data = () => {
  const [works, setWorks] = useState<Work[]>([]);
  useEffect(() => {
    readWork().then((responses) => setWorks(responses));
  }, []);

  const toDateString = (datetime: Date): string => {
    const month = datetime.getMonth() + 1;
    const date = datetime.getDate();
    const day = datetime.getDay();
    const dayOfWeek = ["日", "月", "火", "水", "木", "金", "土"][day];
    return `${month}/${date} (${dayOfWeek})`;
  };
  const toTimeString = (datetime: Date): string => {
    const hour = ("0" + datetime.getHours()).slice(-2);
    const minute = ("0" + datetime.getMinutes()).slice(-2);
    return `${hour}:${minute}`;
  };

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>日付</th>
            <th>開始時間</th>
            <th>終了時間</th>
            <th>作業時間</th>
            <th>項目</th>
            <th>メモ</th>
          </tr>
        </thead>
        <tbody>
          {works.map((work) => {
            return (
              <tr key={work.workId}>
                <th>{toDateString(work.startDatetime)}</th>
                <th>{toTimeString(work.startDatetime)}</th>
                <th>{toTimeString(work.endDatetime)}</th>
                <th>{work.duration}</th>
                <th>{work.item}</th>
                <th>{work.memo}</th>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
