import { useParams } from "react-router-dom";

export const Month = (): JSX.Element => {
  const params = useParams();
  return (
    <div>
      <h1>{params.month}</h1>
    </div>
  );
};
