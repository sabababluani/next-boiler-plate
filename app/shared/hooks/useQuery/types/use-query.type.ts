import { SortDirectionEnum } from '@/app/shared/types/enums/sort-direction.enum';

export type UseQueryType = <T, TKeys = keyof T>() => {
  paginate: (limit: number, page?: number) => void;
  sort: (key: TKeys, value?: SortDirectionEnum) => void;
  search: (key: TKeys, value?: string) => void;
  filter: (key: TKeys, value?: string) => void;
};
