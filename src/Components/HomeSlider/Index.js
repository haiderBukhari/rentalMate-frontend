import React, { useState } from "react";
import Carousel from "nuka-carousel";
import sliderImg from "../../Assets/sliderImg.png";
import { Link } from "react-router-dom";
const Index = () => {
  const slides = [
    {
      image: sliderImg,
      title: "Rent,Enjoy,Repeat!",
      description: "Rent anything to evaluate your lifestyle",
      buttonText: "Shop Now",
      textColor: "#fff",
      bgColor: "#01A664",
    },
    {
      image: sliderImg,
      textColor: "#fff",

      title: "Rent,Enjoy,Repeat!",
      description: "Rent anything to evaluate your lifestyle",
      buttonText: "Shop Now",
      bgColor: "#01A664",
    },
  ];
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const customArrowStyles = {
    fontSize: "24px",
    color: "#fff",
    borderRadius: "50%",
    padding: "8px",
  };

  return (
    <div>
      <div
        className="relative mt-4"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Carousel
          autoplay={!isHovered}
          autoplayInterval={5000}
          wrapAround={true}
          renderCenterLeftControls={({ previousSlide }) => (
            <button style={customArrowStyles} onClick={previousSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 45 45"
                fill="none"
              >
                <circle cx="22.5" cy="22.5" r="22.5" fill="#DFE3E6" />
                <path
                  d="M27.7117 10.4616L15.6842 20.4038C15.4688 20.5966 15.2966 20.832 15.1788 21.0949C15.0609 21.3578 15 21.6424 15 21.9301C15 22.2179 15.0609 22.5024 15.1788 22.7653C15.2966 23.0282 15.4688 23.2637 15.6842 23.4564L27.7117 33.3986C27.9137 33.5659 28.147 33.6921 28.3982 33.7699C28.6495 33.8478 28.9137 33.8758 29.1758 33.8523C29.4379 33.8289 29.6928 33.7545 29.926 33.6333C30.1591 33.5121 30.3659 33.3466 30.5345 33.1462C30.7032 32.9457 30.8303 32.7143 30.9088 32.4651C30.9873 32.2159 31.0155 31.9539 30.9919 31.6938C30.9683 31.4338 30.8932 31.181 30.7711 30.9497C30.649 30.7185 30.4821 30.5133 30.28 30.3461L20.1005 21.9301L30.28 13.5142C30.4821 13.3469 30.649 13.1418 30.7711 12.9105C30.8932 12.6793 30.9683 12.4264 30.9919 12.1664C31.0155 11.9064 30.9873 11.6443 30.9088 11.3951C30.8303 11.1459 30.7032 10.9145 30.5345 10.7141C30.3659 10.5136 30.1591 10.3481 29.926 10.2269C29.6928 10.1058 29.4379 10.0314 29.1758 10.0079C28.9137 9.98448 28.6495 10.0125 28.3982 10.0903C28.147 10.1682 27.9137 10.2943 27.7117 10.4616Z"
                  fill="black"
                />
              </svg>
            </button>
          )}
          renderCenterRightControls={({ nextSlide }) => (
            <button style={customArrowStyles} onClick={nextSlide}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="35"
                height="35"
                viewBox="0 0 45 45"
                fill="none"
              >
                <circle
                  cx="22.5"
                  cy="22.5"
                  r="22.5"
                  transform="rotate(-180 22.5 22.5)"
                  fill="#DFE3E6"
                />
                <path
                  d="M17.2883 34.5384L29.3158 24.5962C29.5312 24.4034 29.7034 24.168 29.8212 23.9051C29.9391 23.6422 30 23.3576 30 23.0699C30 22.7821 29.9391 22.4976 29.8212 22.2347C29.7034 21.9718 29.5312 21.7363 29.3158 21.5436L17.2883 11.6014C17.0863 11.4341 16.853 11.3079 16.6018 11.2301C16.3505 11.1522 16.0863 11.1242 15.8242 11.1477C15.5621 11.1711 15.3072 11.2455 15.074 11.3667C14.8409 11.4879 14.6341 11.6534 14.4655 11.8538C14.2968 12.0543 14.1697 12.2857 14.0912 12.5349C14.0127 12.7841 13.9845 13.0461 14.0081 13.3062C14.0317 13.5662 14.1068 13.819 14.2289 14.0503C14.351 14.2815 14.5179 14.4867 14.72 14.6539L24.8995 23.0699L14.72 31.4858C14.5179 31.6531 14.351 31.8582 14.2289 32.0895C14.1068 32.3207 14.0317 32.5736 14.0081 32.8336C13.9845 33.0936 14.0127 33.3557 14.0912 33.6049C14.1697 33.8541 14.2968 34.0855 14.4655 34.2859C14.6341 34.4864 14.8409 34.6519 15.074 34.7731C15.3072 34.8942 15.5621 34.9686 15.8242 34.9921C16.0863 35.0155 16.3505 34.9875 16.6018 34.9097C16.853 34.8318 17.0863 34.7057 17.2883 34.5384Z"
                  fill="black"
                />
              </svg>
            </button>
          )}
        >
          {slides.map((slide, index) => (
            <div key={index}>
              <div
                className="flex justify-between w-full gap-5"
                style={{ backgroundColor: slide.bgColor }}
              >
                <div className="mt-6 pl-20 pt-10">
                  <h1
                    className="text-4xl font-semibold"
                    style={{ color: slide.textColor }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="pt-4 text-xl pb-6 w-4/5"
                    style={{ color: slide.textColor }}
                  >
                    {slide.description}
                  </p>
                  <Link to={"/Browsing"}>
                    <button className="flex border border-white text-white p-2 gap-2">
                      {slide.buttonText}{" "}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M3.5 12H20M20 12L13 5M20 12L13 19"
                          stroke="#FAFAFA"
                          stroke-width="1.5"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                    </button>
                  </Link>
                </div>
                <img src={slide.image} alt="Slide" />
              </div>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default Index;
