import { PaginationPropsType } from "./pagination.types";
import s from "./pagination.module.css";
import { useParams } from "react-router-dom";
import { useMemo } from "react";

export const Pagination = ({ maxPage }: PaginationPropsType) => {
  const { page } = useParams();
  const isPrevDisabled = useMemo(() => page === "1", [page]);
  const isNextDisabled = useMemo(() => page === maxPage, [page]);

  if (!page) return null;

  return (
    <div className={s.paginationWrap}>
      <button disabled={isPrevDisabled} className={s.paginationButton}>
        Prev
      </button>
      <div className={s.current}>Page: {page}</div>
      <button disabled={isNextDisabled} className={s.paginationButton}>
        Next
      </button>
    </div>
  );
};
