
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar"

const UserAvatar =() => {
  return (
    <Avatar>
      <AvatarImage src="https://ui.shadcn.com/avatars/03.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  )
}

export default UserAvatar
