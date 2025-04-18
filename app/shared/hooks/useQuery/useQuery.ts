import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from 'next/navigation';
import { SortDirectionEnum } from '../../types/enums/sort-direction.enum';
import { FilterType } from './types/filter.type';
import { PaginationType } from './types/pagination.type';
import { SearchType } from './types/search.type';
import { SortType } from './types/sort.type';
import { UseQueryType } from './types/use-query.type';

export const useQuery: UseQueryType = <T, TKeys = keyof T>() => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const router: AppRouterInstance = useRouter();
  const params = new URLSearchParams(searchParams.toString());

  const updateQueryParam = (type: string, key: TKeys, value?: string): void => {
    const paramKey = `${type}[${String(key)}]`;

    if (value) {
      params.set(paramKey, value);
    } else {
      params.delete(paramKey);
    }

    router.push(`?${params.toString()}`);
  };

  const sort: SortType<TKeys> = (key, value?: SortDirectionEnum) =>
    updateQueryParam('sort', key, value);

  const search: SearchType<TKeys> = (key, value?: string) =>
    updateQueryParam('search', key, value);

  const filter: FilterType<TKeys> = (key, value?: string) =>
    updateQueryParam('filter', key, value);

  const paginate: PaginationType = (limit: number, page = 1) => {
    const offset = (page - 1) * limit;
    params.set('limit', String(limit));
    params.set('offset', String(offset));
    router.push(`?${params.toString()}`);
  };

  return { paginate, sort, search, filter };
};
