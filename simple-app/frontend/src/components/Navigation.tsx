import { NavLink } from "react-router-dom";

export const Navigation = (): JSX.Element => {
  return (
    <div className="complete-area">
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/Register">Register</NavLink>
      </nav>
    </div>
  );
};
