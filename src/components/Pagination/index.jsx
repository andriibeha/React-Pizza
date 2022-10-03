import ReactPaginate from 'react-paginate';
import s from "./Pagination.module.scss"

const Pagination = ({onChangePage}) => {
    return (
        <ReactPaginate
            className={s.root}
            breakLabel="..."
            nextLabel=">"
            previousLabel="<"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={6}
            pageCount={3}
            renderOnZeroPageCount={null}
        />
    )
};

export default Pagination;
