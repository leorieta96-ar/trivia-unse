import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

interface NickFormProps {
  onSubmit: (name: string) => void;
}

const NickForm: React.FC<NickFormProps> = ({ onSubmit }) => {
  const [nickInput, setNickInput] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (nickInput.trim()) {
      onSubmit(nickInput);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <TextField
        label="Ingresa tu Nick"
        variant="outlined"
        fullWidth
        value={nickInput}
        onChange={(e) => setNickInput(e.target.value)}
        margin="normal"
        sx={{ fontSize: 40 }}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        size="large"
        sx={{ fontSize: 20, fontWeight: "bold" }}
      >
        Comenzar Trivia
      </Button>
    </Box>
  );
};

export default NickForm;
