export type UseCrudType<T> = {
  data: T | undefined;
  isLoading: boolean;
  create: (newData: Partial<T>) => Promise<T>;
  update: (updatedData: Partial<T>, updateId?: number) => Promise<T>;
  patch: (patchedData: Partial<T>, patchID?: number) => Promise<T>;
  remove: (removedId: number, removedData?: Partial<T>) => Promise<void>;
  loading: boolean;
};
