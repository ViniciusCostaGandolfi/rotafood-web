export interface PaginationDto<T> {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalCount: number;
  hasPrevious: boolean;
  hasNext: boolean;
  data: T[];
  previousPageLink?: string | null;
  nextPageLink?: string | null;
}
