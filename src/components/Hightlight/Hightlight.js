import { Grid } from "@material-ui/core";
import HigthlightCard from "./HigthlightCard";

export default function Hightlight({ report }) {
  const data = report && report.length ? report[report.length - 1] : [];
  const summary = [
    {
      title: "Số ca nhiễm",
      data: data.Confirmed,
      type: "confirmed",
    },
    {
      title: "Số ca khỏi",
      data: data.Active,
      type: "recovered",
    },
    {
      title: "Số ca tử vong",
      data: data.Deaths,
      type: "death",
    },
  ];

  return (
    <Grid container spacing={3}>
      {summary.map((item, index) => (
        <Grid key={index} item sm={4} xs={12}>
          <HigthlightCard
            title={item.title}
            count={item.data}
            type={item.type}
          />
        </Grid>
      ))}
    </Grid>
  );
}
