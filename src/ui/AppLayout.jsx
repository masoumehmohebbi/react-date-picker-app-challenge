import Footer from "./Footer";
import Header from "./Haeder";

const AppLayout = ({ children }) => {
  //   const [theme, setTheme] = useState(
  //     localStorage.getItem("theme") ? localStorage.getItem("theme") : "system"
  //   );
  return (
    <div>
      {/* <NavBar theme={theme} setTheme={setTheme} /> */}
      <Header />
      {children}

      <Footer />
    </div>
  );
};

export default AppLayout;
