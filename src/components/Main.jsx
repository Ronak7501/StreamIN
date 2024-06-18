import React from "react";
import Browse from "./Browse";
// import Cards from "./Cards";
import Carousel from "./Carousal";
import Login from "./Login";
import CenteredContent from "./CenteredContent";

const Main = () => {
  return (
    <div className="w-full px-4 lg:px-10">
      <Browse />
      <Carousel />
     <CenteredContent />
    </div>
  );
};

export default Main;
