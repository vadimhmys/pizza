import React from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

export default function Pagination({ onChangePage, elementCount, currentPage }) {
  const count = Math.ceil(elementCount / 4);
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={count}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1}
    />
  );
}
