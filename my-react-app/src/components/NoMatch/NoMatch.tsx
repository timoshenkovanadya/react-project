import { useNavigate } from "react-router-dom";
import s from './noMatch.module.css'

export const NoMatch = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className={s.notFound}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={goHome}>Go to Home</button>
    </div>
  );
};
