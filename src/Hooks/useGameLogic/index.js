import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS } from "../../Utils/Constants";
import { WINNER_COMBOS } from "../../Utils/Constants";
import { saveGameToStorage, resetGameStorage } from "../../Utils/storage";

export function useGameLogic() {
	const [results, setResults] = useState(null);

	const [turns, setTurns] = useState(() => {
		const turnsFromStorage = window.localStorage.getItem("turn");
		return turnsFromStorage ?? TURNS.X;
	});

	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem("board");
		if (boardFromStorage) return JSON.parse(boardFromStorage);
		return Array(9).fill(null);
	});

	const updateBoard = (index) => {
		if (board[index] || results) return;

		const newBoard = [...board];

		newBoard[index] = turns;

		setBoard(newBoard);

		const newTurns = turns === TURNS.X ? TURNS.O : TURNS.X;

		setTurns(newTurns);

		saveGameToStorage({
			board: newBoard,
			turns: newTurns,
		});

		const newResults = checkWinnerFrom(newBoard);

		if (newResults) {
			confetti();
			setResults(newResults);
		} else if (checkEndGame(newBoard)) {
			setResults(false);
		}
	};

	const resetGame = () => {
		setBoard(Array(9).fill(null));
		setTurns(TURNS.X);
		setResults(null);
		resetGameStorage();
	};

	const checkWinnerFrom = (boardToCheck) => {
		// We review all winning combinations
		// To see if X or O won
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;

			if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
				return boardToCheck[a];
			}
		}

		// If there is no winner
		return null;
	};

	const checkEndGame = (newBoard) => {
		// Check if there is a tie
		// If there are no more empty spaces
		// On the board
		return newBoard.every((square) => square !== null);
	};

	return { results, turns, board, updateBoard, resetGame };
}
