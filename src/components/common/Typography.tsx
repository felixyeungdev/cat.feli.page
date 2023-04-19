interface Props {
    children: React.ReactNode;
}

const h1: React.FC<Props> = (props) => {
    return <h1 className="text-3xl font-bold" {...props} />;
};

const h2: React.FC<Props> = (props) => {
    return <h2 className="text-2xl font-semibold" {...props} />;
};

const Typography = { h1, h2 };

export default Typography;
