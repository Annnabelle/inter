import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

const Navigation: React.FC = () => {
  const location = useLocation(); 

  const navItems = [
    { to: '/', icon: <IoMdHome />, text: 'Главная' },
    { to: '/cooperation', icon: <BiWorld />, text: 'Сотрудничество' },
    { to: '/statistics', icon: <GoGraph />, text: 'Статистика' },
    { to: '/reports', icon: <GrDocument />, text: 'Отчеты' },
    { to: '/admin', icon: <FiSettings />, text: 'Администрирование' },
  ];

  return (
    <nav className="navigation-items">
      {navItems.map(({ to, icon, text }) => (
        <Link
          key={to}
          to={to}
          className={`navigation-items-item ${location.pathname === to ? 'active' : ''}`}
        >
          <div className="item-icon">{icon}</div>
          <div className="item-link">
            <div className='item-link-text'>{text}</div>
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Navigation;
