import type { PropsWithChildren } from 'react';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'outline';
  loading?: boolean;
}

/** Botón primario (azul marino) o outline, usado en los CTAs del onboarding. */
export function Button({
  variant = 'primary',
  loading = false,
  disabled,
  children,
  className,
  ...rest
}: PropsWithChildren<ButtonProps>) {
  const isDisabled = disabled || loading;
  const variantClass =
    variant === 'primary' ? 'bg-navy' : 'border border-navy bg-white';
  const textClass = variant === 'primary' ? 'text-white' : 'text-navy';

  return (
    <Pressable
      disabled={isDisabled}
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled }}
      className={`flex-row items-center justify-center rounded-xl px-5 py-3.5 ${variantClass} ${
        isDisabled ? 'opacity-50' : ''
      } ${className ?? ''}`}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : '#0A385C'} />
      ) : typeof children === 'string' ? (
        <Text className={`text-base font-semibold ${textClass}`}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
