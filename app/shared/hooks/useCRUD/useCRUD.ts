import { useState } from 'react';
import useSWR from 'swr';
import BaseApi from '../../api/base/BaseApi';
import { UseCrudType } from './types/use-crud.type';

const fetcher = <T>(url: string): Promise<T> =>
  BaseApi.get<T>(url).then((res) => res.data);

export function useCRUD<T>(resource: string): UseCrudType<T> {
  const [loading, setLoading] = useState(false);
  const url = resource;

  const { data, error, mutate } = useSWR<T>(url, fetcher);

  const create = async (newData: Partial<T>): Promise<T> => {
    setLoading(true);
    try {
      const response = await BaseApi.post<T>(`${resource}`, newData);
      mutate();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const update = async (
    updatedData: Partial<T>,
    updateId?: number,
  ): Promise<T> => {
    setLoading(true);
    try {
      const response = await BaseApi.put<T>(`${url}/${updateId}`, updatedData);
      mutate();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const patch = async (
    patchedData: Partial<T>,
    patchId?: number,
  ): Promise<T> => {
    setLoading(true);
    try {
      const response = await BaseApi.patch<T>(`${url}/${patchId}`, patchedData);
      mutate();
      return response.data;
    } finally {
      setLoading(false);
    }
  };

  const remove = async (
    removedId: number,
    removedData?: Partial<T>,
  ): Promise<void> => {
    setLoading(true);
    try {
      await BaseApi.delete(`${resource}/${removedId}`, { data: removedData });
      mutate();
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    isLoading: !data && !error,
    create,
    update,
    patch,
    remove,
    loading,
  };
}
