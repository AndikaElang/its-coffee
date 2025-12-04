import useLeaveConfirmation from '@/hooks/use-leave-confirmation';
import { router } from '@inertiajs/react';
import { Button, Group, Modal, Text } from '@mantine/core';
import { useEffect, useState } from 'react';

export default function LeaveConfirmation({
  isDirty,
  setIsDirty,
  message,
  title,
  redirectUrl,
}: {
  isDirty: boolean;
  setIsDirty: (value: boolean) => void;
  message: string;
  title?: string;
  redirectUrl: string;
}) {
  const [readyToMove, setReadyToMove] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { pendingNavigation, confirmLeave, cancelLeave } = useLeaveConfirmation(isDirty, message, {
    onConfirm: () => {
      setIsDirty(false);
      setReadyToMove(true);
      setIsModalOpen(false);
    },
    onCancel: () => setIsModalOpen(false),
  });

  useEffect(() => {
    if (pendingNavigation) {
      setIsModalOpen(true);
    }
  }, [pendingNavigation]);

  useEffect(() => {
    if (readyToMove) {
      router.visit(redirectUrl); // Redirect to another page
    }
  }, [readyToMove]);

  return (
    <Modal opened={isModalOpen} onClose={cancelLeave} title={title ?? 'Confirm Navigation'} centered>
      <Text size="sm" mb="lg">
        {message}
      </Text>
      <Group justify="flex-end" mt="xl">
        <Button variant="light" onClick={cancelLeave}>
          Cancel
        </Button>
        <Button color="red" onClick={confirmLeave}>
          Leave Page
        </Button>
      </Group>
    </Modal>
  );
}
