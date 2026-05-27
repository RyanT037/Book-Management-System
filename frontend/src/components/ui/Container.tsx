import type { HTMLAttributes, ReactNode } from 'react';
import { classNameHelper } from '../../lib/classNameHelper';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'default' | 'narrow' | 'wide';
}

const sizeClasses = {
  default: 'max-w-7xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-[90rem]',
};

export function Container({
  children,
  size = 'default',
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={classNameHelper('mx-auto w-full px-4 sm:px-6 lg:px-8', sizeClasses[size], className)}
      {...props}
    >
      {children}
    </div>
  );
}
