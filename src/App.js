import { useEffect, useState } from "react";
import { getCountries, getReportByCountry } from "./apis/getCountries";
import CountrySelector from "./components/CountrySelector/CountrySelector";
import Hightlight from "./components/Hightlight/Hightlight";
import Summary from "./components/Summary/Summary";
import { sortBy } from "lodash";
import "@fontsource/roboto";
import { Container, Typography } from "@material-ui/core";
import moment from "moment";
import "moment/locale/vi";

moment.locale("vi");

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryId, setSelectedCountryId] = useState("");
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries().then((res) => {
      const countries = sortBy(res.data, "Country");
      setCountries(countries);
      setSelectedCountryId("vn");
    });
  }, []);

  const handleChange = (e) => {
    setSelectedCountryId(e.target.value);
  };
  useEffect(() => {
    if (selectedCountryId) {
      const { Slug } = countries.find(
        (country) => country.ISO2.toLowerCase() === selectedCountryId
      );
      getReportByCountry(Slug).then((res) => {
        res.data.pop();
        setReport(res.data);
      });
    }
  }, [countries, selectedCountryId]);
  return (
    <Container style={{ marginTop: 20 }}>
      <Typography variant="h2" component="h2">
        Số liệu COVID-19
      </Typography>
      <Typography>{moment().format("LLL")}</Typography>
      <CountrySelector
        countries={countries}
        handleChange={handleChange}
        value={selectedCountryId}
      />
      <Hightlight report={report} />
      <Summary report={report} selectedCountryId={selectedCountryId} />
    </Container>
  );
}

export default App;
