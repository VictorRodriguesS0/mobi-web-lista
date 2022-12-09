import {MaskService} from "tp-react-web-masked-text";

export const moneyStringMask = (value) => {
  const floatValue = parseFloat(value).toFixed(2);
  return MaskService.toMask(
    'money',
    floatValue,
    {
      unit: 'R$ ',
      separator: ',',
      delimiter: '.',
    },
  );
};

export const sliceStringBiggerThan = (text, size) => {
  if (!text || typeof text !== 'string') {
    return null;
  }

  return text.length > size ? `${text.slice(0, size - 3)}...` : text;
};
