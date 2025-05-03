/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from 'react-hook-form';

export interface SelectPropsInterface {
  name: string;
  control: Control<any>;
  options: { value: string; label: string }[];
  label?: string;
}
