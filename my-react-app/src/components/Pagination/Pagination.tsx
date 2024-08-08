'use client'

import { useCallback, useContext, useMemo } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "../../context/ThemeContext";
import { RootState } from "../../store/store";
import s from "./pagination.module.css";
import { useRouter } from "next/router";

export const Pagination = () => {
  const router = useRouter();
  const page = router.query.page;
  const maxPage = useSelector((store: RootState) => store.page.maxPage);
  const isPrevDisabled = useMemo(() => page === "1", [page]);
  const isNextDisabled = useMemo(() => page === maxPage, [page, maxPage]);
  const { theme } = useContext(ThemeContext);

  const prevHandler = useCallback(() => {
    router.push(`/page/${Number(page) - 1}`);
  }, [page]);
  const nextHandler = useCallback(() => {
    router.push(`/page/${Number(page) + 1}`);
  }, [page]);

  if (!page) return null;

  return (
    <div className={theme==="dark"? s.paginationWrap : s.paginationWrapLight}>
      <button
        disabled={isPrevDisabled}
        onClick={prevHandler}
        className={s.paginationButton}
      >
        Prev
      </button>
      <div className={theme==="dark"? s.current : s.currentLight}>Page: {page}</div>
      <button
        disabled={isNextDisabled}
        onClick={nextHandler}
        className={s.paginationButton}
      >
        Next
      </button>
    </div>
  );
};
