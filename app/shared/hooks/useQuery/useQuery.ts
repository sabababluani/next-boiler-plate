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
  const params: URLSearchParams = new URLSearchParams(searchParams.toString());

  const sort: SortType<TKeys> = (key: TKeys, value?: SortDirectionEnum) => {
    const doesKeyExistsInSearchParams: string | null = searchParams.get(
      String(key),
    );
    if (key && value && !doesKeyExistsInSearchParams) {
      params.set(`sort[${String(key)}]`, value);
    } else {
      params.delete(`sort[${String(key)}]`, value);
    }
    router.push(`?${params.toString()}`);
  };

  const search: SearchType<TKeys> = (key: TKeys, value?: string) => {
    const doesKeyExistsInSearchParams: string | null = searchParams.get(
      String(key),
    );
    if (key && value && !doesKeyExistsInSearchParams) {
      params.set(`search[${String(key)}]`, value);
    } else {
      params.delete(`search[${String(key)}]`, value);
    }
    router.push(`?${params.toString()}`);
  };

  const filter: FilterType<TKeys> = (key: TKeys, value?: string) => {
    const doesKeyExistsInSearchParams: string | null = searchParams.get(
      String(key),
    );
    if (key && value && !doesKeyExistsInSearchParams) {
      params.set(`filter[${String(key)}]`, value);
    } else {
      params.delete(`filter[${String(key)}]`, value);
    }
    router.push(`?${params.toString()}`);
  };

  const paginate: PaginationType = (limit: number, page?: number) => {
    const offSet: number = ((page ?? 1) - 1) * limit;

    params.set('limit', String(limit));
    params.set('offset', String(offSet));

    router.push(`?${params.toString()}`);
  };

  return { paginate, sort, search, filter };
};
