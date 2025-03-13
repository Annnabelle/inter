import { Outlet, Link } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div>
      <nav>
        <Link to="/">Главная</Link> | 
        <Link to="/about">О нас</Link> |
      </nav>
      <hr />
      <Outlet />
    </div>
  );
};

export default Layout;