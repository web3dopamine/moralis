import { MoralisProvider } from "react-moralis";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider serverUrl="https://kje4uw8pnhfk.usemoralis.com:2053/server" appId="voXVceISOSW75VTbrbGREtAWos5RqTnsHp9HQYlk">
      <Component {...pageProps} />
    </MoralisProvider>
  );
}

export default MyApp;
