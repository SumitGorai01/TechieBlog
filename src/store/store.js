import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from "redux-persist/lib/storage";
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authSlice from './authSlice'
import themeSlice from './themeSlice'

const persistConfig = {
    key: "root",
    version: 1,
    storage
};

const reducer = combineReducers({
    auth: authSlice,
    theme: themeSlice
});

const persisted = persistReducer(persistConfig, reducer);

export const store = configureStore({
    reducer: persisted,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})