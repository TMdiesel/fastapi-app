import { useParams } from "react-router-dom";

export const Month = (): JSX.Element => {
  let params = useParams();
  return (
    <div>
      <h1>{params.month}</h1>
    </div>
  );
};
