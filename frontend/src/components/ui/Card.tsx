import type { HTMLAttributes, ReactNode } from 'react';
import { classNameHelper } from '../../lib/classNameHelper';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  padding?: 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export function Card({
  children,
  hover = false,
  padding = 'md',
  className,
  ...props
}: CardProps) {
  return (
    <div
      className={classNameHelper(
        'rounded-2xl bg-white shadow-card',
        paddingClasses[padding],
        hover &&
          'transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
