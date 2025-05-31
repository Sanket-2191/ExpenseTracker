
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Container from "./components/container/Container.jsx";

function App() {
  return (
    <>
      <div className='min-h-screen flex flex-col'>
        <Header />
        <main className='flex justify-center items-center bg-background min-h-[45vh] top-[13vh] pt-9'>

          <Outlet />

        </main>
        <Footer />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );

}

export default App;
