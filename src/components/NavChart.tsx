// components/NavChart.tsx
"use client";

import {
  LineChart,
  lineElementClasses,
  markElementClasses,
} from "@mui/x-charts/LineChart";
import { Card, CardContent, Typography, Box } from "@mui/material";

export default function NavChart({
  data,
}: {
  data: { date: string; nav: number }[];
}) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        p: 2,
      }}
    >
      {/* Chart Title */}
      <Typography variant="h6" fontWeight="600" mb={2}>
        NAV Trend
      </Typography>

      <Box sx={{ width: "100%", height: 320 }}>
        <LineChart
          xAxis={[
            {
              data: data.map((d) => d.date),
              scaleType: "point",
              label: "Date",
              tickLabelStyle: { fontSize: 12 },
            },
          ]}
          series={[
            {
              data: data.map((d) => d.nav),
              label: "NAV (₹)",
              color: "#1976d2",
              area: true, // adds smooth shaded area
            },
          ]}
          height={300}
          sx={{
            [`.${lineElementClasses.root}`]: {
              strokeWidth: 2,
            },
            [`.${markElementClasses.root}`]: {
              display: "none",
            },
          }}
        />
      </Box>
    </Card>
  );
}
