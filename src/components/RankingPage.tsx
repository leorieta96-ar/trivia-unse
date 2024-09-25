import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import servicePlayers from "../services/players";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },

  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

interface Player {
  id: number;
  dni: string;
  name: string;
  uuid: string;
  attempts: number;
  correct_answers: number;
  time_played: string;
}

const Ranking: React.FC = () => {
  const [data, setData] = useState<Player[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response: Player[] = await servicePlayers.getRanking();
      console.log({ response });
      setData(response);
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <></>;
  return (
    <TableContainer component={Paper}>
      <Table stickyHeader aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>#</StyledTableCell>
            <StyledTableCell align="right">Nick</StyledTableCell>
            <StyledTableCell align="right">DNI</StyledTableCell>
            <StyledTableCell align="right">
              Respuestas Correctas (20)
            </StyledTableCell>
            <StyledTableCell align="right">Tiempo</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data?.map((player, index) => (
              <StyledTableRow key={player.uuid}>
                <StyledTableCell component="th" scope="row">
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell align="left">{player.name}</StyledTableCell>
                <StyledTableCell align="left">{player.dni}</StyledTableCell>
                <StyledTableCell align="center">
                  {player.correct_answers}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {player.time_played}
                </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Ranking;
