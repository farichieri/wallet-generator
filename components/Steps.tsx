'use client';

import { cn } from '@/lib/utils';

interface Props {
  steps: { title: string }[];
  step: number;
  onSelect?: (index: number) => void;
}

const Steps = ({ steps, step, onSelect }: Props) => {
  return (
    <div className="flex h-24 w-full select-none items-center justify-center bg-muted/40 backdrop-blur-sm">
      <div
        className={cn('grid w-full max-w-sm grid-cols-3', {
          'grid-cols-4': steps.length === 4,
        })}
      >
        {steps.map((s, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center gap-2 text-center"
          >
            <div
              key={i}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div
                className={cn(
                  'relative z-10 flex h-5 w-5 cursor-default items-center justify-center rounded-full bg-primary p-1 text-[10px]',
                  {
                    'bg-primary text-primary-foreground': i + 1 <= step,
                    'bg-muted-foreground text-foreground': i + 1 > step,
                    'cursor-pointer': i + 1 < step,
                  },
                )}
                onClick={() => onSelect && onSelect(i)}
              >
                {i + 1}
              </div>
              <div
                className={cn(
                  'absolute top-2.5 w-full translate-y-[-50%] border-t border-muted',
                  {
                    'border-primary': i + 1 <= step - 1 && step !== 1,
                    '': i + 1 > step,
                    'left-1/2': i !== steps.length - 1,
                    'right-1/2': i === steps.length - 1,
                  },
                )}
              ></div>
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

export default Steps;
