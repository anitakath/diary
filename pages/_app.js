import '@/styles/globals.css'
import { Provider } from "react-redux";
import store from '@/store';
import { RedditProvider } from "@/context/RedditContext";



//COMPONENT 
import Header from '@/components/Header/Header';


export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <RedditProvider>
        <Header/>
        <Component {...pageProps} />
      </RedditProvider>
    </Provider>
  );
}
