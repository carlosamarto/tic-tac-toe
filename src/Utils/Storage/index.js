export const saveGameToStorage = ({ board, turn }) => {
	// Save the game here
	window.localStorage.setItem("board", JSON.stringify(board));
	window.localStorage.setItem("turn", turn);
};

export const resetGameStorage = () => {
	// Cleanup the localstorage
	window.localStorage.removeItem("board");
	window.localStorage.removeItem("turn");
};
