import ReactCountryFlag from "react-country-flag";

export const countryToCode = {
  "South Korea": "KR",
  Japan: "JP",
  Thailand: "TH",
  Vietnam: "VN",
  Singapore: "SG",
  Malaysia: "MY",
  Indonesia: "ID",
  Philippines: "PH",
  "Hong Kong": "HK",
  Taiwan: "TW",
  Australia: "AU",
  "New Zealand": "NZ",
  "United States": "US",
  Canada: "CA",
  "United Kingdom": "GB",
  France: "FR",
  Italy: "IT",
  Spain: "ES",
  Germany: "DE",
  Switzerland: "CH",
  Netherlands: "NL",
  Greece: "GR",
  Turkey: "TR",
  Egypt: "EG",
  Morocco: "MA",
  Dubai: "AE",
  Maldives: "MV",
  India: "IN",
  Nepal: "NP",
  Cambodia: "KH",
  Laos: "LA",
  Myanmar: "MM",
  China: "CN",
  Mongolia: "MN",
  Brazil: "BR",
  Mexico: "MX",
  Peru: "PE",
  Argentina: "AR",
  Croatia: "HR",
  Portugal: "PT",
  Iceland: "IS",
};

export const getCountryCode = (countryName) => {
  return countryToCode[countryName] || "UN";
};

export const CountryFlag = ({ countryName }) => {
  return (
    <div className="flex items-center justify-center gap-2">
      <ReactCountryFlag
        countryCode={getCountryCode(countryName)}
        svg
        style={{
          width: "1.5em",
          height: "1.5em",
        }}
      />
      <span>{countryName}</span>
    </div>
  );
};

export default CountryFlag;
