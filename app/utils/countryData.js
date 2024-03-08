// utils/countryData.js
export const getCountryData = async () => {
    const response = await fetch('/country.json');
    const data = await response.json();
    return data;
  };
  