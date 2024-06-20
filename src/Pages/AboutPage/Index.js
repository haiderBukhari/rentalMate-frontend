import React from "react";
import AboutBanner from "../../Assets/AboutBanner.png";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";
import AboutImg1 from "../../Assets/about1.png";
import AboutImg2 from "../../Assets/about2.png";
import AboutImg3 from "../../Assets/about3.png";
const Index = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-6 relative bg-cover bg-center w-full h-[230px] md:h-[530px]"
        style={{ backgroundImage: `url(${AboutBanner})`, backgroundPosition: "center", width: "auto" }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="w-[100%] md:w-[80%] lg:w-[60%] xl:w-[50%] h-[auto] md:h-[319px] flex justify-center items-center rounded-[50px] p-8"
            style={{
              background:
                "linear-gradient(145deg, rgba(244, 244, 244, 0.40) -4.23%, rgba(244, 244, 244, 0.20) 102.58%, rgba(244, 244, 244, 0.20) 102.58%)",
              boxShadow: "0px 4px 15px 0px rgba(11, 47, 138, 0.60)",
            }}
          >
            <p className="text-white text-center font-bold text-[50px]">
              ABOUT US
            </p>
          </div>
        </div>
      </div>
      <div className="w-11/12 mb-10 mx-auto">
        <div className="mt-16 flex justify-between flex-wrap md:flex-nowrap flex-col md:flex-row">
          <div className="w-5/5 md:w-4/5">
            <h1 className="font-bold text-xl">
              Welcome to Lend Anything, your one-stop shop for borrowing and
              lending <br />
              anything!
            </h1>
            <p className="mt-10 text-xl">
              We believe that sharing resources is essential for building a more
              <br />
              sustainable and equitable world. That's why we've created
              LendAnything, a <br /> platform that connects people who have
              things they don't need with <br /> people who need those things
            </p>
          </div>
          <img src={AboutImg1} alt="" />
        </div>
        <div className="mt-16 flex flex-wrap md:flex-nowrap flex-col-reverse md:flex-row items-center gap-20">
          <img src={AboutImg2} alt="" />
          <div>
            <h1 className="font-bold text-xl">How does it work?</h1>
            <p className="mt-10 text-xl text-justify">
              To lend an item, simply create a listing on our website. Be sure
              to include a description of the item, photos, and your <br />{" "}
              availability. Once your listing is active, other users will be
              able to browse and borrow it. <br /> To borrow an item, simply
              search for what you need on our website. Once you've found an item
              you're interested in, contact <br /> the lender to arrange the
              borrowing
            </p>
          </div>
        </div>
        <div className="mt-16 mb-[100px] flex flex-wrap md:flex-nowrap">
          <div>
            <h1 className="font-bold text-xl">
              Why should you use LendAnything?
            </h1>
            <p className="mt-10 text-xl">
              There are many benefits to using LendAnything, including:
              <ol>
                <li className="list-disc ml-8">
                  Save money: Borrowing items instead of buying them can save
                  you a lot of money.
                </li>
                <li className="list-disc ml-8">
                  Reduce waste: By sharing resources, we can help to reduce the
                  amount of waste going to landfills.
                </li>
                <li className="list-disc ml-8">
                  Build community: LendAnything is a great way to connect with
                  your neighbors and build a sense of community.
                </li>
              </ol>
            </p>
          </div>
          <img src={AboutImg3} alt="" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
