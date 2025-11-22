import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element | JSX.Element[] | null;
  direction?: "row" | "col";
}

const Stack = ({ children = null, direction = "col" }: Props ) => {
  return <div className={`flex flex-${direction}`}>{children}</div>;
};

export default Stack;
