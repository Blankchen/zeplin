
interface PaginationProp {
  limit?: number;
  offset?: number;
}
export class Pagination {
  // default:30, maximum: 100
  limit: number;
  offset: number;

  constructor(options?: PaginationProp) {
    this.limit = options?.limit || 30;
    this.offset = options?.offset || 0;
  }

  get forHttpParams(): object {
    return {
      limit: this.limit.toString(),
      offset: this.offset.toString(),
    };
  }
}
