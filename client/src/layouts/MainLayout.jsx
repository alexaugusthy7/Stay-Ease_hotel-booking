import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = ({
  children,
  noPadding = false,
}) => {

  return (

    <div className="bg-white">

      <Navbar />

      <main
        className={
          noPadding
            ? "min-h-screen"
            : "min-h-screen pt-24"
        }
      >

        {children}

      </main>

      <Footer />

    </div>
  );
};

export default MainLayout;