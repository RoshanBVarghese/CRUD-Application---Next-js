"use client"
import { useState, useEffect } from 'react';

interface Country {
  id: number;
  sortname: string;
  name: string;
  phoneCode: number;
}

const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/countries.json');
        const data = await response.json();
        setCountries(data.countries);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchData();
  }, []);

  return {
    countries,
    setCountries,
  };
};

export default useCountries;
