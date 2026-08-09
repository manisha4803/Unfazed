import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import "./MainLayout.css";

function MainLayout({ children }) {
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="layout-content">
        <Navbar />
        <main className="main-body">
          {children}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
