import React from "react";
import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer/Index";
import manWomanAtTable from "../../Assets/manWomanAtTable.svg";
import item1 from "../../Assets/remote work.svg";
import item2 from "../../Assets/phone with photo feed.svg";
import item3 from "../../Assets/Qr code for charity donations.svg";
import item4 from "../../Assets/Sending messages.svg";
import item5 from "../../Assets/Tracking order delivery on smartphone.svg";
import item6 from "../../Assets/Cyber data security.svg";

const HowItWorks = () => {
  const containerStyle = {
    position: "relative",
    height: "100%",
    backgroundImage: `url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%221440%22 height=%22595%22 viewBox=%220 0 1440 595%22 fill=%22none%22%3E%3Cpath d=%22M889.309 101.741C1448.06 106.617 1702.36 -103.647 1700.17 147.77C1697.97 399.188 1243.24 599.05 684.496 594.173C125.749 589.297 -329.762 557.999 -327.567 306.582C-325.373 55.1639 289.596 -118.953 889.309 101.741Z%22 fill=%22%23BDFFC0%22/%3E%3C/svg%3E')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    paddingLeft: "4%",
    paddingRight: "6%",
  };
  return (
    <div>
      <Navbar />
      <div className="relative flex mx-10 mt-10 justify-between">
        <div className="space-y-4 w-7/12 mt-16">
          <div className="text-[#01A664] text-[30px] font-semibold  ">
            How Rentmyitem works?
          </div>
          <div>
            Renting anything you need has never been easier than with Rental
            Mate. Our extensive marketplace connects renters with owners of a
            wide variety of items, from everyday essentials to unique and
            hard-to-find treasures. Whether you're looking for a camera for a
            weekend trip, a power tool for a home project, or a costume for a
            special occasion, we have you covered.
          </div>
        </div>
        <img src={manWomanAtTable} />
        <div className="absolute bottom-20 left-[45%] text-[#01A664] text-[25px] font-semibold  ">
          How to Borrow?
        </div>
      </div>
      <div style={containerStyle}>
        <div className="w-full flex justify-start">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[250px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 01
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">Create an Account</div>
              <div className="text-[14px]">
                To get started, simply create a free account on Rentmyitem.
                This will allow you to browse listings, save items to your
                favorites, and communicate with owners.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[200px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 02
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">Search for Items</div>
              <div className="text-[14px]">
                Use our powerful search bar to find the items you need. You can
                filter your search by location, category, price, and
                availability.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[200px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 03
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">Contact the Owner</div>
              <div className="text-[14px]">
                Once you've found an item you're interested in, contact the
                owner to inquire about availability, pricing, and any other
                details.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[250px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 04
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">Book the Item</div>
              <div className="text-[14px]">
                If you're ready to rent the item, book it through our secure
                online payment system. You'll receive a confirmation email with
                all the details of your rental.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-start">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[110px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 05
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">
                Pick Up or Arrange Delivery
              </div>
              <div className="text-[14px]">
                Coordinate with the owner to pick up the item or arrange for
                delivery.
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-end">
          <div className="flex items-center w-[50%] bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
            <div className="rounded-full h-[100px] flex items-center justify-center w-[170px] shadow-xl">
              <div className="font-semibold text-[15px] text-center ">
                Step 06
              </div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-[15px]">Enjoy and Return</div>
              <div className="text-[14px]">
                Once you have the item, enjoy it responsibly and return it to
                the owner in the same condition you received it.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-10">
        <div className=" pt-12 text-center text-[#01A664] text-[25px] font-semibold  ">
          How to become owner?
        </div>
        <div className="py-10 mb-10">
          <div className="flex justify-end w-full ">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className="flex gap-5 mt-14 ">
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 01
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="123"
                    viewBox="0 0 24 123"
                    fill="none"
                  >
                    <path
                      d="M10.9393 122.061C11.5251 122.646 12.4749 122.646 13.0607 122.061L22.6066 112.515C23.1924 111.929 23.1924 110.979 22.6066 110.393C22.0208 109.808 21.0711 109.808 20.4853 110.393L12 118.879L3.51472 110.393C2.92893 109.808 1.97919 109.808 1.3934 110.393C0.807611 110.979 0.807611 111.929 1.3934 112.515L10.9393 122.061ZM10.5 0L10.5 121H13.5L13.5 0L10.5 0Z"
                      fill="#01A664"
                    />
                  </svg>
                </div>
              </div>
              <div className="flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item1} />
                </div>
                <div className="text-[14px]">
                  If you have items you'd like to rent, create a free account on
                  Rentmyitem. This will allow you to list your items for rent
                  and manage your bookings.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start w-full ">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className=" -mt-9 flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item2} />
                </div>
                <div className="text-[14px]">
                  Take clear and well-lit photos of your items and provide
                  detailed descriptions
                </div>
              </div>
              <div className="flex gap-5 mt-2 ">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="123"
                    viewBox="0 0 24 123"
                    fill="none"
                  >
                    <path
                      d="M10.9393 122.061C11.5251 122.646 12.4749 122.646 13.0607 122.061L22.6066 112.515C23.1924 111.929 23.1924 110.979 22.6066 110.393C22.0208 109.808 21.0711 109.808 20.4853 110.393L12 118.879L3.51472 110.393C2.92893 109.808 1.97919 109.808 1.3934 110.393C0.807611 110.979 0.807611 111.929 1.3934 112.515L10.9393 122.061ZM10.5 0L10.5 121H13.5L13.5 0L10.5 0Z"
                      fill="#01A664"
                    />
                  </svg>
                </div>
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 02
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full ">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className="flex gap-5 mt-2 ">
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 03
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="123"
                    viewBox="0 0 24 123"
                    fill="none"
                  >
                    <path
                      d="M10.9393 122.061C11.5251 122.646 12.4749 122.646 13.0607 122.061L22.6066 112.515C23.1924 111.929 23.1924 110.979 22.6066 110.393C22.0208 109.808 21.0711 109.808 20.4853 110.393L12 118.879L3.51472 110.393C2.92893 109.808 1.97919 109.808 1.3934 110.393C0.807611 110.979 0.807611 111.929 1.3934 112.515L10.9393 122.061ZM10.5 0L10.5 121H13.5L13.5 0L10.5 0Z"
                      fill="#01A664"
                    />
                  </svg>
                </div>
              </div>
              <div className="-mt-9 flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item3} />
                </div>
                <div className="text-[14px]">
                  Determine a competitive rental price for your items,
                  considering their value, condition, and demand.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start w-full ">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className=" -mt-9 flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item4} />
                </div>
                <div className="text-[14px]">
                  Once you receive a booking request, review the renter's
                  profile and communicate with them to confirm details.
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="123"
                    viewBox="0 0 24 123"
                    fill="none"
                  >
                    <path
                      d="M10.9393 122.061C11.5251 122.646 12.4749 122.646 13.0607 122.061L22.6066 112.515C23.1924 111.929 23.1924 110.979 22.6066 110.393C22.0208 109.808 21.0711 109.808 20.4853 110.393L12 118.879L3.51472 110.393C2.92893 109.808 1.97919 109.808 1.3934 110.393C0.807611 110.979 0.807611 111.929 1.3934 112.515L10.9393 122.061ZM10.5 0L10.5 121H13.5L13.5 0L10.5 0Z"
                      fill="#01A664"
                    />
                  </svg>
                </div>
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 04
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end w-full">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className="flex gap-5 mt-2 ">
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 05
                </div>
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="123"
                    viewBox="0 0 24 123"
                    fill="none"
                  >
                    <path
                      d="M10.9393 122.061C11.5251 122.646 12.4749 122.646 13.0607 122.061L22.6066 112.515C23.1924 111.929 23.1924 110.979 22.6066 110.393C22.0208 109.808 21.0711 109.808 20.4853 110.393L12 118.879L3.51472 110.393C2.92893 109.808 1.97919 109.808 1.3934 110.393C0.807611 110.979 0.807611 111.929 1.3934 112.515L10.9393 122.061ZM10.5 0L10.5 121H13.5L13.5 0L10.5 0Z"
                      fill="#01A664"
                    />
                  </svg>
                </div>
              </div>
              <div className="-mt-9 flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item5} />
                </div>
                <div className="text-[14px]">
                  Coordinate with the borrower to hand off the item or arrange
                  for delivery.
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-start w-full ">
            <div className="mr-2 w-[55%] flex gap-10 items-start">
              <div className=" -mt-9 flex items-center  bg-white shadow-xl rounded-2xl gap-5 p-5 border-2">
                <div className=" h-[80px] flex items-center justify-center w-[150px] ">
                  <img src={item6} />
                </div>
                <div className="text-[14px]">
                  Once the rental period is over, collect payment through our
                  secure online payment system.
                </div>
              </div>
              <div className="flex gap-5 mt-2">
                <div className="flex flex-col items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <circle cx="15" cy="15" r="15" fill="#01A664" />
                  </svg>
                </div>
                <div className="mt-1 text-[#01A664] text-[14px] font-semibold">
                  Step 06
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HowItWorks;
