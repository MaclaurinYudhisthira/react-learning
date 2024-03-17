import { ReactNode } from "react";

interface Props {
	text: ReactNode;
}

const Alert = ({ text }: Props) => {
	return <div className="alert alert-primary">{text}</div>;
};

export default Alert;
