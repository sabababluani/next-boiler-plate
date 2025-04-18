export interface DataInterface<T> {
  status: number;
  data: T;
  count: T extends [] ? number : never;
}
