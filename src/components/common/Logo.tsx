import type { FC } from 'react'

interface LogoProps {
  variant?: 'dark' | 'light'
}

const Logo: FC<LogoProps> = ({ variant = 'dark' }) => {
  const textColor = variant === 'dark' ? 'text-primary' : 'text-white'

  return (
    <div className="flex items-center">
      <div className="bg-primary mr-2 flex h-10 w-10 items-center justify-center rounded-full">
        <span className="text-xl font-bold text-white">VF</span>
      </div>
      <div className={`text-xl font-bold ${textColor}`}>VietFood</div>
    </div>
  )
}

export default Logo
