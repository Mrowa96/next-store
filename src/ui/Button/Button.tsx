import { type ButtonHTMLAttributes, type ForwardedRef, forwardRef } from 'react';

import { clsx } from 'clsx';

import styles from './Button.module.css';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  shape?: 'normal' | 'round';
  variant?: 'primary' | 'secondary' | 'critical';
};

export function BaseButton(
  { children, className, variant = 'primary', shape = 'normal', type = 'button', ...props }: Props,
  ref: ForwardedRef<HTMLButtonElement>,
) {
  return (
    <button
      {...props}
      ref={ref}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={clsx(
        styles.Button,
        variant === 'primary' && styles.VariantPrimary,
        variant === 'secondary' && styles.VariantSecondary,
        variant === 'critical' && styles.VariantCritical,
        shape === 'normal' && styles.ShapeNormal,
        shape === 'round' && styles.ShapeRound,
        className,
      )}
    >
      {children}
    </button>
  );
}

/**
 * Styled button with few variants.
 * `type` property behaves differently from native one - by default it will have value `button` instead of `submit`.
 */
export const Button = forwardRef(BaseButton);
