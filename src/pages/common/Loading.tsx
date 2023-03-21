import { NextPage } from "next";

type Props = {
  size?: number;
};

const Loading: NextPage<Props> = ({ size = 8 }) => {
  return <div className={`animate-spin text-${size}xl`}>🎫</div>;
};

export default Loading;
