import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/page/1");
  }, []);
  return null;
};
