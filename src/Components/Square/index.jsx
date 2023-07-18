export const Square = ({ children, isSelected, updateBoard, index, checked }) => {
	const handleClick = () => {
		updateBoard(index);
	};

	return (
		<div
			onClick={handleClick}
			className={`square ${isSelected ? "square--selected" : ""} ${checked ? "square--checked" : ""}`}
		>
			{children}
		</div>
	);
};
