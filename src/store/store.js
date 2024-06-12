import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from '../reducers/Reducers';

// Create a persist configuration
const persistConfig = {
  key: 'root', // key is required
  storage, // storage is required
  whitelist: ['auth'] // list of reducers to persist (here we are persisting the auth reducer)
};

// Combine reducers
const rootReducer = combineReducers({
  auth: authReducer,
});

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the thunk middleware and persisted reducer
const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

// Create a persistor
const persistor = persistStore(store);

export { store, persistor };
