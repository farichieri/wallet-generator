'use client';

import { ErrorMessage } from '@hookform/error-message';
import * as React from 'react';
import { FieldErrors } from 'react-hook-form';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { Icons } from '../Icons';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  errors?: FieldErrors<any>;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, errors, type, ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = React.useState(false);

    const handleShowPassword = () => {
      setIsPasswordVisible(!isPasswordVisible);
    };

    return (
      <div>
        <div className="relative">
          <input
            type={
              type === 'password'
                ? isPasswordVisible
                  ? 'text'
                  : 'password'
                : type
            }
            className={cn(
              'flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
              className,
            )}
            ref={ref}
            {...props}
          />
          {type === 'password' && (
            <>
              <Button
                className="absolute right-1 top-1/2 h-8 w-8 translate-y-[-50%] cursor-pointer"
                onClick={handleShowPassword}
                size="icon"
                tabIndex={-1}
                type="button"
                variant="ghost"
              >
                {isPasswordVisible ? (
                  <Icons.eye className="h-3" />
                ) : (
                  <Icons.eyeOff className="h-3" />
                )}
              </Button>
            </>
          )}
        </div>
        {errors && props.name && (
          <ErrorMessage
            errors={errors}
            name={props.name}
            render={({ message }) => (
              <span className="text-sm text-destructive">{message}</span>
            )}
          />
        )}
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
