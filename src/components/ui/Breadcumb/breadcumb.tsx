import svgBre from "@/assets/breadcumb.svg";
import React from "react";
import { Link } from "react-router-dom";
type Props = {
  items: string[];
};
const Breadcumb = ({ items }: Props) => {
  return (
    <ol className="flex items-center whitespace-nowrap">
      <li className="inline-flex items-center">
        <a
          className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
          href="#">
          Home
        </a>
        <img
          src={svgBre}
          alt=""
          className="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2"
        />
      </li>
      {items &&
        items.map((e, index) => (
          <React.Fragment key={index}>
            {index < items.length - 1 ? (
              <li className="inline-flex items-center">
                <Link
                  className="flex items-center text-sm text-gray-500 hover:text-blue-600 focus:outline-none focus:text-blue-600 dark:text-neutral-500 dark:hover:text-blue-500 dark:focus:text-blue-500"
                  to={`/${e.toLocaleLowerCase()}`}>
                  {e}
                  <img
                    src={svgBre}
                    alt=""
                    className="shrink-0 size-5 text-gray-400 dark:text-neutral-600 mx-2"
                  />
                </Link>
              </li>
            ) : (
              <li
                className="inline-flex items-center text-sm font-semibold text-gray-800 truncate dark:text-neutral-200"
                aria-current="page">
                {e}
              </li>
            )}
          </React.Fragment>
        ))}
    </ol>
  );
};

export default Breadcumb;
