import { type ClassValue, clsx } from 'clsx';
import { toast } from 'sonner';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleSubmissionError(error: unknown, defaultMessage: string) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error(error);
  toast.error(message);
}

export function handleError(error: unknown, defaultMessage: string) {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error(error);
  throw new Error(message);
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
