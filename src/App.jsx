import { DarkModeProvier } from "./context/DarkModeContext";
import { DisableBtnProvier } from "./context/DisableBtnContext";
import DatePickerContainer from "./features/date/DatePickerContainer";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <DisableBtnProvier>
      <DarkModeProvier>
        <Toaster />
        <AppLayout>
          <DatePickerContainer />
        </AppLayout>
      </DarkModeProvier>
    </DisableBtnProvier>
  );
};

export default App;
