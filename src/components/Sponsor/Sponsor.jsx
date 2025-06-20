import React from "react";
import Marquee from "react-fast-marquee";

import logo1 from "../../assets/brands/amazon.png";
import logo2 from "../../assets/brands/amazon_vector.png";
import logo3 from "../../assets/brands/casio.png";
import logo4 from "../../assets/brands/moonstar.png";
import logo5 from "../../assets/brands/randstad.png";
import logo6 from "../../assets/brands/start-people 1.png";
import logo7 from "../../assets/brands/start.png";

const Sponsor = () => {
  const brands = [logo1, logo3, logo4, logo5, logo6, logo7];

  return (
    <div className="my-10">
      <h1 className="text-accent text-center mb-5 text-3xl font-extrabold">
        We've helped thousands of sales teams
      </h1>
      <div className=" w-4/5 mx-auto ">
        <Marquee>
          <div className="flex items-center justify-center gap-10">
            {brands.map((brand) => (
              <img src={brand} />
            ))}
          </div>
        </Marquee>
      </div>
    </div>
  );
};

export default Sponsor;
