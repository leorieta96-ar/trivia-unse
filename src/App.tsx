import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Grid2 as Grid,
  keyframes,
  Typography,
} from "@mui/material";
import HomePage from "./components/HomePage";
import RankingPage from "./components/RankingPage";
import { Route, Routes } from "react-router-dom";

const pulseAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

function App() {
  const [showTrivia, setShowTrivia] = useState<boolean>(false);

  return (
    <Container
      maxWidth="lg"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Grid
        container
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Grid size={6}>
          <Box
            component="img"
            src="/CTI.png"
            alt="Logo Izquierdo"
            sx={{
              height: { xs: 50, sm: 50, md: 50, lg: 100 },
              width: "auto",
            }}
          />
        </Grid>
        <Grid size={6} display="flex" justifyContent="flex-end">
          <Box
            component="img"
            src="/GICM.jpeg"
            alt="Logo Derecho"
            sx={{
              height: { xs: 50, lg: 115 },
              width: "auto",
            }}
          />
        </Grid>
      </Grid>
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        fontSize={{ xs: !showTrivia ? "5rem" : "3rem", md: "6rem" }}
        fontFamily="Honk"
        lineHeight="70px"
        sx={{
          animation: !showTrivia ? `${pulseAnimation} 2s infinite` : "none",
        }}
      >
        Trivia
        <br />
        Jornadas CTI UNSE
      </Typography>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<HomePage setTrivia={setShowTrivia}/>} />
          <Route path="/ranking" element={<RankingPage />} />
        </Routes>
      </Container>
    </Container>
  );
}

export default App;
