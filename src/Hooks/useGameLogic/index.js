import { useState } from "react";
import confetti from "canvas-confetti";
import { TURNS } from "../../Utils/Constants";
import { WINNER_COMBOS } from "../../Utils/Constants";
import { saveGameToStorage, resetGameStorage } from "../../Utils/Storage";

// Custom hook for managing the game logic
const useGameLogic = () => {
	// State variables using React's useState hook
	const [results, setResults] = useState(null); // To keep track of game results (null for ongoing game, 'X' or 'O' for winner, and false for a tie)

	// Set the winner
	const [winner, setWinner] = useState("");

	// Initialize the current turn from localStorage if available, otherwise start with 'X'
	const [turns, setTurns] = useState(() => {
		const turnsFromStorage = window.localStorage.getItem("turn");

		return turnsFromStorage ?? TURNS.X;
	});

	// Initialize the game board from localStorage if available, otherwise start with an empty board
	const [board, setBoard] = useState(() => {
		const boardFromStorage = window.localStorage.getItem("board");

		if (boardFromStorage) return JSON.parse(boardFromStorage);

		return Array(9).fill(null);
	});

	// Function to update the board based on the player's move
	const updateBoard = (index) => {
		// If the selected square is already filled or the game has already ended, do nothing
		if (board[index] || results) return;

		// Create a copy of the current board to avoid directly modifying state
		const newBoard = [...board];

		// Place the current player's symbol ('X' or 'O') on the selected square
		newBoard[index] = turns;

		// Update the state with the new board
		setBoard(newBoard);

		// Switch turns for the next player
		const newTurns = turns === TURNS.X ? TURNS.O : TURNS.X;

		setTurns(newTurns);

		// Save the updated game state (board and turns) to localStorage
		saveGameToStorage({
			board: newBoard,

			turns: newTurns,
		});

		// Check if the current player has won the game
		const newResults = checkWinnerFrom(newBoard);

		// If there is a winner, trigger confetti animation and set the results to show the winner
		if (newResults) {
			confetti();

			setWinner(newResults);
		}
		// If there is no winner but the game has ended (tie), set the results to false
		else if (checkEndGame(newBoard)) {
			setResults(false);

			setWinner("-");
		}
	};

	// Function to reset the game to its initial state
	const resetGame = () => {
		setBoard(Array(9).fill(null)); // Reset the game board to an empty state

		setTurns(TURNS.X); // Set the starting turn to 'X'

		setResults(null); // Reset the game results to null

		setWinner(""); // Reset the winner to nobody

		resetGameStorage(); // Clear the game data from localStorage
	};

	// Function to check if a player has won the game based on the current board
	const checkWinnerFrom = (boardToCheck) => {
		// Iterate through all the winning combinations to see if 'X' or 'O' has won
		for (const combo of WINNER_COMBOS) {
			const [a, b, c] = combo;

			// If all three squares in a winning combination have the same symbol ('X' or 'O'), return the symbol as the winner
			if (boardToCheck[a] && boardToCheck[a] === boardToCheck[b] && boardToCheck[a] === boardToCheck[c]) {
				return boardToCheck[a];
			}
		}

		// If there is no winner, return null
		return null;
	};

	// Function to check if the game has ended in a tie (no more empty squares on the board)
	const checkEndGame = (newBoard) => {
		// Check if there are no more empty squares on the board (i.e., all squares are filled)
		return newBoard.every((square) => square !== null);
	};

	// Return the required state variables and functions as the hook's public interface
	return { results, winner, turns, board, updateBoard, resetGame };
};

export { useGameLogic };
