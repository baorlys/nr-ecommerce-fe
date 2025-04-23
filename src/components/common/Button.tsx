import type { FC, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'cta' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
}

const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  ...props
}) => {
  const baseClasses =
    'rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'

  const variantClasses = {
    primary: 'bg-primary hover:bg-red-700 text-white focus:ring-primary',
    secondary: 'bg-yellow hover:bg-yellow-600 text-textColor focus:ring-yellow',
    cta: 'bg-orange hover:bg-orange-700 text-white focus:ring-orange',
    outline: 'border border-primary text-primary hover:bg-primary/10 focus:ring-primary',
  }

  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4 text-base',
    lg: 'py-3 px-6 text-lg',
  }

  const widthClass = fullWidth ? 'w-full' : ''

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  )
}

export default Button
