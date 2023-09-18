import { Provider } from "react-redux";
import "./assets/css/tailwind.css";
import Router from "./routes/Router";
import store from "./redux/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  );
}

export default App;
