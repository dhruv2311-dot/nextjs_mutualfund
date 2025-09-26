// components/SIPCalculator.tsx
"use client";

import { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Stack,
  Grid,
  Card,
  CardContent,
  Paper,
} from "@mui/material";
import { formatCurrency, formatPercent } from "@/lib/utils";

export default function SIPCalculator({ code }: { code: string }) {
  const [amount, setAmount] = useState(5000);
  const [from, setFrom] = useState("2020-01-01");
  const [to, setTo] = useState("2023-12-31");
  const [result, setResult] = useState<any>(null);

  const handleCalculate = async () => {
    const res = await fetch(`/api/scheme/${code}/sip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, frequency: "monthly", from, to }),
    });
    const data = await res.json();
    setResult(data);
  };

  return (
    <Card sx={{ borderRadius: 3, boxShadow: 2 }}>
      <CardContent>
        <Typography variant="h6" fontWeight="600" gutterBottom>
          SIP Calculator
        </Typography>

        {/* Input Fields */}
        <Grid container spacing={2} mb={2}>
          <Grid item xs={12} sm={4}>
            <TextField
              label="SIP Amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value))}
              fullWidth
              helperText="Enter monthly SIP (₹500+)"
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="From"
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <TextField
              label="To"
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
        </Grid>

        {/* Button */}
        <Button
          variant="contained"
          color="primary"
          onClick={handleCalculate}
          sx={{ borderRadius: 2, px: 3 }}
        >
          Calculate Returns
        </Button>

        {/* Results */}
        {result && (
          <Paper
            sx={{
              mt: 3,
              p: 2,
              borderRadius: 2,
              bgcolor: "grey.50",
            }}
          >
            <Stack spacing={1}>
              <Typography>
                <strong>Total Invested:</strong> {formatCurrency(result.totalInvested)}
              </Typography>
              <Typography>
                <strong>Current Value:</strong> {formatCurrency(result.currentValue)}
              </Typography>
              <Typography color={result.absoluteReturn >= 0 ? "success.main" : "error.main"}>
                <strong>Absolute Return:</strong> {formatPercent(result.absoluteReturn)}
              </Typography>
              <Typography color={result.annualizedReturn >= 0 ? "success.main" : "error.main"}>
                <strong>Annualized Return:</strong> {formatPercent(result.annualizedReturn)}
              </Typography>
            </Stack>
          </Paper>
        )}
      </CardContent>
    </Card>
  );
}
