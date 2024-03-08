
export const getCountriesData = async () => {
    const response = await fetch('/countries.json');
    const data = await response.json();
    return data.countries;
  };