import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Du kannst hier auch AsyncStorage verwenden, wenn du in einem React Native-Projekt arbeitest
import { combineReducers } from "redux";

//SLICES
import filterReducer from "./filterSlice";
import authReducer from "./authSlice";
import counterSlice from "./counterSlice";
import toggleReducer from "./toggleSlice";
import userReducer from './userSlice'
import postReducer from './postSlice'
import imagesReducer from './supabaseImagesSlice'


const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, combineReducers({
  auth: authReducer,
  filter: filterReducer,
  counter: counterSlice,
  toggle: toggleReducer,
  user: userReducer,
  post: postReducer,
  images: imagesReducer,
}));

const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);

export default store;

