import { SortDirectionEnum } from '@/app/shared/types/enums/sort-direction.enum';

export type SortType<TKeys> = (key: TKeys, value?: SortDirectionEnum) => void;
