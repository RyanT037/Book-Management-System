import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Container } from './Container';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  id?: string;
  containerSize?: 'default' | 'narrow' | 'wide';
  background?: 'default' | 'white' | 'muted' | 'gradient';
}

const backgroundClasses = {
  default: 'bg-slate-50',
  white: 'bg-white',
  muted: 'bg-slate-100/60',
  gradient: 'bg-gradient-hero',
};

export function Section({
  children,
  id,
  containerSize = 'default',
  background = 'default',
  className,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', backgroundClasses[background], className)}
      {...props}
    >
      <Container size={containerSize}>{children}</Container>
    </section>
  );
}
