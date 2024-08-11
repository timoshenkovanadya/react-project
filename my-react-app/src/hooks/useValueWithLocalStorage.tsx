"use client";

import { useEffect, useState } from "react";

export const useValueWithLocalStorage = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("searchValue", searchValue);
  }, [searchValue]);

  return [searchValue, setSearchValue] as const;
};
