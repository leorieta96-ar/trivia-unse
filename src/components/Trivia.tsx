import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  Typography,
  CircularProgress,
  Grid2,
} from "@mui/material";
import "./Trivia.css";

interface Answer {
  id: number;
  answer: string;
  question_id: number;
  correct: number;
}

interface Question {
  id: number;
  question: string;
  category: string | null;
  answers: Answer[];
}

interface TriviaProps {
  id: string;
  nick: string;
  questions: Question[];
  handleTivia: Function;
}

const Trivia: React.FC<TriviaProps> = ({
  id,
  nick,
  questions,
  handleTivia,
}) => {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<Answer | null>(null);
  const [score, setScore] = useState<number>(0);
  const [answered, setAnswered] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number>(0);

  useEffect(() => {
    if (answered) {
      // Muestra el loader durante 10 segundos
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        setSelectedOption(null);
        setAnswered(false);
        setCurrentQuestion(currentQuestion + 1);
      }, 1000); // 10 segundos

      return () => clearTimeout(timer); // Limpia el timeout cuando el componente se desmonta o cuando cambia el estado
    }
  }, [answered, currentQuestion]);

  // Guarda el tiempo de inicio cuando el componente se renderiza
  useEffect(() => {
    const start = Date.now();
    setStartTime(start);
  }, []);

  const msToTime = (duration: number): string => {
    const seconds = Math.floor((duration / 1000) % 60);
    const minutes = Math.floor((duration / (1000 * 60)) % 60);
    const hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

    const format = (num: number) => (num < 10 ? "0" + num : num);

    return `${format(hours)}:${format(minutes)}:${format(seconds)}`;
  };

  const handleOptionClick = async (option: Answer) => {
    if (!answered) {
      setSelectedOption(option);
      setAnswered(true);
      if (option.correct) {
        setScore(score + 1);
      }
    }
    if (currentQuestion === questions.length - 1) {
      const endTime = Date.now();
      const timeDiff = endTime - startTime;
      handleTivia({
        id,
        time_played: msToTime(timeDiff),
        correct_answers: score,
      });
    }
  };

  return currentQuestion < questions.length ? (
    <Box alignItems="center">
      <Typography
        variant={"h4"}
        textAlign="center"
        color="antiquewhite"
        gutterBottom
        fontSize={{ xs: "1.5rem", lg: "2.125rem" }}
      >
        Pregunta {currentQuestion + 1}: {questions[currentQuestion].question}
      </Typography>
      <Grid2 container spacing={2}>
        {questions[currentQuestion].answers.map((option) => (
          <Grid2 key={option.id} size={12}>
            <Button
              variant={answered ? "contained" : "outlined"}
              onClick={() => handleOptionClick(option)}
              fullWidth
              size="large"
              className={!answered ? "pulse-button" : ""}
              disabled={answered}
              style={{
                backgroundColor:
                  answered && option.correct
                    ? "green"
                    : answered && option === selectedOption
                    ? "red"
                    : undefined,
                color: answered ? "white" : "primary",
                margin: "5px",
                fontSize: 20,
              }}
            >
              {option.answer}
            </Button>
          </Grid2>
        ))}
      </Grid2>
      {answered && loading && (
        <Box mt={2} display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
    </Box>
  ) : (
    <Box>
      <Typography variant="h5">¡Trivia completada, {nick}!</Typography>
      <Typography variant="h6">
        Puntaje: {score} de {questions.length}
      </Typography>
    </Box>
  );
};

export default Trivia;
