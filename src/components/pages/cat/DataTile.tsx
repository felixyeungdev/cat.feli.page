import { IconType } from "react-icons";

interface Props {
    Icon: IconType;
    label: string;
    value: string;
    hint?: string;
}

const DataTile: React.FC<Props> = ({ Icon, label, value, hint }) => {
    return (
        <div
            className="flex items-center px-4 py-3 space-x-3 bg-white rounded-lg shadow-md text-start"
            {...(hint ? { title: hint } : {})}
        >
            <div className="p-2 rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                <Icon className="text-2xl text-white " />
            </div>
            <div className="flex flex-col">
                <span>{label}</span>
                <span className="text-sm text-gray-600">{value}</span>
            </div>
        </div>
    );
};

export default DataTile;
