import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userID: "",
  id: "",
  name: "",
  status: "customer",
  category: "Electronics",
  cart: [],
  cartPrice: null,
  wishlist: [],
  productDescription: {},
  isMenuOpen: false,
};
const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    changeCategory: (state, action) => {
      state.category = action.payload;
    },
    changeName: (state, action) => {
      state.name = action.payload;
    },
    changeId: (state, action) => {
      state.id = action.payload;
    },
    changeStatus: (state, action) => {
      state.status = action.payload;
    },
    storeUserID: (state, action) => {
      state.userID = action.payload;
    },
    addToCart: (state, action) => {
      state.cart = [...state.cart, action.payload];
    },
    changeMenuOpen: (state, action) => {
      state.isMenuOpen = action;
    },
    addToWishlist: (state, action) => {
      state.wishlist = [...state.wishlist, action.payload];
    },
    deleteFromCart: (state, action) => {
      const indexToRemove = state.cart.findIndex(item => item._id === action.payload);
      if (indexToRemove !== -1) {
        state.cart.splice(indexToRemove, 1);
      }
    },
    deleteFromWishlist: (state, action) => {
      state.wishlist = [
        ...state.wishlist.filter((item, index) => index !== action.payload),
      ];
    },
    deleteWholeCart: (state, action) => {
      state.cart = [];
    },
    deleteWholeWishlist: (state, action) => {
      state.wishlist = [];
    },
    calculateCartPrice: (state, action) => {
      if (state.cart.length > 0) {
        let price = 0;
        state.cart.forEach((elem) => {
          price += elem.price;
        });
        state.cartPrice = price;
      } else {
        state.cartPrice = 0;
      }
    },
    moveAllToCart: (state, action) => {
      state.cart = [...state.cart, ...state.wishlist];
    },
    productDescription: (state, action) => {
      state.productDescription = action.payload;
    },
    logout: (state, action) => {
      return { ...initialState, isMenuOpen:false };
    }
  },
});
export const {
  changeCategory,
  productDescription,
  storeUserID,
  addToCart,
  deleteFromCart,
  deleteFromWishlist,
  deleteWholeCart,
  deleteWholeWishlist,
  calculateCartPrice,
  addToWishlist,
  moveAllToCart,
  changeStatus,
  logout,
  changeId,
  changeName,
  changeMenuOpen
} = mainSlice.actions;
export default mainSlice.reducer;
