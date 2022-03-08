import axios from "../axios";
import { useState, useEffect } from "react";
import { requests } from "../request.js";

type movieProps = {
  title?: string;
  name?: string;
  orignal_name?: string;
  backdrop_path?: string;
  overview?: string;
};

export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({});
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(requests.feachNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchData();
  }, []);
  console.log(movie);

  const divStyle = { color: "red" };
  return (
    <div style={divStyle}>
      <p>{movie.name}</p>
    </div>
  );
};
