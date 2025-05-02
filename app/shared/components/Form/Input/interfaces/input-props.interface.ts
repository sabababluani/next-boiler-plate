import { Control } from "react-hook-form";

export interface InputPropsInterface {
  name: string;
  control: Control<any>;
  type?: 'text' | 'email' | 'password' | 'number';
  label?: string;
  placeholder?: string;
}
