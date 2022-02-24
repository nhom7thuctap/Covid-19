import { Grid } from "@material-ui/core";
import { useEffect, useState } from "react";
import HightMaps from "../Chart/HightMaps";
import LineChart from "../Chart/LineChart";

export default function Summary({ report, selectedCountryId }) {
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    if (selectedCountryId) {
      import(
        `@highcharts/map-collection/countries/${selectedCountryId}/${selectedCountryId}-all.geo.json`
      ).then((res) => setMapData(res));
    }
  }, [selectedCountryId]);
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item sm={8} xs={12}>
          <LineChart data={report} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <HightMaps mapData={mapData} />
        </Grid>
      </Grid>
    </div>
  );
}
