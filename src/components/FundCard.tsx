// components/FundCard.tsx
"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
  Avatar,
  Chip,
  Stack,
} from "@mui/material";
import { TrendingUp as TrendingUpIcon } from "@mui/icons-material";
import Link from "next/link";

export default function FundCard({ fund }: { fund: any }) {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        transition: "all 0.3s ease",
        position: "relative",
        overflow: "hidden",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        },
      }}
    >
      {/* Decorative top strip */}
      <Box
        sx={{
          height: 6,
          background: "linear-gradient(90deg, #1976d2, #42a5f5)",
        }}
      />

      <Link href={`/scheme/${fund.schemeCode}`} passHref legacyBehavior>
        <CardActionArea
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            p: 2,
          }}
        >
          <CardContent sx={{ flex: "1 0 auto", p: 0, textAlign: "center", width: "100%" }}>
            {/* Logo / Icon */}
            <Avatar
              sx={{
                bgcolor: "primary.light",
                color: "primary.main",
                width: 52,
                height: 52,
                mb: 1.5,
                mx: "auto",
                boxShadow: 2,
              }}
            >
              <TrendingUpIcon />
            </Avatar>

            {/* Fund Name */}
            <Typography
              variant="subtitle1"
              fontWeight="600"
              component="div"
              sx={{
                lineHeight: 1.3,
                mb: 1,
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
              }}
            >
              {fund.schemeName}
            </Typography>

            {/* Fund Chips */}
            <Stack direction="row" spacing={1} justifyContent="center" sx={{ flexWrap: "wrap", mb: 1 }}>
              <Chip
                label={`Code: ${fund.schemeCode}`}
                size="small"
                sx={{ bgcolor: "grey.100", fontWeight: 500 }}
              />
              {fund.category && (
                <Chip
                  label={fund.category}
                  size="small"
                  sx={{ bgcolor: "primary.50", color: "primary.main", fontWeight: 500 }}
                />
              )}
            </Stack>

            {/* Return Badge */}
            {fund.return1y && (
              <Box
                sx={{
                  display: "inline-block",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: 2,
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  color: fund.return1y > 0 ? "success.main" : "error.main",
                  bgcolor: fund.return1y > 0 ? "success.light" : "error.light",
                  mt: 1,
                }}
              >
                {fund.return1y > 0 ? "+" : ""}
                {fund.return1y}% (1Y)
              </Box>
            )}
          </CardContent>
        </CardActionArea>
      </Link>
    </Card>
  );
}
