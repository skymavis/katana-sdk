const ELLIPSIS = '…';
const MORE_CHAR_NUM = 3;

const truncate = (value: string, prefixChar = 6, suffixChar = 6) => {
  if (value && value.length > prefixChar + suffixChar + MORE_CHAR_NUM) {
    const prefix = value.substring(0, prefixChar);
    const suffix = value.substring(value.length - suffixChar);
    return `${prefix}${ELLIPSIS}${suffix}`;
  } else {
    return value;
  }
};

export const truncateAddress = (address: string, prefixChar = 6, suffixChar = 4) => {
  return truncate(address, prefixChar, suffixChar);
};
