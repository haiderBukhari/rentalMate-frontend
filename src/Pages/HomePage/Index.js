import React from "react";
import Navbar from "../../Components/Navbar/index";
import Slider from "../../Components/HomeSlider/Index";
import Footer from "../../Components/Footer/Index";
import Electronics from "../../Assets/electronics.png";
import construction from "../../Assets/construction.png";
import film from "../../Assets/film.png";
import homegarden from "../../Assets/homegarden.png";
import party from "../../Assets/party.png";
import sport from "../../Assets/sport.png";
import ecology from "../../Assets/ecology.png";
import Handshake from "../../Assets/Handshake.png";
import testimonial1 from "../../Assets/testimonial1.png";
import testimonial2 from "../../Assets/testimonial2.png";
import testimonial3 from "../../Assets/testimonial3.png";
import { Link } from "react-router-dom";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";
import { changeCategory } from "../../redux/Main/mainSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux"

const Index = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);
  const status = useSelector((state) => state.status);
  const categoriesData = [
    { title: "Electronics", imageSource: Electronics },
    { title: "Home and Garden", imageSource: homegarden },
    { title: "Party", imageSource: party },
    { title: "Film and Photography", imageSource: film },
    { title: "Sports and leisures", imageSource: sport },
    { title: "Construction Tools", imageSource: construction },
  ];
  const handleCategory = (item) => {
    dispatch(changeCategory(item));
  };
  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
      ({ getItemById, scrollToItem }) => {
        const itemSelected = isItemSelected(id);

        setSelected((currentSelected) =>
          itemSelected
            ? currentSelected.filter((el) => el !== id)
            : currentSelected.concat(id)
        );
      };

  const containerStyle = {
    position: "relative",
    height: "100vh",
    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221440%22 height=%22595%22 viewBox=%220 0 1440 595%22 fill=%22none%22%3E%3Cpath d=%22M889.309 101.741C1448.06 106.617 1702.36 -103.647 1700.17 147.77C1697.97 399.188 1243.24 599.05 684.496 594.173C125.749 589.297 -329.762 557.999 -327.567 306.582C-325.373 55.1639 289.596 -118.953 889.309 101.741Z%22 fill=%22%23BDFFC0%22/%3E%3C/svg%3E')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const customArrowStyles = {
    fontSize: "24px",
    color: "#fff",
    borderRadius: "50%",
    padding: "8px",
  };
  function LeftArrow() {
    const { isFirstItemVisible, scrollPrev } =
      React.useContext(VisibilityContext);

    return (
      <button style={customArrowStyles} onClick={() => scrollPrev()}>
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
    );
  }

  function RightArrow() {
    const { isLastItemVisible, scrollNext } =
      React.useContext(VisibilityContext);

    return (
      <button style={customArrowStyles} onClick={() => scrollNext()}>
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
    );
  }

  function Card({ item }) {
    return (
      <Link to={"/Categories"} onClick={() => handleCategory(item.title)}>
        <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-lg ">
          <img
            className="w-[261px] h-[200px] rounded-t-md"
            src={item.imageSource}
            alt="Box"
          />
          <p className="font-medium text-xl text-center py-6">{item.title}</p>
        </div>
      </Link>
    );
  }

  return (
    <div>
      <Navbar />
      <Slider />
      <p className="font-semibold text-3xl ml-16 mt-6">
        How Rentmyitem works?
      </p>
      <div class="flex justify-center flex-wrap items-center mt-10 mx-2 mb-4">
        <div class="flex flex-col justify-center w-72 mb-10 mx-2">
          <div class="w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M24 18L63 18.0023M24 36L63 36.0024M24 54L63 54.0021M9 19.5H12V16.5H9V19.5ZM9 37.5H12V34.5H9V37.5ZM9 55.5H12V52.5H9V55.5Z"
                stroke="white"
                stroke-width="5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="mt-4 text-left flex justify-center flex-col items-center">
            <h2 class="text-xl font-bold mb-2 text-center">List</h2>
            <p class="text-base w-72 text-center">
              Upload photos, provide description, specify rental price per day,
              and set terms and conditions.
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center w-72 mb-10 mx-2">
          <div class="w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M27.3299 15.2399C27.3299 22.4099 15.8999 33.2399 15.8999 33.2399C15.8999 33.2399 4.43994 22.4999 4.43994 15.2399C4.48646 13.782 4.81987 12.3476 5.42111 11.0186C6.02236 9.6896 6.87964 8.49216 7.94396 7.49471C9.00828 6.49726 10.2588 5.71937 11.6239 5.2055C12.989 4.69163 14.4421 4.45187 15.8999 4.49992C18.8392 4.41099 21.6936 5.49199 23.8365 7.50559C25.9795 9.5192 27.2359 12.3009 27.3299 15.2399Z"
                stroke="white"
                stroke-width="4.775"
                stroke-miterlimit="10"
              />
              <path
                d="M15.9 18.8101C17.4741 18.8101 18.75 17.5341 18.75 15.9601C18.75 14.3861 17.4741 13.1101 15.9 13.1101C14.326 13.1101 13.05 14.3861 13.05 15.9601C13.05 17.5341 14.326 18.8101 15.9 18.8101Z"
                fill="white"
              />
              <path
                d="M13.0199 39H25.9199C27.7802 39.0229 29.5587 39.7681 30.8798 41.078C32.2009 42.3879 32.9612 44.16 32.9999 46.02C33 47.9164 32.2487 49.7356 30.9105 51.0794C29.5724 52.4232 27.7563 53.1821 25.8599 53.19H11.5799C9.68873 53.1979 7.87722 53.9527 6.53992 55.29C5.20262 56.6273 4.44784 58.4388 4.43994 60.33C4.43992 62.2264 5.19121 64.0456 6.52937 65.3894C7.86752 66.7332 9.68354 67.4921 11.5799 67.5H53.0999"
                stroke="white"
                stroke-width="4.775"
                stroke-miterlimit="10"
              />
              <path
                d="M50.25 27.4199V61.7699"
                stroke="white"
                stroke-width="4.775"
                stroke-miterlimit="10"
              />
              <path
                d="M50.25 44.5801H64.56L61.71 38.8801L64.56 33.1201H50.25V44.5801Z"
                stroke="white"
                stroke-width="4.775"
                stroke-miterlimit="10"
              />
            </svg>
          </div>
          <div class="mt-4 text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Rent</h2>
            <p class="text-base w-72 text-center">
              Get bookings and deliver or let the customer collect the item on
              suitable timing
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center w-72 mb-10 mx-2">
          <div class="w-32 h-32  justify-center bg-[#01A664] items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M57 36C57 37.6569 55.6569 39 54 39C52.3431 39 51 37.6569 51 36C51 34.3431 52.3431 33 54 33C55.6569 33 57 34.3431 57 36Z"
                fill="white"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M29.8307 9.75H39.1692C44.6826 9.74994 49.0494 9.74991 52.467 10.2094C55.9842 10.6823 58.8312 11.6786 61.0764 13.9237C63.8493 16.6969 64.7331 20.4109 65.0541 25.2302C66.7857 25.9923 68.0934 27.6039 68.2374 29.6454C68.2503 29.826 68.25 30.0207 68.25 30.201C68.25 30.2175 68.25 30.2337 68.25 30.2499V41.7501C68.25 41.7663 68.25 41.7825 68.25 41.799C68.25 41.9793 68.2503 42.174 68.2374 42.3546C68.0934 44.3961 66.7857 46.0077 65.0541 46.7697C64.7331 51.5892 63.8493 55.3032 61.0764 58.0764C58.8312 60.3213 55.9842 61.3176 52.467 61.7907C49.0494 62.25 44.6826 62.25 39.1692 62.25H29.8308C24.3175 62.25 19.9506 62.25 16.5329 61.7907C13.0157 61.3176 10.1688 60.3213 7.92372 58.0764C5.67864 55.8312 4.68228 52.9842 4.20942 49.467C3.74991 46.0494 3.74994 41.6826 3.75 36.1692V35.8308C3.74994 30.3174 3.74991 25.9506 4.20942 22.5329C4.68228 19.0157 5.67864 16.1688 7.92372 13.9237C10.1688 11.6786 13.0157 10.6823 16.5329 10.2094C19.9506 9.74991 24.3175 9.74994 29.8307 9.75ZM60.5037 47.25H54.6924C48.2568 47.25 42.75 42.3672 42.75 36C42.75 29.6327 48.2568 24.75 54.6924 24.75H60.5037C60.1623 20.7257 59.3898 18.6013 57.8943 17.1057C56.6247 15.8361 54.8856 15.0751 51.8676 14.6693C48.7845 14.2548 44.7204 14.25 39 14.25H30C24.2795 14.25 20.2155 14.2548 17.1326 14.6693C14.1143 15.0751 12.3753 15.8361 11.1057 17.1057C9.83607 18.3753 9.07506 20.1143 8.66928 23.1326C8.25477 26.2155 8.25 30.2796 8.25 36C8.25 41.7204 8.25477 45.7845 8.66928 48.8676C9.07506 51.8856 9.83607 53.6247 11.1057 54.8943C12.3753 56.1639 14.1143 56.925 17.1326 57.3306C20.2155 57.7452 24.2795 57.75 30 57.75H39C44.7204 57.75 48.7845 57.7452 51.8676 57.3306C54.8856 56.925 56.6247 56.1639 57.8943 54.8943C59.3898 53.3988 60.1623 51.2745 60.5037 47.25ZM15.75 24C15.75 22.7574 16.7574 21.75 18 21.75H30C31.2426 21.75 32.25 22.7574 32.25 24C32.25 25.2426 31.2426 26.25 30 26.25H18C16.7574 26.25 15.75 25.2426 15.75 24ZM62.7705 29.2507C62.7096 29.25 62.6298 29.25 62.4999 29.25H54.6924C50.4222 29.25 47.25 32.4261 47.25 36C47.25 39.5739 50.4222 42.75 54.6924 42.75H62.4999C62.6298 42.75 62.7096 42.75 62.7705 42.7494C62.808 42.7488 62.8278 42.7485 62.8371 42.7479L62.8437 42.7476C63.4623 42.7101 63.7281 42.2928 63.7485 42.0417C63.7485 42.0417 63.7491 42.0228 63.7494 41.9958C63.75 41.9424 63.75 41.8716 63.75 41.7501V30.2499C63.75 30.1284 63.75 30.0576 63.7494 30.0042C63.7491 29.9771 63.7485 29.9583 63.7485 29.9583C63.7281 29.7073 63.4623 29.2899 62.8437 29.2523C62.8437 29.2523 62.829 29.2513 62.7705 29.2507Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="mt-4 text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Earn</h2>
            <p class="text-base w-72 text-center">
              Get the payment of your daily rate,
              <br /> once the item has been returned to <br /> you.
            </p>
          </div>
        </div>
      </div>
      {
        status === "vendor" && <Link
          to={"/vendor/dashboard/product/create"}
          className="w-full mt-16 mb-5  flex justify-center  "
        >
          <button class="w-56 h-11 ml-10 rounded-xl bg-[#01A664] text-white font-bold mr-5">
            List an item{" "}
          </button>
        </Link>
      }

      <div className="w-full bg-[#BDFFC0]  mt-3">
        <p className="font-semibold text-3xl ml-16 pt-10">
          Explore the popular categories
        </p>
        {/* <div className="flex w-11/12 mx-auto justify-between mt-10">
          <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={Electronics}
              alt="Box"
            />
            <p className=" text-2xl mt-6">Electronics</p>
          </div>
          <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={homegarden}
              alt="Box"
            />
            <p className=" text-2xl text-center mt-3">
              Home and <br /> Garden
            </p>
          </div>
          <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={party}
              alt="Box"
            />
            <p className=" text-2xl mt-6">Party</p>
          </div>
          <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={film}
              alt="Box"
            />
            <p className=" text-2xl mt-3 text-center">
              Film and <br />
              Photography
            </p>
          </div>
        </div> */}
        {/* <div className="flex  w-2/4 pb-20 justify-center mt-10 mx-auto">
          <div className="w-[261px] h-[293px] mr-28 flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={sport}
              alt="Box"
            />
            <p className=" text-2xl mt-4 text-center">
              Sports and <br /> Leisure{" "}
            </p>
          </div>
          <div className="w-[261px] h-[293px] flex flex-col items-center flex-shrink-0 rounded-md bg-white shadow-md overflow-hidden">
            <img
              className="w-[261px] h-[200px]   rounded-t-md"
              src={construction}
              alt="Box"
            />
            <p className=" text-2xl text-center mt-4">
              Construction <br /> Tool
            </p>
          </div>
        </div> */}
        <ScrollMenu
          scrollContainerClassName="py-10"
          itemClassName="mx-5"
          LeftArrow={LeftArrow}
          RightArrow={RightArrow}
        >
          {categoriesData.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </ScrollMenu>
      </div>
      <p className="font-semibold text-3xl ml-16 mt-16">
        Demystifying the art of borrowing{" "}
      </p>
      <div style={{ maxWidth: "90%" }} className="flex mt-24 mx-auto items-center justify-center flex-wrap">
        <div class="flex flex-col justify-center w-72 ">
          <div class="my-4 w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M63.18 53.2575L50.8275 40.8825C49.7685 39.8773 48.4298 39.2167 46.9878 38.9878C45.5458 38.7588 44.0682 38.9723 42.75 39.6L38.925 35.775C41.4013 32.6335 42.7486 28.7502 42.75 24.75C42.75 21.1899 41.6943 17.7098 39.7165 14.7497C37.7386 11.7897 34.9274 9.48255 31.6383 8.12018C28.3492 6.7578 24.73 6.40134 21.2384 7.09587C17.7467 7.79041 14.5394 9.50474 12.0221 12.0221C9.50474 14.5394 7.79041 17.7467 7.09587 21.2384C6.40134 24.73 6.7578 28.3492 8.12018 31.6383C9.48255 34.9274 11.7897 37.7386 14.7497 39.7165C17.7098 41.6943 21.1899 42.75 24.75 42.75C28.7475 42.755 32.6305 41.4157 35.775 38.9475L39.5775 42.75C38.9267 44.0646 38.7026 45.5496 38.9366 46.9977C39.1706 48.4458 39.8509 49.7847 40.8825 50.8275L53.2575 63.18C54.5873 64.4258 56.3494 65.1057 58.1714 65.076C59.9933 65.0463 61.7323 64.3093 63.0208 63.0208C64.3093 61.7323 65.0463 59.9933 65.076 58.1714C65.1057 56.3494 64.4258 54.5873 63.18 53.2575ZM11.25 24.75C11.25 22.08 12.0418 19.4699 13.5252 17.2498C15.0086 15.0297 17.117 13.2994 19.5838 12.2776C22.0506 11.2559 24.765 10.9885 27.3837 11.5094C30.0025 12.0303 32.4079 13.3161 34.2959 15.2041C36.184 17.0921 37.4697 19.4975 37.9906 22.1163C38.5115 24.735 38.2442 27.4494 37.2224 29.9162C36.2006 32.383 34.4703 34.4914 32.2502 35.9748C30.0301 37.4582 27.4201 38.25 24.75 38.25C21.1696 38.25 17.7358 36.8277 15.2041 34.2959C12.6723 31.7642 11.25 28.3304 11.25 24.75ZM60.0075 60.0075C59.7733 60.2436 59.4946 60.4309 59.1876 60.5588C58.8806 60.6866 58.5513 60.7525 58.2188 60.7525C57.8862 60.7525 57.5569 60.6866 57.2499 60.5588C56.9429 60.4309 56.6643 60.2436 56.43 60.0075L44.055 47.6325C43.5891 47.1537 43.3284 46.5119 43.3284 45.8438C43.3284 45.1756 43.5891 44.5339 44.055 44.055C44.5392 43.5994 45.1789 43.3457 45.8438 43.3457C46.5086 43.3457 47.1484 43.5994 47.6325 44.055L60.0075 56.43C60.2436 56.6643 60.4309 56.9429 60.5588 57.2499C60.6866 57.5569 60.7525 57.8862 60.7525 58.2188C60.7525 58.5513 60.6866 58.8806 60.5588 59.1876C60.4309 59.4946 60.2436 59.7733 60.0075 60.0075Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Browse</h2>
            <p class="text-base w-72 text-center">
              Search for the item or service <br /> you want to borrow, and{" "}
              <br /> select a listing that suits your <br /> needs.
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center w-72 py-10">
          <div class="w-32 h-32 bg-[#01A664] justify-center items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M36.0697 0C30.3302 0.0130871 24.7034 1.59407 19.7969 4.57218C14.8905 7.55029 10.891 11.8123 8.23042 16.8979C5.56984 21.9836 4.3493 27.6995 4.70065 33.4282C5.052 39.157 6.96188 44.6809 10.224 49.4033L4.5 72L34.749 62.9325C35.199 62.9505 35.6243 63 36.0697 63C44.4241 63 52.4362 59.6813 58.3436 53.7739C64.251 47.8665 67.5698 39.8543 67.5698 31.5C67.5698 23.1457 64.251 15.1335 58.3436 9.22614C52.4362 3.31874 44.4241 0 36.0697 0Z"
                fill="white"
              />
              <path
                d="M36.0697 9C23.7017 9 13.6395 19.0935 13.6395 31.5C13.6395 36.0856 15.0195 40.5083 17.6303 44.2899L19.9518 47.6524L18.9484 51.6132L17.1228 58.8205L32.1647 54.3115L33.6093 53.8785L35.116 53.94C35.4137 53.9521 35.6726 53.97 35.8807 53.9843C35.9596 53.9898 36.0637 53.997 36.1187 53.9999C48.4639 53.9729 58.5 43.8899 58.5 31.5C58.5 19.0935 48.4378 9 36.0697 9ZM36.0697 0C53.4285 0 67.5 14.103 67.5 31.5C67.5 48.897 53.4285 63 36.0697 63C35.6243 63 35.19 62.9505 34.749 62.9325L4.5 72L10.224 49.4033C6.71175 44.316 4.6395 38.1533 4.6395 31.5C4.6395 14.103 18.711 0 36.0697 0Z"
                fill="white"
              />
            </svg>
          </div>
          <div class="mt-4 text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Chat</h2>
            <p class="text-base w-72 text-center">
              Communicate with the <br />
              owner to coordinate <br /> logistics, such as pick-up or <br />{" "}
              delivery.
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center mb-11 w-72 ">
          <div class="w-32 h-32  justify-center bg-[#01A664] items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="73"
              height="72"
              viewBox="0 0 73 72"
              fill="none"
            >
              <g clip-path="url(#clip0_332_163)">
                <path
                  d="M36.807 9.26786V1.09047C36.807 0.689664 36.583 0.322753 36.2154 0.129719C35.8522 -0.0618404 35.4199 -0.0404741 35.0835 0.183504L12.2658 15.3897C11.96 15.5974 11.7806 15.9341 11.7806 16.2952C11.7806 16.6569 11.9577 17.0003 12.2658 17.2014L35.0731 32.4031C35.4147 32.6279 35.8418 32.65 36.2102 32.4672C36.5666 32.2735 36.7966 31.9014 36.7966 31.4991V22.7087C40.3885 22.7338 43.348 22.8863 45.8282 23.1803C57.6951 24.5794 60.8689 31.6281 60.9991 31.9279C61.1643 32.3354 61.5766 32.591 62.0149 32.591C62.0781 32.591 62.157 32.5888 62.2284 32.5711C62.7404 32.4702 63.1147 32.0237 63.1147 31.5043C63.1147 13.6973 41.7585 9.90517 36.807 9.26786Z"
                  fill="white"
                />
                <path
                  d="M60.4536 54.7942L37.6411 39.5954C37.31 39.3684 36.8776 39.3427 36.5093 39.5269C36.1528 39.7243 35.9288 40.092 35.9288 40.495V49.2868C32.3324 49.2596 29.3729 49.1078 26.8979 48.8124C15.0258 47.414 11.8513 40.366 11.7263 40.0662C11.5544 39.6573 11.1443 39.4031 10.7113 39.4031C10.6413 39.4031 10.5639 39.406 10.4925 39.4237C9.97902 39.5246 9.6062 39.9704 9.6062 40.492C9.6062 58.2953 30.9602 62.0926 35.9177 62.7336V70.9103C35.9177 71.3059 36.1364 71.6772 36.5041 71.871C36.8672 72.0604 37.2995 72.0397 37.6359 71.8157L60.4536 56.6118C60.7587 56.4025 60.9395 56.0673 60.9395 55.7048C60.9403 55.3387 60.7617 54.9938 60.4536 54.7942Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_332_163">
                  <rect width="72.7208" height="72" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div class="mt-4 text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Borrow</h2>
            <p class="text-base w-72 text-center">
              Reserve or book the item,
              <br /> specify your rental dates.
            </p>
          </div>
        </div>
        <div class="flex flex-col justify-center w-72 mb-5 ">
          <div class="w-32 h-32  justify-center bg-[#01A664] items-center flex rounded-md mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
            >
              <path
                d="M19.4997 12L9 21L19.4997 31.5"
                stroke="white"
                stroke-width="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M9 21H43.4907C53.8152 21 62.5831 29.4306 62.9856 39.75C63.4108 50.6544 54.4006 60 43.4907 60H17.9976"
                stroke="white"
                stroke-width="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <div class="mt-4 text-left">
            <h2 class="text-xl font-bold mb-2 text-center">Return</h2>
            <p class="text-base w-72 text-center">
              Return the item in the same <br /> condition at the end of the{" "}
              <br /> rental period.
            </p>
          </div>
        </div>
      </div>
      <div className="w-full mt-16  flex justify-center  ">
        <button class="w-56 h-11 ml-10  rounded-xl bg-[#01A664] text-white font-bold mr-5">
          Browse{" "}
        </button>
      </div>
      <div style={containerStyle}>
        <div className="h-full flex justify-center items-center">
          <div className="flex flex-col md:flex-row items-center justify-center">
            <div className="flex items-center justify-center mb-8 md:mb-0 md:mr-8">
              <img src={ecology} alt="" className="w-32 h-32 md:w-48 md:h-48" />
              <div className="ml-6 flex flex-col gap-5">
                <h1 className="text-4xl font-semibold text-center md:text-left">
                  Your contribution to <br />
                  save the environment .
                </h1>
                <p className="text-center md:text-left">
                Rentmyitem not only helps you earn, but borrowing items from
                  other people is a sustainable and environmentally-friendly
                  practice that can help reduce waste and promote a more
                  eco-conscious lifestyle.
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img src={Handshake} alt="" className="w-32 h-32 md:w-48 md:h-48" />
              <div className="ml-6 flex flex-col gap-5 leading-7">
                <h1 className="text-4xl font-semibold text-center md:text-left">
                  Why buy when <br />
                  you can borrow?
                </h1>
                <p className="text-center md:text-left">
                  Borrowing items saves money by avoiding the need to purchase items
                  that are only occasionally used, reducing overall spending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-11/12 mx-auto mt-24 pb-24 justify-center flex-wrap">
        <div className="max-w-[385px] flex-1 min-h-[384px] shadow-xl bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center m-4">
          <img
            className="w-[187px] h-[179px] rounded-full"
            src={testimonial1}
            alt="User"
          />
          <p className="text-center mt-4 font-semibold text-black">
            David, London
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="141"
            height="25"
            viewBox="0 0 141 25"
            fill="none"
          >
            <path
              d="M139.773 8.26046L132.007 7.59641C131.518 7.55616 131.095 7.27444 130.895 6.85186L128.113 0.75461C127.668 -0.251537 126.088 -0.251537 125.643 0.75461L122.884 6.85186C122.706 7.27444 122.261 7.55616 121.771 7.59641L114.005 8.26046C112.848 8.36108 112.381 9.66907 113.249 10.3734L119.101 15.0218C119.479 15.3236 119.635 15.7663 119.524 16.209L117.766 22.7286C117.499 23.7551 118.723 24.6001 119.746 24.057L126.221 20.6157C126.644 20.3944 127.156 20.3944 127.579 20.6157L134.054 24.057C135.078 24.6001 136.302 23.7752 136.035 22.7286L134.299 16.209C134.188 15.7663 134.343 15.3236 134.722 15.0218L140.574 10.3734C141.42 9.66907 140.93 8.36108 139.773 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M111.573 8.26046L103.807 7.59641C103.318 7.55616 102.895 7.27444 102.695 6.85186L99.9132 0.75461C99.4681 -0.251537 97.888 -0.251537 97.443 0.75461L94.6837 6.85186C94.5057 7.27444 94.0606 7.55616 93.5711 7.59641L85.8051 8.26046C84.648 8.36108 84.1807 9.66907 85.0486 10.3734L90.9009 15.0218C91.2791 15.3236 91.4349 15.7663 91.3236 16.209L89.5657 22.7286C89.2987 23.7551 90.5226 24.6001 91.5462 24.057L98.0215 20.6157C98.4443 20.3944 98.9561 20.3944 99.3789 20.6157L105.854 24.057C106.878 24.6001 108.102 23.7752 107.835 22.7286L106.099 16.209C105.988 15.7663 106.144 15.3236 106.522 15.0218L112.374 10.3734C113.22 9.66907 112.73 8.36108 111.573 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M83.373 8.26046L75.6072 7.59641C75.1177 7.55616 74.6947 7.27444 74.4946 6.85186L71.7131 0.75461C71.2681 -0.251537 69.6879 -0.251537 69.2429 0.75461L66.4836 6.85186C66.3056 7.27444 65.8606 7.55616 65.371 7.59641L57.6051 8.26046C56.4479 8.36108 55.9806 9.66907 56.8485 10.3734L62.7008 15.0218C63.0791 15.3236 63.2348 15.7663 63.1236 16.209L61.3657 22.7286C61.0986 23.7551 62.3225 24.6001 63.3461 24.057L69.8214 20.6157C70.2442 20.3944 70.756 20.3944 71.1788 20.6157L77.6544 24.057C78.678 24.6001 79.9019 23.7752 79.6346 22.7286L77.8989 16.209C77.7877 15.7663 77.9435 15.3236 78.3217 15.0218L84.174 10.3734C85.0196 9.66907 84.5301 8.36108 83.373 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M55.1729 8.26046L47.4071 7.59641C46.9176 7.55616 46.4946 7.27444 46.2945 6.85186L43.513 0.75461C43.068 -0.251537 41.4879 -0.251537 41.0428 0.75461L38.2836 6.85186C38.1055 7.27444 37.6605 7.55616 37.171 7.59641L29.405 8.26046C28.2479 8.36108 27.7806 9.66907 28.6484 10.3734L34.5007 15.0218C34.879 15.3236 35.0348 15.7663 34.9235 16.209L33.1656 22.7286C32.8986 23.7551 34.1224 24.6001 35.146 24.057L41.6214 20.6157C42.0442 20.3944 42.556 20.3944 42.9787 20.6157L49.4543 24.057C50.4779 24.6001 51.7018 23.7752 51.4345 22.7286L49.6989 16.209C49.5876 15.7663 49.7434 15.3236 50.1217 15.0218L55.974 10.3734C56.8195 9.66907 56.33 8.36108 55.1729 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M26.9728 8.26046L19.2071 7.59641C18.7175 7.55616 18.2945 7.27444 18.0945 6.85186L15.3129 0.75461C14.8679 -0.251537 13.2878 -0.251537 12.8427 0.75461L10.0835 6.85186C9.90547 7.27444 9.46043 7.55616 8.97088 7.59641L1.20491 8.26046C0.0477969 8.36108 -0.419497 9.66907 0.448334 10.3734L6.30063 15.0218C6.67892 15.3236 6.83468 15.7663 6.72342 16.209L4.96551 22.7286C4.69848 23.7551 5.92235 24.6001 6.94594 24.057L13.4213 20.6157C13.8441 20.3944 14.3559 20.3944 14.7787 20.6157L21.2543 24.057C22.2778 24.6001 23.5017 23.7752 23.2345 22.7286L21.4988 16.209C21.3875 15.7663 21.5433 15.3236 21.9216 15.0218L27.7739 10.3734C28.6195 9.66907 28.1299 8.36108 26.9728 8.26046Z"
              fill="#FFC107"
            />
          </svg>
          <p className="text-center mt-4 text-black font-semibold">
            "Brilliant guy and very easy to deal <br /> with. Great kit and
            really easy to <br /> collect and return equipment."
          </p>
        </div>
        <div className="max-w-[385px] flex-1 min-h-[384px] shadow-xl  bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center m-4">
          <img
            className="w-[187px] h-[179px] rounded-full"
            src={testimonial2}
            alt="User"
          />
          <p className="text-center mt-4 text-black font-semibold">
            Emily,Germany
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="141"
            height="25"
            viewBox="0 0 141 25"
            fill="none"
          >
            <path
              d="M139.773 8.26046L132.007 7.59641C131.518 7.55616 131.095 7.27444 130.895 6.85186L128.113 0.75461C127.668 -0.251537 126.088 -0.251537 125.643 0.75461L122.884 6.85186C122.706 7.27444 122.261 7.55616 121.771 7.59641L114.005 8.26046C112.848 8.36108 112.381 9.66907 113.249 10.3734L119.101 15.0218C119.479 15.3236 119.635 15.7663 119.524 16.209L117.766 22.7286C117.499 23.7551 118.723 24.6001 119.746 24.057L126.221 20.6157C126.644 20.3944 127.156 20.3944 127.579 20.6157L134.054 24.057C135.078 24.6001 136.302 23.7752 136.035 22.7286L134.299 16.209C134.188 15.7663 134.343 15.3236 134.722 15.0218L140.574 10.3734C141.42 9.66907 140.93 8.36108 139.773 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M111.573 8.26046L103.807 7.59641C103.318 7.55616 102.895 7.27444 102.695 6.85186L99.9132 0.75461C99.4681 -0.251537 97.888 -0.251537 97.443 0.75461L94.6837 6.85186C94.5057 7.27444 94.0606 7.55616 93.5711 7.59641L85.8051 8.26046C84.648 8.36108 84.1807 9.66907 85.0486 10.3734L90.9009 15.0218C91.2791 15.3236 91.4349 15.7663 91.3236 16.209L89.5657 22.7286C89.2987 23.7551 90.5226 24.6001 91.5462 24.057L98.0215 20.6157C98.4443 20.3944 98.9561 20.3944 99.3789 20.6157L105.854 24.057C106.878 24.6001 108.102 23.7752 107.835 22.7286L106.099 16.209C105.988 15.7663 106.144 15.3236 106.522 15.0218L112.374 10.3734C113.22 9.66907 112.73 8.36108 111.573 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M83.373 8.26046L75.6072 7.59641C75.1177 7.55616 74.6947 7.27444 74.4946 6.85186L71.7131 0.75461C71.2681 -0.251537 69.6879 -0.251537 69.2429 0.75461L66.4836 6.85186C66.3056 7.27444 65.8606 7.55616 65.371 7.59641L57.6051 8.26046C56.4479 8.36108 55.9806 9.66907 56.8485 10.3734L62.7008 15.0218C63.0791 15.3236 63.2348 15.7663 63.1236 16.209L61.3657 22.7286C61.0986 23.7551 62.3225 24.6001 63.3461 24.057L69.8214 20.6157C70.2442 20.3944 70.756 20.3944 71.1788 20.6157L77.6544 24.057C78.678 24.6001 79.9019 23.7752 79.6346 22.7286L77.8989 16.209C77.7877 15.7663 77.9435 15.3236 78.3217 15.0218L84.174 10.3734C85.0196 9.66907 84.5301 8.36108 83.373 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M55.1729 8.26046L47.4071 7.59641C46.9176 7.55616 46.4946 7.27444 46.2945 6.85186L43.513 0.75461C43.068 -0.251537 41.4879 -0.251537 41.0428 0.75461L38.2836 6.85186C38.1055 7.27444 37.6605 7.55616 37.171 7.59641L29.405 8.26046C28.2479 8.36108 27.7806 9.66907 28.6484 10.3734L34.5007 15.0218C34.879 15.3236 35.0348 15.7663 34.9235 16.209L33.1656 22.7286C32.8986 23.7551 34.1224 24.6001 35.146 24.057L41.6214 20.6157C42.0442 20.3944 42.556 20.3944 42.9787 20.6157L49.4543 24.057C50.4779 24.6001 51.7018 23.7752 51.4345 22.7286L49.6989 16.209C49.5876 15.7663 49.7434 15.3236 50.1217 15.0218L55.974 10.3734C56.8195 9.66907 56.33 8.36108 55.1729 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M26.9728 8.26046L19.2071 7.59641C18.7175 7.55616 18.2945 7.27444 18.0945 6.85186L15.3129 0.75461C14.8679 -0.251537 13.2878 -0.251537 12.8427 0.75461L10.0835 6.85186C9.90547 7.27444 9.46043 7.55616 8.97088 7.59641L1.20491 8.26046C0.0477969 8.36108 -0.419497 9.66907 0.448334 10.3734L6.30063 15.0218C6.67892 15.3236 6.83468 15.7663 6.72342 16.209L4.96551 22.7286C4.69848 23.7551 5.92235 24.6001 6.94594 24.057L13.4213 20.6157C13.8441 20.3944 14.3559 20.3944 14.7787 20.6157L21.2543 24.057C22.2778 24.6001 23.5017 23.7752 23.2345 22.7286L21.4988 16.209C21.3875 15.7663 21.5433 15.3236 21.9216 15.0218L27.7739 10.3734C28.6195 9.66907 28.1299 8.36108 26.9728 8.26046Z"
              fill="#FFC107"
            />
          </svg>
          <p className="text-center mt-4 text-black font-semibold">
            ""This is my second rental with <br /> Antonio - great equipment,
            great <br /> price and brilliant service!"."
          </p>
        </div>
        <div className="max-w-[385px] flex-1 min-h-[384px] shadow-xl bg-gray-100 rounded-md p-4 flex flex-col items-center justify-center m-4">
          <img
            className="w-[187px] h-[179px] rounded-full"
            src={testimonial3}
            alt="User"
          />
          <p className="text-center mt-4 text-black font-semibold">
            Zoe,Spain{" "}
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="141"
            height="25"
            viewBox="0 0 141 25"
            fill="none"
          >
            <path
              d="M139.773 8.26046L132.007 7.59641C131.518 7.55616 131.095 7.27444 130.895 6.85186L128.113 0.75461C127.668 -0.251537 126.088 -0.251537 125.643 0.75461L122.884 6.85186C122.706 7.27444 122.261 7.55616 121.771 7.59641L114.005 8.26046C112.848 8.36108 112.381 9.66907 113.249 10.3734L119.101 15.0218C119.479 15.3236 119.635 15.7663 119.524 16.209L117.766 22.7286C117.499 23.7551 118.723 24.6001 119.746 24.057L126.221 20.6157C126.644 20.3944 127.156 20.3944 127.579 20.6157L134.054 24.057C135.078 24.6001 136.302 23.7752 136.035 22.7286L134.299 16.209C134.188 15.7663 134.343 15.3236 134.722 15.0218L140.574 10.3734C141.42 9.66907 140.93 8.36108 139.773 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M111.573 8.26046L103.807 7.59641C103.318 7.55616 102.895 7.27444 102.695 6.85186L99.9132 0.75461C99.4681 -0.251537 97.888 -0.251537 97.443 0.75461L94.6837 6.85186C94.5057 7.27444 94.0606 7.55616 93.5711 7.59641L85.8051 8.26046C84.648 8.36108 84.1807 9.66907 85.0486 10.3734L90.9009 15.0218C91.2791 15.3236 91.4349 15.7663 91.3236 16.209L89.5657 22.7286C89.2987 23.7551 90.5226 24.6001 91.5462 24.057L98.0215 20.6157C98.4443 20.3944 98.9561 20.3944 99.3789 20.6157L105.854 24.057C106.878 24.6001 108.102 23.7752 107.835 22.7286L106.099 16.209C105.988 15.7663 106.144 15.3236 106.522 15.0218L112.374 10.3734C113.22 9.66907 112.73 8.36108 111.573 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M83.373 8.26046L75.6072 7.59641C75.1177 7.55616 74.6947 7.27444 74.4946 6.85186L71.7131 0.75461C71.2681 -0.251537 69.6879 -0.251537 69.2429 0.75461L66.4836 6.85186C66.3056 7.27444 65.8606 7.55616 65.371 7.59641L57.6051 8.26046C56.4479 8.36108 55.9806 9.66907 56.8485 10.3734L62.7008 15.0218C63.0791 15.3236 63.2348 15.7663 63.1236 16.209L61.3657 22.7286C61.0986 23.7551 62.3225 24.6001 63.3461 24.057L69.8214 20.6157C70.2442 20.3944 70.756 20.3944 71.1788 20.6157L77.6544 24.057C78.678 24.6001 79.9019 23.7752 79.6346 22.7286L77.8989 16.209C77.7877 15.7663 77.9435 15.3236 78.3217 15.0218L84.174 10.3734C85.0196 9.66907 84.5301 8.36108 83.373 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M55.1729 8.26046L47.4071 7.59641C46.9176 7.55616 46.4946 7.27444 46.2945 6.85186L43.513 0.75461C43.068 -0.251537 41.4879 -0.251537 41.0428 0.75461L38.2836 6.85186C38.1055 7.27444 37.6605 7.55616 37.171 7.59641L29.405 8.26046C28.2479 8.36108 27.7806 9.66907 28.6484 10.3734L34.5007 15.0218C34.879 15.3236 35.0348 15.7663 34.9235 16.209L33.1656 22.7286C32.8986 23.7551 34.1224 24.6001 35.146 24.057L41.6214 20.6157C42.0442 20.3944 42.556 20.3944 42.9787 20.6157L49.4543 24.057C50.4779 24.6001 51.7018 23.7752 51.4345 22.7286L49.6989 16.209C49.5876 15.7663 49.7434 15.3236 50.1217 15.0218L55.974 10.3734C56.8195 9.66907 56.33 8.36108 55.1729 8.26046Z"
              fill="#FFC107"
            />
            <path
              d="M26.9728 8.26046L19.2071 7.59641C18.7175 7.55616 18.2945 7.27444 18.0945 6.85186L15.3129 0.75461C14.8679 -0.251537 13.2878 -0.251537 12.8427 0.75461L10.0835 6.85186C9.90547 7.27444 9.46043 7.55616 8.97088 7.59641L1.20491 8.26046C0.0477969 8.36108 -0.419497 9.66907 0.448334 10.3734L6.30063 15.0218C6.67892 15.3236 6.83468 15.7663 6.72342 16.209L4.96551 22.7286C4.69848 23.7551 5.92235 24.6001 6.94594 24.057L13.4213 20.6157C13.8441 20.3944 14.3559 20.3944 14.7787 20.6157L21.2543 24.057C22.2778 24.6001 23.5017 23.7752 23.2345 22.7286L21.4988 16.209C21.3875 15.7663 21.5433 15.3236 21.9216 15.0218L27.7739 10.3734C28.6195 9.66907 28.1299 8.36108 26.9728 8.26046Z"
              fill="#FFC107"
            />
          </svg>
          <p className="text-center mt-4 text-black font-semibold">
            "Excellent communication,
            <br /> absolutely lovely people, amazing <br /> gimbal and an
            incredibly smooth <br /> process!".
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
