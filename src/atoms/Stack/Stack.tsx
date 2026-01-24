import { ReactNode } from "react";
import * as motion from "framer-motion/client";
import { HTMLMotionProps } from "framer-motion";

interface Props extends HTMLMotionProps<"div"> {
  children?: ReactNode;
  direction?: "row" | "col";
}

const Stack = ({
  children = null,
  direction = "col",
  className = "",
  ...props
}: Props) => {
  return (
    <motion.div
      className={`flex ${direction === "col" ? "flex-col" : "flex-row"} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Stack;
