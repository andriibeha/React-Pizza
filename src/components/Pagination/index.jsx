import ReactPaginate from 'react-paginate';
import s from "./Pagination.module.scss"

const Pagination = ({currentPage, onChangePage}) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={6}
            pageCount={2}
            forcePage={currentPage - 1}
            renderOnZeroPageCount={null}
        />
    )
};

export default Pagination;

