import * as React from "react";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import useCountDown from '../src/hooks/useCountdown';

const Countdown: React.FC<{ end: Date }> = ({ end }) => {
  const {
    time: { days, hours, minutes, seconds },
  } = useCountDown({
    end,
  });

  const items = [days, hours, minutes, seconds];

  return (
    <Paper variant="elevation" sx={{ padding: 3, marginTop: 2 }}>
      <Typography variant="h5" component="span">
        {items.map((item, index) => (
          <span key={index}>
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold" }}
              component="span"
              color="primary"
            >
              {item}
            </Typography>
            {index !== items.length - 1 && " : "}
          </span>
        ))}
      </Typography>
    </Paper>
  );
};

export default Countdown;
