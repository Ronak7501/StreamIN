import React from "react";
import tv from "../assets/tv.jpg";
import chatting from "../assets/chatting.jpg";
import Card from "./Card";


const Cards = () => {
  const cards = [
    { title: "Let's Talk"},
    { title: "Video Games"},
    { title: "Let's Talk"},
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Video Games", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Video Games", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Video Games", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
    // { title: "Let's Talk", image: tv },
  ];
  return (
    <div>
      {/* Title */}
      <div className="w-full font-bold text-[20px] flex items-center pt-12 gap-x-6  ">
        {/* <h1 className="pt-40 text-center font-bold">Testimonials</h1> */}
      </div>
      {/* Filter */}
      <div className="flex items-center pt-2">
      </div>
      {/* Cards */}
      <h1 className="pt-40 text-4xl text-center font-bold">Testimonials</h1>
      <div className="grid xl:grid-cols-3 xxl:grid-cols-3 pt-40 gap-4 pb-12">
        {cards.map((card) => (
          <Card title={card.title} image={card.image} />
        ))}


        
      </div>
    </div>
  );
};

export default Cards;
