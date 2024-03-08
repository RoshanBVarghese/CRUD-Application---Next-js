// pages/country/[alpha3Code].js
import { useRouter } from 'next/router';
import countriesData from '../../public/countries.json';

const CountryDetail = ({ country }) => {
  const router = useRouter();
  const { alpha3Code } = router.query;

  if (!country) {
    return <div>Country not found</div>;
  }

  return (
    <div>
      <h1>{country.name}</h1>
      <p>Alpha3Code: {alpha3Code}</p>
      <p>Phone Code: {country.phone_code}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export async function getStaticPaths() {
  const paths = countriesData.map((country) => ({
    params: { alpha3Code: country.alpha3Code },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const country = countriesData.find((c) => c.alpha3Code === params.alpha3Code);

  return { props: { country } };
}

export default CountryDetail;
