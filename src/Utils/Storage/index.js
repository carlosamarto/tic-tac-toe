// Save the game here
export const saveGameToStorage = ({ board, turn }) => {
	window.localStorage.setItem("board", JSON.stringify(board));
	window.localStorage.setItem("turn", turn);
};

// Cleanup the localstorage
export const resetGameStorage = () => {
	window.localStorage.removeItem("board");
	window.localStorage.removeItem("turn");
};
