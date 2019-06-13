export function getInitials(user) {
  let name = user.displayName || user.username;
  let splittedName = name.split(' ');

  if (splittedName.length >= 2) {
    let firstPart = name.split(' ')[0].substring(0, 1);
    let lastPart = name.split(' ')[splittedName.length - 1].substring(0, 1);

    return firstPart + lastPart;
  }

  return name.substring(0, 2).toUpperCase();
}
