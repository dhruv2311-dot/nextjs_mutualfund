// components/ReturnsTable.tsx
"use client";

import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Box,
} from "@mui/material";
import { formatPercent } from "@/lib/utils";

export default function ReturnsTable({ code }: { code: string }) {
  const [returns, setReturns] = useState<any[]>([]);

  useEffect(() => {
    async function fetchReturns(period: string) {
      const res = await fetch(`/api/scheme/${code}/returns?period=${period}`);
      return res.json();
    }
    Promise.all(["1m", "3m", "6m", "1y"].map(fetchReturns)).then(setReturns);
  }, [code]);

  const periods = ["1m", "3m", "6m", "1y"];

  return (
    <Card
      sx={{
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent>
        <Typography variant="h6" fontWeight="600" mb={2}>
          Returns Summary
        </Typography>

        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell align="right">Simple Return</TableCell>
              <TableCell align="right">Annualized</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {periods.map((p, i) => {
              const simple = returns[i]?.simpleReturn || 0;
              const annual = returns[i]?.annualizedReturn;

              return (
                <TableRow key={p}>
                  <TableCell>
                    <Typography fontWeight="500">{p.toUpperCase()}</Typography>
                  </TableCell>

                  {/* Simple Return with colored chip */}
                  <TableCell align="right">
                    <Chip
                      label={formatPercent(simple)}
                      size="small"
                      sx={{
                        fontWeight: "600",
                        color: simple >= 0 ? "success.dark" : "error.dark",
                        bgcolor: simple >= 0 ? "success.light" : "error.light",
                      }}
                    />
                  </TableCell>

                  {/* Annualized Return */}
                  <TableCell align="right">
                    {annual ? (
                      <Chip
                        label={formatPercent(annual)}
                        size="small"
                        sx={{
                          fontWeight: "600",
                          color: annual >= 0 ? "success.dark" : "error.dark",
                          bgcolor: annual >= 0 ? "success.light" : "error.light",
                        }}
                      />
                    ) : (
                      <Typography color="text.secondary">-</Typography>
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
