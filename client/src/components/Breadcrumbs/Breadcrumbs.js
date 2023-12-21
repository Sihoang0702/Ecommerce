import React from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import { Link } from "react-router-dom";
import { IoIosArrowForward } from "react-icons/io";

const Breadcrumbs = ({ title, category }) => {
  const routes = [
    { path: "/", breadcrumb: "Home" },
    { path: "/:category", breadcrumb: category },
    { path: "/:category/:pId/:slug", breadcrumb: title },
  ];
  const breadcrumbs = useBreadcrumbs(routes);

  return (
    <div className="flex items-center gap-x-1 text-sm">
      {breadcrumbs
        .filter((el) => !el.match.route === false)
        .map(({ match, breadcrumb }, index, self) => (
          <Link key={match.pathname} to={match.pathname}>
            <span className="flex gap-1 items-center hover:text-colorMain">
              {breadcrumb}
              {index !== self.length - 1 && <IoIosArrowForward size={10}></IoIosArrowForward>}
            </span>
          </Link>
        ))}
    </div>
  );
};

export default Breadcrumbs;
