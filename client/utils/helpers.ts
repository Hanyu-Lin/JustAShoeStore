export const getDiscountedPricePercentage = (
  originalPrice: number,
  discountedPrice: number
) => {
  const discount = originalPrice - discountedPrice;

  const discountPercentage = (discount / originalPrice) * 100;

  return discountPercentage.toFixed(2);
};

export const capital = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};
