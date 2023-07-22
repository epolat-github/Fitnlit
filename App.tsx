import { Provider as ReduxProvider } from "react-redux";

import MainNavigationContainer from "./src/navigation";
import { store } from "./src/utils/store";

export default function App() {
  return (
    <ReduxProvider store={store}>
      <MainNavigationContainer />
    </ReduxProvider>
  );
}
