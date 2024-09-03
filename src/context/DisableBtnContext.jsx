import { createContext, useContext, useState } from "react";

const DisabledBtnContext = createContext();

export function DisableBtnProvier({ children }) {
  const [isDisbled, setIsDisabled] = useState(false);

  return (
    <DisabledBtnContext.Provider value={{ isDisbled, setIsDisabled }}>
      {children}
    </DisabledBtnContext.Provider>
  );
}

export function useDisabledBtn() {
  const context = useContext(DisabledBtnContext);

  if (context === undefined)
    throw new Error("DisabledBtnContext was used outside of DisableBtnProvier");

  return context;
}
