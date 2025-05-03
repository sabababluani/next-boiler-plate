'use client';

import { yupResolver } from '@hookform/resolvers/yup';
import { JSX } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Input from '../shared/components/Form/Input/Input';
import { InputEnum } from '../shared/components/Form/Input/enums/input.enum';
import Select from '../shared/components/Form/Select/Select';

const schema = Yup.object({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Min 6 characters')
    .required('Password is required'),
  age: Yup.number().min(18, 'Minimum age is 18').required('Age is required'),
  gender: Yup.string().required('Gender is required'),
});

const Login = (): JSX.Element => {
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (): void => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input
        name="email"
        label="Email"
        control={control}
        type={InputEnum.EMAIL}
      />
      <Input
        name="password"
        label="Password"
        control={control}
        type={InputEnum.PASSWORD}
      />
      <Input name="age" label="Age" control={control} type={InputEnum.NUMBER} />
      <Select
        name="gender"
        label="Gender"
        control={control}
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
