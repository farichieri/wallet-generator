'use client';

import { cn } from '@/lib/utils';

interface Props {
  steps: { title: string }[];
  step: number;
}

export const Steps = ({ steps, step }: Props) => {
  return (
    <div className='flex h-24 w-full items-center justify-center bg-muted/40 backdrop-blur-sm'>
      <div className='grid grid-cols-3 max-w-sm'>
        {steps.map((s, i) => (
          <div key={i} className='flex flex-col text-center items-center gap-2'>
            <div
              key={i}
              className='flex flex-col text-center items-center gap-2'
            >
              <div
                className={cn(
                  'flex h-5 w-5 items-center justify-center rounded-full bg-primary p-1 text-[10px]',
                  {
                    'bg-primary text-primary-foreground': i + 1 <= step,
                    'bg-muted-foreground/50 text-foreground': i + 1 > step,
                  }
                )}
              >
                {i + 1}
              </div>
            </div>
            <div
              className={cn('text-xs', {
                'text-primary-foreground': i + 1 <= step,
                'text-muted-foreground': i + 1 > step,
              })}
            >
              {s.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
