export const numberWithCommas = (x: number, decimals?: number) => {
  return x.toFixed(decimals || 0).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const addAlpha = (color: string, opacity: number) => {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
};
