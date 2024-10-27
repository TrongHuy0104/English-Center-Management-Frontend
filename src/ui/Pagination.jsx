import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
// import { PAGE_SIZE } from "../utils/constants";

const PAGE_SIZE = 10;

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
    props.isActive ? "var(--color-brand-600)" : "var(--color-grey-50)"};
  color: ${(props) => (props.isActive ? "var(--color-brand-50)" : "inherit")};
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

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

// function Pagination({ count }) {
//     const [searchParams, setSearchParams] = useSearchParams();
//     let currentPage = !searchParams.get("page")
//         ? 1
//         : Number(searchParams.get("page"));
//     const pageCount = Math.ceil(count / PAGE_SIZE);

//     function next() {
//         currentPage = currentPage === pageCount ? 1 : currentPage + 1;
//         searchParams.set("page", currentPage);
//         setSearchParams(searchParams);
//     }

//     function prev() {
//         currentPage = currentPage === 1 ? pageCount : currentPage - 1;
//         searchParams.set("page", currentPage);
//         setSearchParams(searchParams);
//     }

//     if (pageCount === 1) return;

//     return (
//         <StyledPagination>
//             <P>
//                 Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
//                 <span>
//                     {pageCount === currentPage
//                         ? count
//                         : currentPage * PAGE_SIZE}
//                 </span>{" "}
//                 of <span>{count}</span> results
//             </P>
//             <Buttons>
//                 <PaginationButton onClick={prev} disabled={currentPage === 1}>
//                     <HiChevronLeft />
//                     <span>Previous</span>
//                 </PaginationButton>
//                 <PaginationButton
//                     onClick={next}
//                     disabled={currentPage === pageCount}
//                 >
//                     <span>Next</span>
//                     <HiChevronRight />
//                 </PaginationButton>
//             </Buttons>
//         </StyledPagination>
//     );
// }

// export default Pagination;

function Pagination({ count, currentPage, onPageChange, total }) {
  const pageCount = count; // Tính tổng số trang dựa trên tổng sản phẩm và PAGE_SIZE

  function next() {
    if (currentPage < pageCount) {
      onPageChange(currentPage + 1); // Chuyển sang trang tiếp theo
    }
  }

  function prev() {
    if (currentPage > 1) {
      onPageChange(currentPage - 1); // Quay lại trang trước đó
    }
  }

  if (pageCount <= 1) return null; // Nếu chỉ có 1 trang, không cần hiển thị thanh phân trang

  return (
    <StyledPagination>
      <P>
        Showing <span>{(currentPage - 1) * PAGE_SIZE + 1}</span> to{" "}
        <span>
          {currentPage === pageCount
            ? total // Nếu là trang cuối cùng, hiển thị tổng sản phẩm
            : currentPage * PAGE_SIZE}{" "}
        </span>{" "}
        of <span>{total}</span> results
      </P>
      <Buttons>
        <PaginationButton onClick={prev} disabled={currentPage === 1}>
          <HiChevronLeft />
          <span>Previous</span>
        </PaginationButton>
        <PaginationButton onClick={next} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
