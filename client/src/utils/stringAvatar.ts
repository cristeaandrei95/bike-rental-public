function stringToColor(string: string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

export default function stringAvatar(name: string) {
  const chunks = name.split(" ");
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: chunks.length > 1 ? `${chunks[0][0]}${chunks[1][0]}` : chunks[0][0],
  };
}
