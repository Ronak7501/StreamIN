import React from 'react';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
  const cardData = [
    { title: '- Rahul more', content: 'I have used this system for 2 years and love it! Never a failure with my interviews on Streamyards part. Worth every penny I spent.' },
    { title: '- John', content: "This is probably the easiest streaming platform I know.'I'm almost 50 and so a lot of Technology can be scary 😧... But you guys have done an amazing job of making this crazy simple. Thank 🙏🏿 you" },
    { title: '- sarah johnson', content: "I absolutely love this live streaming platform! It's incredibly user-friendly and has helped me connect with my audience like never before. Highly recommended!" },
    { title: '- David smith', content: "I've tried various streaming platforms, but this one stands out. The customizable options and seamless integration with other tools have made my live events a success."},
    // Add more card data here
  ];

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };

  return (
    <div className="carousel-container mt-20 pt-40 text-white">
        <h1 className="text-center text-4xl font-bold text-black">Testimonials</h1>
      <Slider {...settings}>
        {cardData.map((card, index) => (
          <div key={index} className='p-4'>
            {/* <div className="custom-card bg-gray-800 text-white"> */}
            <div className="bg-gray-500 text-white mt-10 rounded-lg p-6 h-[275px]">
              <p className="mt-10">{card.content}</p>
              <p className='mt-5 text-center'>{card.title}</p>
            </div>
            </div>
        //   </div>
        ))}
      </Slider>
    </div>
  );
}

export default Carousel;
