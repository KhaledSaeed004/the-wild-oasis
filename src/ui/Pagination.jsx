import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";

const StyledPagination = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const P = styled.p`
    font-size: 1.4rem;
    margin-left: 0.8rem;

    & span {
        font-weight: 600;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 0.6rem;
`;

const PaginationButton = styled.button`
    background-color: ${(props) =>
        props.active ? " var(--color-brand-600)" : "var(--color-grey-50)"};
    color: ${(props) => (props.active ? " var(--color-brand-50)" : "inherit")};
    border: none;
    border-radius: var(--border-radius-sm);
    font-weight: 500;
    font-size: 1.4rem;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 0.6rem 1.2rem;
    transition: all 0.3s;

    &:has(span:last-child) {
        padding-left: 0.4rem;
    }

    &:has(span:first-child) {
        padding-right: 0.4rem;
    }

    & svg {
        height: 1.8rem;
        width: 1.8rem;
    }

    &:disabled {
        background-color: var(--color-grey-200);
        color: var(--color-grey-400);
    }

    &:hover:not(:disabled) {
        background-color: var(--color-brand-600);
        color: var(--color-brand-50);
    }
`;

function Pagination({ itemsCount, step }) {
    const [searchParams, setSearchParams] = useSearchParams();

    const currentPage = Number(searchParams.get("page")) || 1;

    const pagesCount = Math.ceil(itemsCount / step);

    const handleNextPage = () => {
        const nextPage =
            currentPage === pagesCount ? currentPage : currentPage + 1;

        searchParams.set("page", nextPage);
        setSearchParams(searchParams);
    };

    const handlePrevPage = () => {
        const prevPage = currentPage === 1 ? 1 : currentPage - 1;

        searchParams.set("page", prevPage);
        setSearchParams(searchParams);
    };

    if (pagesCount <= 1) return null;

    return (
        <StyledPagination>
            <P>
                Showing <span>{(currentPage - 1) * step + 1}</span> to{" "}
                <span>
                    {currentPage === pagesCount
                        ? itemsCount
                        : currentPage * step}
                </span>{" "}
                of <span>{itemsCount}</span> results
            </P>

            <Buttons>
                <PaginationButton
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                >
                    <HiChevronLeft />
                    <span>Previous</span>
                </PaginationButton>
                <PaginationButton
                    onClick={handleNextPage}
                    disabled={currentPage === pagesCount}
                >
                    <span>Next</span>
                    <HiChevronRight />
                </PaginationButton>
            </Buttons>
        </StyledPagination>
    );
}

export default Pagination;
