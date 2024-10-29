import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const CustomPagination = ({
  page,
  handleNext,
  handlePrevious,
}: {
  page: number;
  handleNext: () => void;
  handlePrevious: () => void;
}) => (
  <Pagination className="mt-8">
    <PaginationContent>
      <PaginationItem>
        <PaginationPrevious onClick={handlePrevious} />
      </PaginationItem>
      <PaginationItem>
        <PaginationLink>{page}</PaginationLink>
      </PaginationItem>
      <PaginationItem>
        <PaginationEllipsis />
      </PaginationItem>
      <PaginationItem>
        <PaginationNext onClick={handleNext} />
      </PaginationItem>
    </PaginationContent>
  </Pagination>
);
