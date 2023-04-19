interface Props {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    children: React.ReactNode;
}

const ActionButton: React.FC<Props> = ({ children, onClick }) => {
    return (
        <button
            className="inline-block px-8 py-3 text-lg text-white transition bg-black rounded-md hover:shadow-md hover:bg-opacity-80 active:bg-opacity-90"
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default ActionButton;
