import { cn } from '@/lib/utils'
import { cva, VariantProps } from 'class-variance-authority'
import { Loader2 } from 'lucide-react'
import { ButtonHTMLAttributes, FC } from 'react'

export const buttonVariants = cva(
  'active:tw-scale-95 tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-transition-color focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-slate-400 focus:tw-ring-offset-2 disabled:tw-opacity-50 disabled:tw-pointer-events-none',
  {
    variants: {
      variant: {
        default: 'tw-bg-slate-900 tw-text-white hover:tw-bg-slate-800',
        ghost: 'tw-bg-transparent hover:tw-text-slate-900 hover:tw-bg-slate-200',
      },
      size: {
        default: 'tw-h-10 tw-py-2 tw-px-4',
        sm: 'tw-h-9 tw-px-2',
        lg: 'tw-h-11 tw-px-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button: FC<ButtonProps> = ({
  className,
  children,
  variant,
  isLoading,
  size,
  ...props
}) => {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={isLoading}
      {...props}>
      {isLoading ? <Loader2 className='tw-mr-2 tw-h-4 tw-w-4 tw-animate-spin' /> : null}
      {children}
    </button>
  )
}

export default Button