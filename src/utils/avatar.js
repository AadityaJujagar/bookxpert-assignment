export const getAvatarUrl = (firstName, lastName) =>
  `https://api.dicebear.com/9.x/initials/svg?seed=${firstName} ${lastName}`;
