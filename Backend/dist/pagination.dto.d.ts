export interface PaginationResponse<T> {
    data: T[];
    pageNumber: number;
    pageSize: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
