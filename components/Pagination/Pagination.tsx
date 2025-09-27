import css from "./Pagination.module.css"
import ReactPaginate from "react-paginate";

interface PaginationProps extends React.ComponentProps<'div'> {
    totalPages: number;
    currentPage: number;
    onPageChange: (selected: number) => void;
}



export default function Pagination({totalPages, currentPage, onPageChange, ...rest}:PaginationProps) {
    return (
        <div {...rest}>
            <ReactPaginate
                        pageCount={totalPages ?? 0}
                        pageRangeDisplayed={5}
                        marginPagesDisplayed={1}
                        onPageChange={({ selected }) => onPageChange(selected)}
                        forcePage={currentPage - 1}
                        containerClassName={css.pagination}
                        activeClassName={css.active}
                        nextLabel="→"
                        previousLabel="←"
            />
        </div>
    )
}