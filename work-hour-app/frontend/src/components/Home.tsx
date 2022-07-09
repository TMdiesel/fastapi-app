export const Home = () => {
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

  return (
    <div>
      <div className="is-size-1 has-text-centered">{getTime()}</div>
    </div>
  );
};
