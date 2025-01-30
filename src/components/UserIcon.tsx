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

const getIdenticon = (email: string) => {
  const hash = MD5(email.trim().toLowerCase()).toString()
  const identicon = new Identicon(hash, 64).toString()
  return `data:image/png;base64,${identicon}`
}

const UserIcon: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Popover>
      <PopoverTrigger>
        <Avatar>
          <AvatarImage src={getIdenticon(user.email)} alt={user.username} />
          <AvatarFallback>
            {user.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="p-4">
        <p className="font-semibold">{user.username}</p>
        <MailLink email={user.email}></MailLink>
      </PopoverContent>
    </Popover>
  )
}

export default UserIcon
