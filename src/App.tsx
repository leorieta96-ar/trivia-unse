import React, { useState } from "react";
import NickForm from "./components/NickForm";
import Trivia from "./components/Trivia";
import {
  Box,
  Container,
  Grid2 as Grid,
  keyframes,
  Typography,
} from "@mui/material";
import servicePlayers from "./services/players";
import serviceQuestions from "./services/questions";
import Ranking from "./components/Ranking";

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
  const [nick, setNick] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [questions, setQuestions] = useState([]);
  const [showTrivia, setShowTrivia] = useState<boolean>(false);
  const [ranking, setRanking] = useState([]);
  const [showRankinkg, setShowRankinkg] = useState<boolean>(false);

  const handleNickSubmit = async ({
    name,
    dni,
  }: {
    name: string;
    dni: string;
  }) => {
    setNick(name);
    const id = await servicePlayers.create({name, dni});
    setId(id);
    await getQuestions();
  };

  const getQuestions = async () => {
    const arrayQuestions = await serviceQuestions.get();
    setQuestions(arrayQuestions);
    setShowTrivia(true);
  };

  const handleTrivia = async ({
    id,
    time_played,
    correct_answers,
  }: {
    id: string;
    time_played: string;
    correct_answers: number;
  }) => {
    await servicePlayers.putScore(id, {
      correct_answers,
      time_played,
    });
    setRanking(await servicePlayers.getRanking());
    setShowRankinkg(true);
  };

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
        {showRankinkg ? (
          <Ranking ranking={ranking} highlightId={id} />
        ) : !showTrivia ? (
          <NickForm onSubmit={handleNickSubmit} />
        ) : (
          <Trivia
            id={id}
            nick={nick}
            questions={questions}
            handleTivia={handleTrivia}
          />
        )}
      </Container>
    </Container>
  );
}

export default App;
