import { useCallback, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import s from "./pagination.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const Pagination = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const maxPage = useSelector((store: RootState) => store.page.maxPage);
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
