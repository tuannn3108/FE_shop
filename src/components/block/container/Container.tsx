import { ReactNode } from "react";
import { clsx } from "clsx";

interface Props {
  className?: string;
  children: ReactNode
}

const Container = ({ className, children }: Props) => {
  return <div className={clsx(className, "max-w-7xl lg:px-20 md:px-12 px-4 mx-auto")}>{children}</div>;
};

export default Container;
