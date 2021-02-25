import React from "react";
import ReactPaginate from "react-paginate";
import componentStyle from "./Paginate.module.scss";

export const Paginate = (props) => {
  const { onPageChange, pageCount } = props;

  return (
    <ReactPaginate
      previousLabel={componentStyle.prev}
      nextLabel={componentStyle.next}
      breakLabel={"..."}
      breakClassName={"break-me"}
      pageCount={pageCount}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      onPageChange={onPageChange}
      containerClassName={componentStyle.pagination}
      subContainerClassName={`${componentStyle.pages} ${componentStyle.pagination}`}
      activeClassName={componentStyle.active}
    />
  );
};
