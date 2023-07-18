export const Square = ({ children, index, isSelected, updateBoard, checked }) => {
	return (
		<div
			onClick={() => updateBoard(index)}
			className={`square ${isSelected ? "square--selected" : ""} ${checked ? "square--checked" : ""}`}
		>
			{children}
		</div>
	);
};
