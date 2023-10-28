import React from "react";
import Browse from "./Browse";
import Cards from "./Cards";
import Carousel from "./carousal";
import Login from "./login";
import CenteredContent from "./CenteredContent";

const Main = () => {
  return (
    <div className="w-full px-4 lg:px-10">
      {/* Browse */}
      <Browse />
      {/* Cards */}
      {/* <Cards /> */}
      <Carousel />
      
     <CenteredContent />
      
    </div>
  );
};

export default Main;
