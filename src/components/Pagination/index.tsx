import ReactPaginate from 'react-paginate';
import s from "./Pagination.module.scss";

type PaginationProps = {
    currentPage: number;
    onChangePage: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({currentPage, onChangePage}) => {
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
        />
    )
};

export default Pagination;

