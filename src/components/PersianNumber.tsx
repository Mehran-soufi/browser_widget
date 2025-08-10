const toPersianDigits = (input: string | number): string => {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return input
    .toString()
    .replace(/\d/g, (digit) => persianDigits[parseInt(digit)]);
};

const PersianNumber = ({ number }: { number: number | string }) => {
  const rounded = Math.round(Number(number)); 
  return (
    <span >
      {toPersianDigits(rounded)}
    </span>
  );
};

export default PersianNumber;
