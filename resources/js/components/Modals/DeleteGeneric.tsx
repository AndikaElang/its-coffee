'use client';

import { DeleteConfirmationModal } from '@/components/Modals/DeleteConfirm';
import { BaseAPIResponse } from '@/types/api';
import { notifications } from '@mantine/notifications';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

type props<T> = {
  data?: T;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (data: T) => void;
  onAfterDelete?: () => void;
  baseRoute: string;
  title: string;
  deleteParam: any;
  itemName: string;
};

export default function DeleteGeneric<T>({
  data,
  isOpen,
  onClose,
  onSuccess,
  onAfterDelete,
  baseRoute,
  title,
  deleteParam,
  itemName,
}: props<T>) {
  const successDo = () => {
    onSuccess && onSuccess(data!);
    onAfterDelete && onAfterDelete();
    onClose();

    notifications.show({
      title: 'Success!',
      message: `${title} permanently deleted successfully`,
    });
  };

  const mutation = useMutation<BaseAPIResponse>({
    mutationFn: async () => {
      const res = await axios.delete(route(`${baseRoute}.destroy`, deleteParam));
      return res.data;
    },
    onSuccess: () => {
      console.log(mutation);
      successDo();
    },
    onError: (error: Error | any) => {
      // ignore if bad request because of redirect
      if (error.response?.status === 405) {
        successDo();
      } else {
        console.log(error);
        notifications.show({ title: 'Failed!', message: error.message });
      }
    },
  });

  return <DeleteConfirmationModal isOpen={isOpen} onClose={onClose} itemName={itemName} onDeleteMutation={mutation} />;
}
