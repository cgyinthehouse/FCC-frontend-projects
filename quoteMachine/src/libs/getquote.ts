export const getQuote = async () => {
  const response = await fetch("https://api.quotable.io/quotes/random");
  const data = await response.json();
  return data
};

