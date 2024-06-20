import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { deleteFromCart, deleteWholeCart } from "../../redux/Main/mainSlice";
import { useDispatch } from "react-redux";

const stripePromise = loadStripe(
  "pk_test_51OvipKRxsBelap0fwruMBWkNVgX84dIESDZC6ki1sd6GRoN3g0GQ2OweVip3spnDMWqQDSRxnkpUjRExMiNO3QDR00nRCQQncr"
);
console.log(stripePromise, "stripePromise");

const CheckoutForm = ({name}) => {
  const dispatch = useDispatch();
  const stripe = useStripe();
  const [NOerrorMessage, setNOErrorMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const cartPrice = useSelector((state) => state.cartPrice);
  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [errorModalOpen, setErrorModalOpen] = useState(false);
  const cart = useSelector((state) => state.cart);
  const today = new Date();
  const tomorrowTimestamp = new Date().setDate(today.getDate() + 1);
  const tomorrow = new Date(tomorrowTimestamp);
  const customerID = useSelector((state) => state.id);
  const token = useSelector((state) => state.userID);
  const [cardError, setCardError] = useState(null);
  // useEffect(() => {
  //   if (cardError) {
  //     setErrorMessage(cardError);
  //     setErrorModalOpen(true);
  //   }
  //   console.log("useEffectcall");
  // }, [cardError]);
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    if (!stripe || !elements) {
      setLoading(false);
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    if (!elements.getElement(CardElement)) {
      setCardError("Please enter your card details.");
      setLoading(false);
      return;
    }

    try {
      // Fetch client secret from your backend
      const response = await fetch(
        `${process.env.REACT_APP_BACKEND_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: cartPrice }),
        }
      );
      console.log(response, "reaponse");
      const { clientSecret } = await response.json();

      const { error, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (error) {
        setErrorMessage("Incorrect card details");
        setLoading(false);
        setErrorModalOpen(true);
      } else {
        setNOErrorMessage("sucess");
        setLoading(false);
        setSuccessModalOpen(true);
        dispatch(deleteWholeCart());

        axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/order`,
          {
            customerId: customerID,
            pickupPerson: name,
            customerTotal: cartPrice,
            orderDate: today.toLocaleDateString(),
            startDate: today.toDateString(),
            endDate: tomorrow.toDateString(),
            orderData: cart,
          },
          {
            headers: { Authorization: `${token}` },
          }
        )
        .then((res) => {
          deleteFromCart();
        })
        .catch((err) => console.log(err));
        // Payment successful
      }
    } catch (error) {
      console.log(error.message, "error");
      setLoading(false);
      setErrorModalOpen(true);
      if (error.message === "Failed to fetch") {
        setErrorMessage("Internal Server Error");
      } else {
        setErrorMessage(error?.message);
      }
      console.log("err");
    }

    // Use the clientSecret to confirm the PaymentIntent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-xl border mt-4 rounded-md p-8 w-full"
    >
      <SuccessModal isOpen={successModalOpen} setIsOpen={setSuccessModalOpen} />
      <ErrorModal
        isOpen={errorModalOpen}
        setIsOpen={setErrorModalOpen}
        error={errorMessage}
      />
      <div className="mb-4">
        <label
          className="block mb-2 text-sm font-bold text-gray-700"
          htmlFor="card-element"
        >
          Card Details:
        </label>
        <div className="border border-gray-300 rounded-md p-2">
          <CardElement
            id="card-element"
            className="w-full bg-transparent"
            onChange={(e) => {
              if (e.error) {
                setCardError(e.error.message);
              } else {
                setCardError(null);
              }
            }}
          />
        </div>
      </div>
      <input
        placeholder="enter amount"
        className="w-full border border-gray-300 rounded-md px-2 py-1 mb-4"
        value={`Amount: $ ${cartPrice}`}
        disabled
      />
      <button
        disabled={!stripe || loading}
        style={{
          backgroundColor: "#01A664",
          borderRadius: "25px",
          gap: "10px",
          padding: "5px 10px 5px 10px",
          minWidth: "100px",
          margin: "0px",
          marginLeft: "auto",
        }}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg md:ml-4 mt-2 md:mt-0 flex justify-center items-center/"
      >
        {!loading ? (
          "Pay"
        ) : (
          <div role="status" className="mx-auto">
            <svg
              aria-hidden="true"
              class="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        )}
      </button>
      {/* {errorMessage && <p>{errorMessage}</p>}
      {NOerrorMessage && (
        <p
          style={{
            background: "red",
          }}
        >
          {NOerrorMessage}
        </p>
      )} */}
    </form>
  );
};

function Index({name}) {
  return (
    <div className="w-full min-h-screen flex justify-center items-center shadow-md">
      <div className="w-[40%] max-lg:w-[60%] max-md:w-[75%] max-sm:w-[80%]">
        <h1 className="text-center text-2xl max-md:text-xl font-bold">
          Confirm Payment
        </h1>
        <Elements stripe={stripePromise} className="w-full">
          <CheckoutForm name={name}/>
        </Elements>
      </div>
    </div>
  );
}

export default Index;

const SuccessModal = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid green",
    },
  };
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Success Modal">
      <h2>Your Payment has been Successfull</h2>
      <button
        onClick={() => {
          setIsOpen(false);
          navigate("/home");
        }}
        className="bg-red-500 flex items-end text-white px-2 mt-4 ml-auto rounded-md"
      >
        close
      </button>
      {/* <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form> */}
    </Modal>
  );
};
const ErrorModal = ({ isOpen, setIsOpen, error }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "1px solid red",
    },
  };
  return (
    <Modal isOpen={isOpen} style={customStyles} contentLabel="Success Modal">
      <h2>Something went wrong! Please Try again</h2>
      {error && <p className="mt-2">{error}</p>}
      <button
        onClick={() => {
          setIsOpen(false);
        }}
        className="bg-red-500 flex items-end text-white px-2 mt-4 ml-auto rounded-md"
      >
        close
      </button>
      {/* <div>I am a modal</div>
      <form>
        <input />
        <button>tab navigation</button>
        <button>stays</button>
        <button>inside</button>
        <button>the modal</button>
      </form> */}
    </Modal>
  );
};
