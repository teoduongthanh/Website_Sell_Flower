import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productReducer from "./slider/productSlide";
import userReducer from "./slider/userSlide";
import orderReducer from "./slider/orderSlide";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'
  import storage from 'redux-persist/lib/storage'
  import { PersistGate } from 'redux-persist/integration/react'


  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ["product","user"],
  }
  const rootReducer = combineReducers({
    product: productReducer,
    user: userReducer,
    order: orderReducer,
  })
  const persistedReducer = persistReducer(persistConfig, rootReducer)
// import cartReducer from './redux/cartReducers';
// import orderCreateReducer from './redux/orderReducers';
export const store = configureStore({
    reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export let persistor = persistStore(store)