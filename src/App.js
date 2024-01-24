import logo from './logo.svg';
import { Outlet } from 'react-router-dom';
import './App.css';
import SidebarDefault from './DefaultLayout/Sidebar/Sidebar';
import { Sidebar } from 'flowbite-react';
import NavbarDefault from './DefaultLayout/Navbar/NavbarDefault';

function App() {
  return (
    <>
      <Sidebar>
          <SidebarDefault />
      </Sidebar>
      <Outlet />
    </>
  );
}

export default App;
