
import {
  Avatar,
  AvatarImage,
} from "../ui/avatar"

const UserAvatar = ({ user }) => {
  // Extract first letters of first and last name for fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };
  console.log("User Avatar Details ",user);
  const userImage = user?.picture
  console.log("User Image Details ",userImage)

  return (
      <Avatar>
        {userImage!==null ? (
            <AvatarImage
                src={userImage}
                alt={user.username || 'User'}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
            />
        ) : getInitials(user.username)}
        
      </Avatar>
  );
}

export default UserAvatar
