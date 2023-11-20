import { Card } from "flowbite-react";
import React from "react";

const Cards = () => {
  return (
    <div>
      <Card
        className="max-w-sm"
        imgAlt="Apple Watch Series 7 in colors pink, silver, and black"
        imgSrc="/images/banner.jpg"
      >
        <a href="#">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
            Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport
          </h5>
        </a>

        <div className="flex items-center justify-between">
          <span className="text-3xl font-bold text-gray-900 dark:text-white">
            $599
          </span>
          <a
            href="#"
            className="rounded-lg bg-cyan-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-800 focus:outline-none focus:ring-4 focus:ring-cyan-300 dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
          >
            Add to cart
          </a>
        </div>
      </Card>
    </div>
  );
};

export default Cards;
