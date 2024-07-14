import { useEffect, useState } from "react";

export const useValueWithLocalStorage = () => {
  const [searchValue, setSearchValue] = useState<string>(
    window.localStorage.getItem("searchValue") || "",
  );

  useEffect(() => {
    window.localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);

  return [searchValue, setSearchValue] as const;
};
