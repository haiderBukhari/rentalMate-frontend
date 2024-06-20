import React, { useState } from "react";
import Navbar from "../../Components/Navbar/index";
import Footer from "../../Components/Footer/Index";
import { GoogleMap, LoadScript, Autocomplete } from '@react-google-maps/api';

const Index = () => {
  const [images, setImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(-1);

  const handleImageChange = (e) => {
    const newImages = [...images];
    for (let i = 0; i < e.target.files.length; i++) {
      const imageUrl = URL.createObjectURL(e.target.files[i]);
      newImages.push({
        url: imageUrl,
        isMain: mainImageIndex === -1 ? false : false,
      });
    }
    setImages(newImages);
  };

  const handleSetAsMain = (index) => {
    setMainImageIndex(index);
    const updatedImages = images.map((image, i) => ({
      ...image,
      isMain: i === index,
    }));
    setImages(updatedImages);
  };
  const handleQuantityChange = (newValue) => {
    console.log("New quantity value: " + newValue);
  };
  return (
    <div>
      <Navbar />
      <div className="w-11/12 mx-auto mt-4 bg-black px-4 py-8">
        <div className="">
          <div className="flex flex-col items-center">
            {mainImageIndex !== -1 && (
              <img
                src={images[mainImageIndex].url}
                alt="Main"
                className="w-80  h-40 rounded-lg mb-4"
              />
            )}

            <div className="flex space-x-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleSetAsMain(index)}
                  className={`w-20 h-20 cursor-pointer ${mainImageIndex === index ? "border-4 border-blue-500" : ""
                    }`}
                >
                  <img
                    src={image.url}
                    alt={`Images ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  {!image.isMain && (
                    <div className="text-sm text-center mt-2">Set as Main</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* File input for uploading images */}
          <div className="text-3xl font-bold text-white text-center mt-2 mb-12">
            New Listing
          </div>
          <div className="text-center">
            <div className="w-[200px] h-[200px] bg-[#FAFAFA] rounded-xl relative flex justify-center items-center mx-auto">
              <input
                className="h-full w-full absolute left-0 top-0 z-10 opacity-0"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
              />
              <svg className="absolute z-0" width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.1625 1L16.7 4.55H3.2375C2.94367 4.55 2.65271 4.60787 2.38125 4.72032C2.10978 4.83276 1.86312 4.99758 1.65535 5.20535C1.44758 5.41312 1.28276 5.65978 1.17032 5.93124C1.05787 6.20271 1 6.49367 1 6.7875V35.8125C0.999991 36.4071 1.23533 36.9775 1.65458 37.3991C2.07384 37.8207 2.64293 38.0592 3.2375 38.0625H47.5125C48.1071 38.0592 48.6762 37.8207 49.0954 37.3991C49.5147 36.9775 49.75 36.4071 49.75 35.8125V6.7875C49.75 6.49367 49.6921 6.20271 49.5797 5.93124C49.4672 5.65978 49.3024 5.41312 49.0946 5.20535C48.8869 4.99758 48.6402 4.83276 48.3688 4.72032C48.0973 4.60787 47.8063 4.55 47.5125 4.55H34.05L30.5875 1H20.1625ZM43.825 8.175C44.435 8.175 45.02 8.41732 45.4513 8.84865C45.8827 9.27999 46.125 9.865 46.125 10.475C46.125 11.085 45.8827 11.67 45.4513 12.1013C45.02 12.5327 44.435 12.775 43.825 12.775C43.215 12.775 42.63 12.5327 42.1987 12.1013C41.7673 11.67 41.525 11.085 41.525 10.475C41.525 9.865 41.7673 9.27999 42.1987 8.84865C42.63 8.41732 43.215 8.175 43.825 8.175ZM25.375 12.175C27.4789 12.175 29.5356 12.7989 31.2849 13.9677C33.0342 15.1366 34.3976 16.798 35.2028 18.7417C36.0079 20.6855 36.2186 22.8243 35.8081 24.8878C35.3977 26.9512 34.3845 28.8467 32.8968 30.3343C31.4092 31.822 29.5137 32.8352 27.4503 33.2456C25.3868 33.6561 23.248 33.4454 21.3042 32.6403C19.3605 31.8351 17.6991 30.4717 16.5302 28.7224C15.3614 26.973 14.7375 24.9164 14.7375 22.8125C14.7375 19.9913 15.8582 17.2856 17.8532 15.2906C19.8481 13.2957 22.5538 12.175 25.375 12.175Z" stroke="#C1C1C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </div>
            <h3 className="text-white font-semibold text-lg text-center mt-3">Cover Picture</h3>
          </div>
          <div className="max-w-4xl w-full mx-auto">
            <h3 className="text-white font-semibold text-lg my-4">Add Photos</h3>
            <div className="flex justify-between">
              <div className="w-[120px] h-[100px] bg-[#FAFAFA] rounded-xl relative flex justify-center items-center">
                <input
                  className="h-full w-full absolute left-0 top-0 z-10 opacity-0"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <svg className="absolute z-0" width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1625 1L16.7 4.55H3.2375C2.94367 4.55 2.65271 4.60787 2.38125 4.72032C2.10978 4.83276 1.86312 4.99758 1.65535 5.20535C1.44758 5.41312 1.28276 5.65978 1.17032 5.93124C1.05787 6.20271 1 6.49367 1 6.7875V35.8125C0.999991 36.4071 1.23533 36.9775 1.65458 37.3991C2.07384 37.8207 2.64293 38.0592 3.2375 38.0625H47.5125C48.1071 38.0592 48.6762 37.8207 49.0954 37.3991C49.5147 36.9775 49.75 36.4071 49.75 35.8125V6.7875C49.75 6.49367 49.6921 6.20271 49.5797 5.93124C49.4672 5.65978 49.3024 5.41312 49.0946 5.20535C48.8869 4.99758 48.6402 4.83276 48.3688 4.72032C48.0973 4.60787 47.8063 4.55 47.5125 4.55H34.05L30.5875 1H20.1625ZM43.825 8.175C44.435 8.175 45.02 8.41732 45.4513 8.84865C45.8827 9.27999 46.125 9.865 46.125 10.475C46.125 11.085 45.8827 11.67 45.4513 12.1013C45.02 12.5327 44.435 12.775 43.825 12.775C43.215 12.775 42.63 12.5327 42.1987 12.1013C41.7673 11.67 41.525 11.085 41.525 10.475C41.525 9.865 41.7673 9.27999 42.1987 8.84865C42.63 8.41732 43.215 8.175 43.825 8.175ZM25.375 12.175C27.4789 12.175 29.5356 12.7989 31.2849 13.9677C33.0342 15.1366 34.3976 16.798 35.2028 18.7417C36.0079 20.6855 36.2186 22.8243 35.8081 24.8878C35.3977 26.9512 34.3845 28.8467 32.8968 30.3343C31.4092 31.822 29.5137 32.8352 27.4503 33.2456C25.3868 33.6561 23.248 33.4454 21.3042 32.6403C19.3605 31.8351 17.6991 30.4717 16.5302 28.7224C15.3614 26.973 14.7375 24.9164 14.7375 22.8125C14.7375 19.9913 15.8582 17.2856 17.8532 15.2906C19.8481 13.2957 22.5538 12.175 25.375 12.175Z" stroke="#C1C1C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="w-[120px] h-[100px] bg-[#FAFAFA] rounded-xl relative flex justify-center items-center">
                <input
                  className="h-full w-full absolute left-0 top-0 z-10 opacity-0"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <svg className="absolute z-0" width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1625 1L16.7 4.55H3.2375C2.94367 4.55 2.65271 4.60787 2.38125 4.72032C2.10978 4.83276 1.86312 4.99758 1.65535 5.20535C1.44758 5.41312 1.28276 5.65978 1.17032 5.93124C1.05787 6.20271 1 6.49367 1 6.7875V35.8125C0.999991 36.4071 1.23533 36.9775 1.65458 37.3991C2.07384 37.8207 2.64293 38.0592 3.2375 38.0625H47.5125C48.1071 38.0592 48.6762 37.8207 49.0954 37.3991C49.5147 36.9775 49.75 36.4071 49.75 35.8125V6.7875C49.75 6.49367 49.6921 6.20271 49.5797 5.93124C49.4672 5.65978 49.3024 5.41312 49.0946 5.20535C48.8869 4.99758 48.6402 4.83276 48.3688 4.72032C48.0973 4.60787 47.8063 4.55 47.5125 4.55H34.05L30.5875 1H20.1625ZM43.825 8.175C44.435 8.175 45.02 8.41732 45.4513 8.84865C45.8827 9.27999 46.125 9.865 46.125 10.475C46.125 11.085 45.8827 11.67 45.4513 12.1013C45.02 12.5327 44.435 12.775 43.825 12.775C43.215 12.775 42.63 12.5327 42.1987 12.1013C41.7673 11.67 41.525 11.085 41.525 10.475C41.525 9.865 41.7673 9.27999 42.1987 8.84865C42.63 8.41732 43.215 8.175 43.825 8.175ZM25.375 12.175C27.4789 12.175 29.5356 12.7989 31.2849 13.9677C33.0342 15.1366 34.3976 16.798 35.2028 18.7417C36.0079 20.6855 36.2186 22.8243 35.8081 24.8878C35.3977 26.9512 34.3845 28.8467 32.8968 30.3343C31.4092 31.822 29.5137 32.8352 27.4503 33.2456C25.3868 33.6561 23.248 33.4454 21.3042 32.6403C19.3605 31.8351 17.6991 30.4717 16.5302 28.7224C15.3614 26.973 14.7375 24.9164 14.7375 22.8125C14.7375 19.9913 15.8582 17.2856 17.8532 15.2906C19.8481 13.2957 22.5538 12.175 25.375 12.175Z" stroke="#C1C1C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="w-[120px] h-[100px] bg-[#FAFAFA] rounded-xl relative flex justify-center items-center">
                <input
                  className="h-full w-full absolute left-0 top-0 z-10 opacity-0"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <svg className="absolute z-0" width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1625 1L16.7 4.55H3.2375C2.94367 4.55 2.65271 4.60787 2.38125 4.72032C2.10978 4.83276 1.86312 4.99758 1.65535 5.20535C1.44758 5.41312 1.28276 5.65978 1.17032 5.93124C1.05787 6.20271 1 6.49367 1 6.7875V35.8125C0.999991 36.4071 1.23533 36.9775 1.65458 37.3991C2.07384 37.8207 2.64293 38.0592 3.2375 38.0625H47.5125C48.1071 38.0592 48.6762 37.8207 49.0954 37.3991C49.5147 36.9775 49.75 36.4071 49.75 35.8125V6.7875C49.75 6.49367 49.6921 6.20271 49.5797 5.93124C49.4672 5.65978 49.3024 5.41312 49.0946 5.20535C48.8869 4.99758 48.6402 4.83276 48.3688 4.72032C48.0973 4.60787 47.8063 4.55 47.5125 4.55H34.05L30.5875 1H20.1625ZM43.825 8.175C44.435 8.175 45.02 8.41732 45.4513 8.84865C45.8827 9.27999 46.125 9.865 46.125 10.475C46.125 11.085 45.8827 11.67 45.4513 12.1013C45.02 12.5327 44.435 12.775 43.825 12.775C43.215 12.775 42.63 12.5327 42.1987 12.1013C41.7673 11.67 41.525 11.085 41.525 10.475C41.525 9.865 41.7673 9.27999 42.1987 8.84865C42.63 8.41732 43.215 8.175 43.825 8.175ZM25.375 12.175C27.4789 12.175 29.5356 12.7989 31.2849 13.9677C33.0342 15.1366 34.3976 16.798 35.2028 18.7417C36.0079 20.6855 36.2186 22.8243 35.8081 24.8878C35.3977 26.9512 34.3845 28.8467 32.8968 30.3343C31.4092 31.822 29.5137 32.8352 27.4503 33.2456C25.3868 33.6561 23.248 33.4454 21.3042 32.6403C19.3605 31.8351 17.6991 30.4717 16.5302 28.7224C15.3614 26.973 14.7375 24.9164 14.7375 22.8125C14.7375 19.9913 15.8582 17.2856 17.8532 15.2906C19.8481 13.2957 22.5538 12.175 25.375 12.175Z" stroke="#C1C1C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
              <div className="w-[120px] h-[100px] bg-[#FAFAFA] rounded-xl relative flex justify-center items-center">
                <input
                  className="h-full w-full absolute left-0 top-0 z-10 opacity-0"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                />
                <svg className="absolute z-0" width="51" height="40" viewBox="0 0 51 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.1625 1L16.7 4.55H3.2375C2.94367 4.55 2.65271 4.60787 2.38125 4.72032C2.10978 4.83276 1.86312 4.99758 1.65535 5.20535C1.44758 5.41312 1.28276 5.65978 1.17032 5.93124C1.05787 6.20271 1 6.49367 1 6.7875V35.8125C0.999991 36.4071 1.23533 36.9775 1.65458 37.3991C2.07384 37.8207 2.64293 38.0592 3.2375 38.0625H47.5125C48.1071 38.0592 48.6762 37.8207 49.0954 37.3991C49.5147 36.9775 49.75 36.4071 49.75 35.8125V6.7875C49.75 6.49367 49.6921 6.20271 49.5797 5.93124C49.4672 5.65978 49.3024 5.41312 49.0946 5.20535C48.8869 4.99758 48.6402 4.83276 48.3688 4.72032C48.0973 4.60787 47.8063 4.55 47.5125 4.55H34.05L30.5875 1H20.1625ZM43.825 8.175C44.435 8.175 45.02 8.41732 45.4513 8.84865C45.8827 9.27999 46.125 9.865 46.125 10.475C46.125 11.085 45.8827 11.67 45.4513 12.1013C45.02 12.5327 44.435 12.775 43.825 12.775C43.215 12.775 42.63 12.5327 42.1987 12.1013C41.7673 11.67 41.525 11.085 41.525 10.475C41.525 9.865 41.7673 9.27999 42.1987 8.84865C42.63 8.41732 43.215 8.175 43.825 8.175ZM25.375 12.175C27.4789 12.175 29.5356 12.7989 31.2849 13.9677C33.0342 15.1366 34.3976 16.798 35.2028 18.7417C36.0079 20.6855 36.2186 22.8243 35.8081 24.8878C35.3977 26.9512 34.3845 28.8467 32.8968 30.3343C31.4092 31.822 29.5137 32.8352 27.4503 33.2456C25.3868 33.6561 23.248 33.4454 21.3042 32.6403C19.3605 31.8351 17.6991 30.4717 16.5302 28.7224C15.3614 26.973 14.7375 24.9164 14.7375 22.8125C14.7375 19.9913 15.8582 17.2856 17.8532 15.2906C19.8481 13.2957 22.5538 12.175 25.375 12.175Z" stroke="#C1C1C1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
              </div>
            </div>
            <h3 className="text-white font-medium text-base text-end lg:pr-32 md:pr-16 pr-0 mt-8">Click to reorder,crop or add photo</h3>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <hr className="my-8"></hr>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-2xl font-semibold text-center mb-8">Select Category </h2>
            <div className="grid grid-cols-12 lg:gap-x-8 gap-y-6">
              <div className="lg:col-span-6 col-span-12">
                <div class="w-full">
                  <div class="mb-2">
                    <label for="category" class="text-lg font-medium text-white">
                      Category
                    </label>
                  </div>
                  <select
                    id="category"
                    name="category"
                    class="w-full px-3 h-[48px] border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="" disabled selected> Select Category </option>
                    <option value=""> Category 1 </option>
                    <option value=""> Category 2 </option>
                    <option value=""> Category 3 </option>
                  </select>
                </div>
              </div>
              <div className="lg:col-span-6 col-span-12">
                <div class="w-full">
                  <div class="mb-2">
                    <label for="category" class="text-lg font-medium text-white">
                      Sub Category
                    </label>
                  </div>
                  <select
                    id="category_1"
                    name="category_1"
                    class="w-full px-3 h-[48px] border border-gray-300 rounded-lg text-sm"
                  >
                    <option value="" disabled selected> Select Category </option>
                    <option value=""> Category 1 </option>
                    <option value=""> Category 2 </option>
                    <option value=""> Category 3 </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8"></hr>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-2xl font-semibold text-center mb-8">Describe item</h2>
            <div className="grid grid-cols-12 lg:gap-x-8 gap-y-6">
              <div className="col-span-12">
                <div class="w-full">
                  <div class="mb-2">
                    <label for="title" class="text-lg font-medium text-white">
                      Listing Title
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    placeholder="Title (40 char max)"
                    class="w-full px-3 h-[48px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="col-span-12">
                <div class="w-full">
                  <div class="mb-2">
                    <label for="title" class="text-lg font-medium text-white">
                      Description
                    </label>
                  </div>
                  <textarea
                    id="description"
                    name="description"
                    class="w-full px-3 h-[120px] border border-gray-300 rounded-lg text-sm"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8"></hr>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-2xl font-semibold text-center mb-8">Pricing</h2>
            <p class="text-white text-lg font-semibold">Rental price () per:</p>
            <div className="grid grid-cols-12 lg:gap-x-8 gap-x-2 gap-y-6">
              <div className="md:col-span-4 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-lg font-medium text-white">
                      Hour
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-base font-medium text-white">
                      Day
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-base font-medium text-white">
                      Min Rental Days
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-3 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-base font-medium text-white">
                      Quantity
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-3 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-base font-medium text-white">
                      Item value
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-6 col-span-12">
                <div class="w-full h-full">
                  <div class="flex gap-x-3 items-end h-full pb-2">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="delivery"
                        name="deliveryOption"
                        value="delivery"
                        class="mr-2 w-5 h-5"
                      />
                      <label for="delivery" class="text-white text-sm mr-4">
                        Delivery Available
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="collection"
                        name="deliveryOption"
                        value="collection"
                        class="mr-2 w-5 h-5 "
                      />
                      <label for="collection" class="text-white text-sm mr-4">
                        Collection Only
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <hr className="my-8"></hr>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-white text-2xl font-semibold text-center mb-4">Address Information</h2>\
            <div className="grid grid-cols-12 lg:gap-x-8 gap-y-6">
              <div className="md:col-span-4 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-lg font-medium text-white">
                      Postcode
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
              <div className="md:col-span-4 col-span-6">
                <div class="w-full">
                  <div class="my-2">
                    <label for="title" class="text-lg font-medium text-white">
                      Address
                    </label>
                  </div>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    maxlength="40"
                    class="w-full px-3 h-[35px] border border-gray-300 placeholder:text-black rounded-lg text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-11/12 mx-auto mb-32">
        <div className="lg:w-[35%] md:w-[60%] w-full text-center flex gap-x-6 mt-8 ml-auto">
          <button class="w-[50%] py-3 tracking-widest rounded-[18px] text-base bg-white buttonShadow font-bold">
            Delete{" "}
          </button>
          <button class="w-[50%] py-3 tracking-widest rounded-[18px] text-base bg-primary text-white buttonShadow font-bold">
            List new item{" "}
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Index;
