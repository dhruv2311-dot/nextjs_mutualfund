"use client";

import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Paper,
  Box,
  AppBar,
  Toolbar,
  InputBase,
  Pagination,
  alpha,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FundCard from "@/components/FundCard";
import { Scheme } from "@/types/scheme";

export default function FundsPage() {
  const [funds, setFunds] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 50;

  useEffect(() => {
    async function fetchFunds() {
      setLoading(true);
      try {
        const res = await fetch(`/api/mf?page=${page}&limit=${limit}`);
        const data = await res.json();
        setFunds(data.funds || []);
        setTotalPages(Math.ceil((data.total || 0) / limit));
      } catch (error) {
        console.error("Error fetching funds:", error);
        setFunds([]);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    }

    fetchFunds();
  }, [page]);

  const filteredFunds = funds.filter((fund) =>
    fund.schemeName.toLowerCase().includes(search.toLowerCase())
  );

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {/* AppBar with Search */}
      <AppBar
        position="sticky"
        elevation={1}
        sx={{ background: "#fff", color: "text.primary", mb: 3 }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6" fontWeight={600}>
            Mutual Fund Explorer
          </Typography>

          <Box
            sx={{
              position: "relative",
              borderRadius: 2,
              backgroundColor: (theme) => alpha(theme.palette.grey[200], 0.8),
              "&:hover": {
                backgroundColor: (theme) =>
                  alpha(theme.palette.grey[300], 0.9),
              },
              width: { xs: "60%", sm: "40%", md: "30%" },
              px: 2,
              py: 0.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <SearchIcon color="action" sx={{ mr: 1 }} />
            <InputBase
              placeholder="Search funds…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: "100%" }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", my: 6 }}>
            <CircularProgress size={40} />
          </Box>
        ) : filteredFunds.length === 0 ? (
          <Paper
            sx={{
              p: 6,
              textAlign: "center",
              backgroundColor: "grey.50",
              borderRadius: 3,
            }}
          >
            <Typography variant="body1" color="text.secondary">
              {search
                ? "No funds match your search."
                : "No funds available at the moment."}
            </Typography>
          </Paper>
        ) : (
          <>
            <Grid container spacing={3}>
              {filteredFunds.map((fund) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={fund.schemeCode}>
                  <FundCard fund={fund} />
                </Grid>
              ))}
            </Grid>

            {/* Pagination */}
            <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                sx={{
                  "& .MuiPaginationItem-root": {
                    borderRadius: "12px",
                    px: 1.5,
                  },
                }}
              />
            </Box>
          </>
        )}
      </Container>
    </>
  );
}
