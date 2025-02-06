import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { User } from '@/types/user'
import Identicon from 'identicon.js'
import { MD5 } from 'crypto-js'
import MailLink from './MailLink'
import { ReactNode } from 'react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

const getIdenticon = (email: string) => {
  const hash = MD5(email.trim().toLowerCase()).toString()
  const identicon = new Identicon(hash, 64).toString()
  return `data:image/png;base64,${identicon}`
}

const UserIcon: React.FC<{ user: User; popover?: boolean }> = ({
  user,
  popover = true,
}) => {
  const renderAvatar = (user: User): ReactNode => {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Avatar>
              <AvatarImage src={getIdenticon(user.email)} alt={user.username} />
              <AvatarFallback>
                {user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </TooltipTrigger>
          <TooltipContent>
            <p>{user.username}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
  if (popover) {
    return (
      <Popover>
        <PopoverTrigger>{renderAvatar(user)}</PopoverTrigger>
        <PopoverContent className="p-4">
          <p className="font-semibold">{user.username}</p>
          <MailLink email={user.email}></MailLink>
        </PopoverContent>
      </Popover>
    )
  }
  return renderAvatar(user)
}

export default UserIcon
