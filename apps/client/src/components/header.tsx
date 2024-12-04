import Link from "next/link";
import React from "react";

const headerItems = [
  {
    id: 1,
    name: "Nearest Routes",
    link: "/",
  },
  {
    id: 2,
    name: "Viewport Points",
    link: "/viewport",
  },
];

const Header = () => {
  return (
    <nav className="w-full h-[8vh] md:h-[10vh] bg-white ">
      <ul className="flex flex-row justify-around align-middle ">
        {headerItems.map((item) => (
          <Link href={item.link} key={item.id} className="py-4">
            <li key={item.id}>
              <p className="text-base md:text-lg hover:underline ">
                {item.name}
              </p>
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default Header;
