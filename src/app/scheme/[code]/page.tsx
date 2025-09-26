"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Divider,
  Chip,
  Box,
  Skeleton,
} from "@mui/material";
import NavChart from "@/components/NavChart";
import ReturnsTable from "@/components/ReturnsTable";
import SIPCalculator from "@/components/SIPCalculator";

export default function SchemeDetailPage() {
  const { code } = useParams();
  const [scheme, setScheme] = useState<any | null>(null);

  useEffect(() => {
    if (code) {
      fetch(`/api/scheme/${code}`)
        .then((res) => res.json())
        .then((data) => setScheme(data));
    }
  }, [code]);

  if (!scheme) {
    return (
      <Container sx={{ mt: 6 }}>
        <Skeleton variant="rectangular" height={60} sx={{ mb: 3 }} />
        <Skeleton variant="rectangular" height={300} />
      </Container>
    );
  }

  const { meta, navHistory } = scheme;

  return (
    <Container sx={{ mt: 4, mb: 6 }}>
      {/* Header section */}
      <Card elevation={2} sx={{ mb: 3, borderRadius: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight={600}>
            {meta.schemeName}
          </Typography>
          <Box sx={{ mt: 1, display: "flex", gap: 1, flexWrap: "wrap" }}>
            <Chip label={meta.fundHouse} color="primary" size="small" />
            <Chip label={meta.category} color="secondary" size="small" />
            {meta.isinDivPayout && (
              <Chip
                label={`ISIN: ${meta.isinDivPayout}`}
                variant="outlined"
                size="small"
              />
            )}
          </Box>
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* NAV Chart */}
        <Grid item xs={12} md={8}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                NAV History (1 Year)
              </Typography>
              <NavChart data={navHistory.slice(0, 365).reverse()} />
            </CardContent>
          </Card>
        </Grid>

        {/* Returns Table */}
        <Grid item xs={12} md={4}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Returns
              </Typography>
              <ReturnsTable code={meta.schemeCode} />
            </CardContent>
          </Card>
        </Grid>

        {/* SIP Calculator */}
        <Grid item xs={12}>
          <Card sx={{ borderRadius: 3, p: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SIP Calculator
              </Typography>
              <SIPCalculator code={meta.schemeCode} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}
