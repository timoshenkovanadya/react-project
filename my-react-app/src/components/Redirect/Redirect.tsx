import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Redirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push("/1");
  }, []);
  return null;
};
