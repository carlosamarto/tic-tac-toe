import "./App.css";
import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS } from "../Utils/Constants";
import { Square } from "../Components/Square";
import { Results } from "../Components/Results";
import { checkWinnerFrom, checkEndGame } from "../Utils/Board";
import { saveGameToStorage, resetGameStorage } from "../Utils/storage";

function App() {
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem("board");
		if (boardFromStorage) return JSON.parse(boardFromStorage);
		return Array(9).fill(null);
	});

	const [turn, setTurn] = useState(() => {
		const turnFromStorage = window.localStorage.getItem("turn");
		return turnFromStorage ?? TURNS.X;
	});

	// null es que no hay ganador, false es que hay un empate
	const [winner, setWinner] = useState(null);

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurn(TURNS.X);
		setWinner(null);

		resetGameStorage();
	};

	const updateBoard = (index) => {
		// no actualizamos esta posición
		// si ya tiene algo
		if (board[index] || winner) return;
		// actualizar el tablero
		const newBoard = [...board];
		newBoard[index] = turn;
		setBoard(newBoard);
		// cambiar el turno
		const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
		setTurn(newTurn);
		// guardar aqui partida
		saveGameToStorage({
			board: newBoard,
			turn: newTurn,
		});
		// revisar si hay ganador
		const newWinner = checkWinnerFrom(newBoard);
		if (newWinner) {
			confetti();
			setWinner(newWinner);
		} else if (checkEndGame(newBoard)) {
			setWinner(false); // empate
		}
	};

	return (
		<main className="board">
			<h1 className="board__title">Tic Tac Toe</h1>

			{winner ? (
				<Results resetGame={resetGame} winner={winner} />
			) : (
				<>
					<button onClick={resetGame} className="board__button">
						Restart the game
					</button>

					<section className="board__game">
						{board.map((square, index) => {
							return (
								<Square key={index} index={index} updateBoard={updateBoard} checked={square}>
									{square}
								</Square>
							);
						})}
					</section>

					<section className="board__turns">
						<Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
						<Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
					</section>
				</>
			)}
		</main>
	);
}

export { App };
