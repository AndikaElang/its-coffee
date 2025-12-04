'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { BaseAPIResponse } from '@/types/api';
import { UseMutationResult } from '@tanstack/react-query';
import { CheckCircle, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

interface DeleteConfirmationModalProps<T> {
  isOpen: boolean;
  onClose: () => void;
  onDeleteMutation: UseMutationResult<BaseAPIResponse<T>, Error, void, unknown>;
  itemName: string;
}

export function DeleteConfirmationModal<T>({
  isOpen,
  onClose,
  onDeleteMutation,
  itemName,
}: DeleteConfirmationModalProps<T>) {
  const [confirmationCode, setConfirmationCode] = useState('');
  const [userInput, setUserInput] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  // Generate a random confirmation code when the modal opens
  useEffect(() => {
    if (isOpen) {
      const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
      setConfirmationCode(randomCode);
      setUserInput('');
      setStatus('idle');
      setMessage('');
    }
  }, [isOpen]);

  const handleDelete = async () => {
    if (userInput !== confirmationCode) {
      setMessage("The confirmation code doesn't match. Please try again.");
      return;
    }

    try {
      setStatus('loading');
      setIsDeleting(true);
      const data = await onDeleteMutation.mutateAsync();
      if (data.status === 200) {
        setStatus('success');
        // Close the modal after showing success message
        setTimeout(() => {
          onClose();
          setIsDeleting(false);
          setStatus('idle');
        }, 1000);
      } else {
        console.error('Error deleting item:', data);
        setStatus('error');
        setMessage(data.message || 'An unexpected error occurred');
        setIsDeleting(false);
      }
    } catch (error: Error | any) {
      if (error.response?.status !== 405) {
        console.error('Error deleting item:', error);
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      }
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !isDeleting && !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete {itemName}</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the {itemName.toLowerCase()}.
          </DialogDescription>
        </DialogHeader>

        {status === 'success' ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <CheckCircle className="h-16 w-16 text-green-500" />
            <p className="text-center font-medium">Successfully deleted!</p>
            <p className="text-center text-sm text-muted-foreground">{message}</p>
          </div>
        ) : status === 'error' ? (
          <div className="flex flex-col items-center justify-center py-4 space-y-2">
            <XCircle className="h-16 w-16 text-destructive" />
            <p className="text-center font-medium">Error deleting item</p>
            <p className="text-center text-sm text-muted-foreground">{message}</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 py-2">
              <div className="space-y-2">
                <p className="text-sm">To confirm deletion, please type the following code:</p>
                <div className="bg-muted p-2 rounded-md text-center font-mono font-medium tracking-wider">
                  {confirmationCode}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmation-input">Confirmation code</Label>
                <Input
                  id="confirmation-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Enter the code above"
                  className={message ? 'border-destructive' : ''}
                />
                {message && !isDeleting && <p className="text-xs text-destructive">{message}</p>}
              </div>
            </div>
            <DialogFooter className="sm:justify-between">
              <Button type="button" className="cursor-pointer" variant="ghost" onClick={onClose} disabled={isDeleting}>
                Cancel
              </Button>
              <Button
                type="button"
                className="cursor-pointer"
                variant="destructive"
                onClick={handleDelete}
                disabled={isDeleting || !userInput}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete'
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
