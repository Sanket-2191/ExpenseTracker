

import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Container from "./components/container/Container.jsx";

function App() {
  return (
    <div className='min-h-screen flex flex-col'>
      <Header />
      <main className='flex-1 bg-background'>
        <Container>
          <Outlet />

        </Container>
      </main>
      <Footer />
    </div>
  );

}

export default App;
