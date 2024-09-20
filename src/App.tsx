import React, { useState } from "react";
import NickForm from "./components/NickForm";
import Trivia from "./components/Trivia";
import { Container, Typography } from "@mui/material";
import servicePlayers from "./services/players";
import serviceQuestions from "./services/questions";
import Ranking from "./components/Ranking";

function App() {
  const [nick, setNick] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [questions, setQuestions] = useState([]);
  const [showTrivia, setShowTrivia] = useState<boolean>(false);
  const [ranking, setRanking] = useState([]);
  const [showRankinkg, setShowRankinkg] = useState<boolean>(false);

  const handleNickSubmit = async (name: string) => {
    setNick(name);
    const id = await servicePlayers.create(name);
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
      maxWidth="md"
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h1"
        align="center"
        gutterBottom
        fontSize={{ xs: "5rem", md: "6rem" }}
      >
        Trivia App
      </Typography>
      {showRankinkg ? (
        <Ranking ranking={ranking} highlightId={id}/>
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
  );
}

export default App;
