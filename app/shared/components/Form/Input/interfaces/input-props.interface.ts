/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control } from "react-hook-form";
import { InputEnum } from "../enums/input.enum";

export interface InputPropsInterface {
  name: string;
  control: Control<any>;
  type?: InputEnum;
  label?: string;
  placeholder?: string;
}
