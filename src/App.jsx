import { DarkModeProvier } from "./context/DarkModeContext";
import DatePickerContainer from "./features/date/DatePickerContainer";
import AppLayout from "./ui/AppLayout";

const App = () => {
  return (
    <DarkModeProvier>
      <AppLayout>
        <DatePickerContainer />
      </AppLayout>
    </DarkModeProvier>
  );
};

export default App;
