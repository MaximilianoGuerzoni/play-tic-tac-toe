export const Square = ({ children, upDateBoard, index, isSelected }) => {

    const handleClick = () => {
        upDateBoard(index);
    }

    const className = `square ${isSelected ? 'is-selected' : ''} `

    return (
        <div onClick={handleClick} className={className} >
            {children}
        </div>
    )
}