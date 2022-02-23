import { NavLink } from "react-router-dom";

interface DescType {
  link: string;
  description: string;
}
interface DescDictionary {
  [id: string]: DescType;
}

export const Home = (): JSX.Element => {
  const buttonList: DescDictionary = {
    1: { link: "January", description: "1月" } as DescType,
    2: { link: "Feburuary", description: "2月" } as DescType,
  };
  return (
    <div>
      {Object.values(buttonList).map((element: DescType) => {
        return (
          <div>
            <NavLink to={`/month/${element.link}`}>
              <button>{element.description}</button>
            </NavLink>
          </div>
        );
      })}
    </div>
  );
};
