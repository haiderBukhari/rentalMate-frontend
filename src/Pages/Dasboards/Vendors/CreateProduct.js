import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../Components/Navbar";
import Footer from "../../../Components/Footer/Index";
import upload from "../../../Assets/upload.png";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const CreateProduct = () => {
  const location = useLocation(); // Get the current location using the useLocation hook
  const [edit, setEdit] = useState(location.pathname.includes("edit"));

  useEffect(() => {
    setEdit(location.pathname.includes("edit"));
  }, [location]);
  const { id } = useParams();

  const [coverImage, setCoverImage] = useState("");
  const [tempPics, setTempPics] = useState(["", "", "", ""]);
  const [customerChecked, setCustomerChecked] = useState(true);
  const [vendorChecked, setVendorChecked] = useState(false);
  const [address, setAddress] = useState("");
  const userId = useSelector((state) => state.id);

  const handleCustomerChange = () => {
    setCustomerChecked(true);
    setVendorChecked(false);
    setProfile({ ...profile, isDeliverable: true });
  };

  const handleVendorChange = () => {
    setVendorChecked(true);
    setCustomerChecked(false);
    setProfile({ ...profile, isDeliverable: false });
  };
  const [profile, setProfile] = useState({
    title: "",
    description: "",
    price: "",
    pricePerHour: "",
    pricePerDay: "",
    images: [],
    owner: useSelector((state) => state.id),
    category: "",
    isDeliverable: customerChecked,
    availableDays: "",
    manufacturer: {
      name: "",
      address: "",
    },
    isAvailable: true,
    quantity: "",
  });

  useEffect(() => {
    if (edit) {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/products/${id}`, {
          headers: { Authorization: `${token}` },
        })
        .then((res) => {
          setProfile(res.data.product);
          setAddress(res.data.product.manufacturer.address);
          setCoverImage(res.data.product.images[0]);
          if (res.data.product.images.length > 1) {
            const temp = ["", "", "", ""];
            for (let i = 1; i < res.data.product.images.length; i++) {
              temp[i - 1] = res.data.product.images[i];
            }
            setTempPics(temp);
          }
        })
        .catch((err) => console.log(err));
    }
  }, [edit]);

  const token = useSelector((state) => state.userID);
  const Navigate = useNavigate();
  const categories = [
    "Electronics",
    "Home and Garden",
    "Party",
    "Film and Photography",
    "Sports and leisures",
    "Construction Tools",
    "Others",
  ];

  const handleUpdate = () => {
    if (
      !profile.title ||
      !profile.description ||
      !profile.price ||
      !profile.pricePerDay ||
      !profile.category ||
      !coverImage
    ) {
      alert("All fields are required");
      return;
    }
    let tempprofile = { ...profile };
    tempprofile.images = [];
    tempprofile.images.push(coverImage);
    for (let i = 0; i < 4; i++) {
      if (tempPics[i]) {
        tempprofile.images.push(tempPics[i]);
      }
    }
    tempprofile.manufacturer.address = address;
    setProfile(tempprofile);
    if (edit) {
      axios
        .put(
          `${process.env.REACT_APP_BACKEND_URL}/products/${id}`,
          tempprofile,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((res) => {
          Navigate("/vendor/dashboard");
        })
        .catch((err) => alert(err));
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/products`,
          tempprofile,
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((res) => {
          Navigate("/vendor/dashboard");
        })
        .catch((err) => alert(err));
    }
  };
  const ImageUpload = (event, number) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const img = new Image();

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          const maxWidth = 300; // Set your desired maximum width
          const maxHeight = 150; // Set your desired maximum height

          let width = img.width;
          let height = img.height;

          // Resize the image if necessary
          if (width > maxWidth || height > maxHeight) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }

            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);

          // Get the compressed image as a base64 string
          const compressedBase64 = canvas.toDataURL("image/jpeg", 0.5); // Adjust the quality as needed
          if (number === 0) setCoverImage(compressedBase64);
          else {
            const temp = [...tempPics];
            temp[number - 1] = compressedBase64;
            setTempPics(temp);
          }

          // let tempprofile = { ...profile };
          // tempprofile.images.push(compressedBase64);
          // setProfile(tempprofile);
        };
        img.src = reader.result;
      };

      reader.readAsDataURL(file);
    }
  };

  const mapRef = useRef(null); // Use useRef for the map container

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places,drawing,geometry`;
    script.async = true;
    document.body.appendChild(script);

    script.onload = () => {
      const autocomplete = new window.google.maps.places.Autocomplete(
        document.querySelector("#addressInput"),
        { types: ["geocode"] }
      );

      if (window.google) {
        initMap();
        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          console.log(place.formatted_address);

          setAddress(place.formatted_address);
          // setProfile({
          //   ...profile,
          //   manufacturer: {
          //     ...profile.manufacturer,
          //     address: place.formatted_address,
          //   },
          // });

          if (place.geometry && place.geometry.location) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            updateMapCenter(lat, lng);
          }
        });
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [window.google]);

  useEffect(() => {
    if (window.google) {
      initMap();
    }
  }, [window.google]);

  const initMap = () => {
    if (window.google && window.google.maps) {
      const mapContainer = mapRef.current;
      if (!mapContainer) return;

      const map = new window.google.maps.Map(mapContainer, {
        zoom: 13,
        center: { lat: defaultLatitude, lng: defaultLongitude },
      });

      // Use a `let` variable to store the listener reference
      const existingListeners = map?.event?.getListeners("click");
      if (existingListeners && existingListeners.length > 0) {
        existingListeners.forEach((listener) => listener.remove());
      }

      const clickListener = map.addListener("click", (event) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        if (map.markers && map.markers.length > 0) {
          map.markers[0].setMap(null); // Set the existing marker's map to null to remove it
        }
        // Create a new marker and update profile address
        const newMarker = new window.google.maps.Marker({
          position: { lat, lng },
          map: map,
          title: "Your selected location",
        });
        map.setCenter({ lat, lng });
        map.markers = [newMarker]; // Update the marker array with the new marker

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            const formattedAddress = results[0].formatted_address;
            alert(formattedAddress);
            setAddress(formattedAddress);
            // setProfile({
            //   ...profile,
            //   manufacturer: {
            //     ...profile.manufacturer,
            //     address: formattedAddress,
            //   },
            // });
          }
        });
      });
      // ... rest of your code

      return () => {
        window.google.maps.event.removeListener(clickListener);
      };
    }
  };

  const updateMapCenter = (lat, lng) => {
    if (window.google) {
      const mapContainer = mapRef.current;
      if (!mapContainer) return;

      const map = new window.google.maps.Map(mapContainer, {
        zoom: 13,
        center: { lat, lng },
      });

      new window.google.maps.Marker({
        position: { lat, lng },
        map: map,
        title: "Your selected location",
      });

      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === "OK" && results[0]) {
          const formattedAddress = results[0].formatted_address;
          setAddress(formattedAddress);
          // setProfile({
          //   ...profile,
          //   manufacturer: {
          //     ...profile.manufacturer,
          //     address: formattedAddress,
          //   },
          // });
        }
      });
    }
  };

  const defaultLatitude = 37.7749;
  const defaultLongitude = -122.4194;

  return (
    <div>
      <Navbar />
      <div className="w-full mx-auto mt-6">
        <h1 className="text-center my-10 pt-16 mb-10 text-2xl font-semibold">
          {edit ? "Update Listing" : "New Listing"}
        </h1>
        <div className="m-4 mb-10 md:mb-32">
          <div
            className="m-5 relative buttonShadow rounded-2xl p-6 md:p-12 w-full mx-auto md:max-w-[900px] shadow-2xl"
            style={{ border: "2px solid #ccc" }}
          >
            <div className="text-center">
              <label
                htmlFor="picture"
                className="mt-5 py-3 mb-4 rounded-2xl text-white font-semibold text-[14px] tracking-[1px] w-[180px] h-[180px] mx-auto cursor-pointer px-3 flex items-center justify-center border-2 border-dashed border-gray-400 hover:border-blue-500 hover:bg-gray-50"
              >
                {coverImage ? (
                  <img
                    src={coverImage}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                ) : (
                  <img
                    src={upload}
                    alt=""
                    className="w-full h-full object-cover rounded-2xl"
                  />
                )}
                <input
                  onChange={(e) => {
                    ImageUpload(e, 0);
                  }}
                  id="picture"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                />
              </label>
              <h3 className="text-center mb-4">Cover Photo</h3>
              <div className="flex flex-wrap justify-between">
                {tempPics.map((Item, index) => (
                  <label
                    htmlFor={`picture-${index}`}
                    key={index}
                    className="mt-5 mb-10 py-3 rounded-2xl text-white font-semibold text-[14px] tracking-[1px] w-[120px] h-[120px] mx-auto cursor-pointer px-3 flex items-center justify-center border-2 border-dashed border-gray-400 hover:border-blue-500 hover:bg-gray-50"
                  >
                    {Item ? (
                      <img
                        src={Item}
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    ) : (
                      <img
                        src={upload}
                        alt=""
                        className="w-full h-full object-cover rounded-2xl"
                      />
                    )}
                    <input
                      onChange={(e) => {
                        ImageUpload(e, index + 1);
                      }}
                      id={`picture-${index}`}
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                    />
                  </label>
                ))}
              </div>
              <hr className="mt-2" />
              <div className="flex justify-center flex-col items-center">
                <h1 className="text-normal text-center font-semibold text-primary flex justify-start pl-5 pb-4 pt-10">
                  Product Details
                </h1>
                <div className="flex justify-start pl-4 mt-2 mb-6">
                  <select
                    id="category"
                    name="category"
                    onChange={(e) => {
                      setProfile({ ...profile, category: e.target.value });
                    }}
                    class="w-[260px] px-3 h-[48px] border border-gray-300 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium"
                  >
                    <option value="" disabled selected={!profile?.gender}>
                      {" "}
                      Select Product Category{" "}
                    </option>
                    {categories.map((Item) => (
                      <option
                        value={Item}
                        selected={profile?.category === Item}
                      >
                        {Item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <hr className="mb-2 mt-4" />
              <div className="flex justify-center items-center flex-col">
                <h1 className="text-normal text-center font-semibold text-primary flex justify-start pl-5 pb-4 pt-10">
                  Describe Item
                </h1>
                <input
                  onChange={(e) => {
                    setProfile({ ...profile, title: e.target.value });
                  }}
                  type="text"
                  class="w-[95%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                  placeholder="Product Name"
                  value={profile?.title}
                />
                <textarea
                  cols="10"
                  rows="5"
                  onChange={(e) => {
                    setProfile({ ...profile, description: e.target.value });
                  }}
                  type="text"
                  class="w-[95%] py-3 rounded-md text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                  placeholder="Product Description"
                  value={profile?.description}
                />
              </div>
              <hr className="mb-2 mt-4" />
              <div className="flex justify-center items-center">
                <h1 className="text-normal text-center m-auto font-semibold text-primary flex justify-start pl-5 pb-4 pt-10">
                  Pricing
                </h1>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start px-3">
                <div className="flex flex-col mt-2">
                  <label className="mr-4 mb-2">Rental price per hour:</label>
                  <input
                    onChange={(e) => {
                      setProfile({ ...profile, pricePerHour: e.target.value });
                    }}
                    type="number"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Price"
                    value={profile?.pricePerHour}
                  />
                </div>

                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 ml-4 mb-2">
                    Rental price per Day:
                  </label>
                  <input
                    onChange={(e) => {
                      setProfile({ ...profile, pricePerDay: e.target.value });
                    }}
                    type="number"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Day"
                    value={profile?.pricePerDay}
                  />
                </div>

                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 ml-4 mb-2">Minimum Rental Day:</label>
                  <input
                    onChange={(e) => {
                      setProfile({ ...profile, availableDays: e.target.value });
                    }}
                    type="number"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Minimum Rental Day"
                    value={profile?.availableDays}
                  />
                </div>
              </div>
              <div className="flex flex-wrap justify-center md:justify-start px-3">
                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 ml-4 mb-2">Quantity:</label>
                  <input
                    onChange={(e) => {
                      setProfile({ ...profile, quantity: e.target.value });
                    }}
                    type="number"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Quantity"
                    value={profile?.quantity}
                  />
                </div>
                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 mb-2 ml-4">Item value:</label>
                  <input
                    onChange={(e) => {
                      setProfile({ ...profile, price: e.target.value });
                    }}
                    type="number"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="value"
                    value={profile?.price}
                  />
                </div>
                <div className="flex items-center justify-center flex-wrap">
                  <div>
                    <input
                      type="radio"
                      id="customerCheckbox"
                      name="customer"
                      checked={customerChecked}
                      onChange={handleCustomerChange}
                    />
                    <label
                      className="cursor-pointer mr-6 ml-2"
                      htmlFor="customerCheckbox"
                    >
                      Delivery Available:{" "}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      id="vendorCheckbox"
                      name="vendor"
                      checked={vendorChecked}
                      onChange={handleVendorChange}
                    />
                    <label
                      className="cursor-pointer ml-2"
                      htmlFor="vendorCheckbox"
                    >
                      Collection Only:{" "}
                    </label>
                  </div>
                </div>
              </div>
              <hr className="mb-2 mt-4" />
              <div className="flex justify-center items-center">
                <h1 className="text-normal text-center m-auto font-semibold text-primary flex justify-start pl-5 pb-4 pt-10">
                  Address Information
                </h1>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start px-3">
                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 ml-4 mb-2">Name:</label>
                  <input
                    onChange={(e) => {
                      setProfile({
                        ...profile,
                        manufacturer: {
                          ...profile.manufacturer,
                          name: e.target.value,
                        },
                      });
                    }}
                    type="text"
                    class="mr-4 w-[200px] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Name"
                    value={profile?.manufacturer?.name}
                  />
                </div>
                <div className="flex flex-col justify-start items-start mt-2">
                  <label className="mr-4 ml-4 mb-2">Address:</label>
                  <input
                    id="addressInput"
                    onChange={(e) => {
                      // This part will be used if there's no suggestion from the autocomplete
                      setAddress(e.target.value);
                      // setProfile({
                      //   ...profile,
                      //   manufacturer: {
                      //     ...profile.manufacturer,
                      //     address: e.target.value,
                      //   },
                      // });
                    }}
                    type="text"
                    className="mr-4 max-w-[400px] w-[100%] py-3 rounded-full text-base text-gray-400 bg-[#D9D9D9] font-medium mb-6 pl-4 mx-auto"
                    placeholder="Address"
                    value={address}
                  />
                </div>
                <div
                  ref={mapRef}
                  id="map-container"
                  style={{ width: "100%", height: "300px" }}
                />
                <div style={{ display: "none" }} id="map-loading">
                  Loading map...
                </div>
              </div>
            </div>
          </div>
          <div className="max-w-[900px] flex flex-row flex-wrap justify-center md:justify-end mx-auto">
            {!edit && (
              <div className="flex flex-col justify-end mt-10 items-end">
                <button
                  onClick={handleUpdate}
                  className="mt-5 mr-3 mb-6 py-3 rounded-2xl text-black bg-slate-300 font-semibold text-[14px] tracking-[1px] w-[200px]"
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            )}
            <div className="flex flex-col justify-end mt-10 items-end">
              <button
                disabled={
                  !profile.title ||
                  !profile.description ||
                  !profile.price ||
                  !profile.quantity ||
                  !coverImage ||
                  !profile.manufacturer.name ||
                  !address ||
                  !profile.price ||
                  !profile.pricePerDay ||
                  !profile.category ||
                  !profile.pricePerHour ||
                  !profile.availableDays
                }
                onClick={handleUpdate}
                className="bg-[#01A664] mt-5 mb-6 py-3 rounded-2xl cursor-pointer text-white font-semibold text-[14px] tracking-[1px] w-[200px]"
              >
                {" "}
                {edit ? "Update Listing" : "List a new Item"}{" "}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CreateProduct;
