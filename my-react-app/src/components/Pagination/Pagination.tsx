import { PaginationPropsType } from "./pagination.types";
import s from "./pagination.module.css";
import { useNavigate, useParams } from "react-router-dom";
import { useCallback, useMemo } from "react";

export const Pagination = ({ maxPage }: PaginationPropsType) => {
  const { page } = useParams();
  const navigate = useNavigate();
  const isPrevDisabled = useMemo(() => page === "1", [page]);
  const isNextDisabled = useMemo(() => page === maxPage, [page, maxPage]);

  const prevHandler = useCallback(() => {
    navigate(`/page/${Number(page) - 1}`);
  }, [page]);
  const nextHandler = useCallback(() => {
    navigate(`/page/${Number(page) + 1}`);
  }, [page]);

  if (!page) return null;

  return (
    <div className={s.paginationWrap}>
      <button
        disabled={isPrevDisabled}
        onClick={prevHandler}
        className={s.paginationButton}
      >
        Prev
      </button>
      <div className={s.current}>Page: {page}</div>
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
