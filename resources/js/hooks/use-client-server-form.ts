import { useForm } from '@inertiajs/react';
import { FormValidateInput, useForm as useMantineForm } from '@mantine/form';

type useClientServerFormParams<T extends Record<string, any>> = {
  initialValues: T;
  validate: {
    [K in keyof T]?: (value: T[K], values: T) => string | null;
  };
};

export default function useClientServerForm<T extends Record<string, any>>({
  initialValues,
  validate,
}: useClientServerFormParams<T>) {
  const form = useMantineForm({
    initialValues,
    validate: validate as FormValidateInput<T>,
  });

  const inertiaForm = useForm({
    ...initialValues,
  });

  const setFieldValueSync = (key: string, value: any) => {
    form.setFieldValue(key, value);
    inertiaForm.setData(key as any, value);
  };

  const resetForm = () => {
    form.reset();
    inertiaForm.reset();
  };

  const getSyncedInputProps = (key: keyof T & string) => {
    const { ...defaultProp } = form.getInputProps(key);

    return {
      ...defaultProp,
      onChange: (e: any) => {
        if (e && e.target) {
          switch (e.target.type) {
            case 'checkbox':
              setFieldValueSync(key, e.target.checked);
              break;
            case 'number':
              setFieldValueSync(key, parseInt(e.target.value));
              break;
            default:
              setFieldValueSync(key, e.target.value ?? e);
              break;
          }
        } else {
          setFieldValueSync(key, e);
        }
      },
      error: form.errors[key as keyof typeof form.errors] || inertiaForm.errors[key],
    };
  };

  return { form, inertiaForm, setFieldValueSync, getSyncedInputProps, resetForm };
}
