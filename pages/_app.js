import '@/styles/globals.css'
import { Provider } from "react-redux";
import store from '@/store';
import { RedditProvider } from "@/context/RedditContext";

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from '@/store'; // Importiere den persistor aus deinem Store
//COMPONENTS
import Header from '@/components/Header/Header';



export default function App({ Component, pageProps }) {
 
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RedditProvider>
          <Header />
          <Component {...pageProps} />
        </RedditProvider>
      </PersistGate>
    </Provider>
  );
}
