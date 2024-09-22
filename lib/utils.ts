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

export interface ErrorResult {
  error: string;
  data: null;
}

export interface SuccessResult<T> {
  error: false;
  data: T;
}

// Define the union type for function returns
export type FunctionReturn<T> = SuccessResult<T> | ErrorResult;

export function handleReturnError(
  error: unknown,
  defaultMessage: string,
): ErrorResult {
  let message = defaultMessage;
  if (error instanceof Error) {
    message = error.message;
  }
  console.error(error);
  return {
    error: message,
    data: null,
  };
}

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const saltAndHashPassword = (password: string) => {
  // logic to salt and hash password
  return password;
};

export const getStringFromBuffer = (buffer: ArrayBuffer) =>
  Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');

export const ResultCodes = {
  InvalidCredentials: 'INVALID_CREDENTIALS',
  InvalidSubmission: 'INVALID_SUBMISSION',
  UserAlreadyExists: 'USER_ALREADY_EXISTS',
  UnknownError: 'UNKNOWN_ERROR',
  UserCreated: 'USER_CREATED',
  UserLoggedIn: 'USER_LOGGED_IN',
} as const;

export type ResultCode = (typeof ResultCodes)[keyof typeof ResultCodes];

export const getMessageFromCode = (resultCode: string) => {
  switch (resultCode) {
    case ResultCodes.InvalidCredentials:
      return 'Invalid credentials!';
    case ResultCodes.InvalidSubmission:
      return 'Invalid submission, please try again!';
    case ResultCodes.UserAlreadyExists:
      return 'User already exists, please log in!';
    case ResultCodes.UserCreated:
      return 'User created, welcome!';
    case ResultCodes.UnknownError:
      return 'Something went wrong, please try again!';
    case ResultCodes.UserLoggedIn:
      return 'Logged in!';
  }
};

export function formatHash(hash: string) {
  if (!hash) return '';
  return `${hash.slice(0, 4)}...${hash.slice(-6)}`;
}

export const copyCode = async (link: string, message: string) => {
  try {
    await navigator.clipboard.writeText(link);
    toast.success(message);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
