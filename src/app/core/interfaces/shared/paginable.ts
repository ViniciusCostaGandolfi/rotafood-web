export interface Paginable<T> {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
    data: T[];
    previousPage?: number;
    nextPage?: number 
}
