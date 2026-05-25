import { forwardRef, type InputHTMLAttributes } from 'react';
import { cn } from '../../lib/cn';

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, id, ...props }, ref) => {
    const checkboxId = id ?? props.name;

    return (
      <label
        htmlFor={checkboxId}
        className="inline-flex cursor-pointer items-center gap-2.5 text-sm text-slate-600"
      >
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'h-4 w-4 rounded border-slate-300 text-brand-600',
            'focus:ring-2 focus:ring-brand-500/30 focus:ring-offset-0',
            className,
          )}
          {...props}
        />
        {label}
      </label>
    );
  },
);

Checkbox.displayName = 'Checkbox';
