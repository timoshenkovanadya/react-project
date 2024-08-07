import { useRouter } from "next/navigation";
import s from "./noMatch.module.css";

export const NoMatch = () => {
  const router = useRouter();

  const goHome = () => {
    router.push("/");
  };

  return (
    <div className={s.notFound}>
      <h1>404</h1>
      <p>Page Not Found</p>
      <button onClick={goHome}>Go to Home</button>
    </div>
  );
};
