import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoMdHome } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";

const Navigation: React.FC = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { to: '/', icon: <IoMdHome />, text: 'Главная' },
    { 
      to: '/cooperation', 
      icon: <BiWorld />, 
      text: 'Сотрудничество',
      dropdown: [
        { to: '/cooperation/countries', text: 'Страны' },
        { to: '/cooperation/international-organizations', text: 'Международные организации' },
        { to: '/cooperation/international-non-governmental-organizations', text: 'Международные неправительственные организации' },
        { to: '/', text: 'Международные документы' },
        { to: '/', text: 'Эксперты' },
        { to: '/', text: 'Переводчики' }
      ]
    },
    { to: '/statistics', icon: <GoGraph />, text: 'Статистика' },
    { to: '/reports', icon: <GrDocument />, text: 'Отчеты' },
    { to: '/admin', icon: <FiSettings />, text: 'Администрирование' },
  ];

  return (
    <nav className="navigation-items">
      {navItems.map(({ to, icon, text, dropdown }) => {
        const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
        const isHovered = hoveredItem === to;

        return (
          <div 
            key={to} 
            className={`navigation-items-item ${isActive ? 'active' : ''} ${isHovered ? 'dropdown-open' : ''}`} 
            onMouseEnter={() => setHoveredItem(to)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Link to={to} className="nav-link">
              <div className="item-icon">{icon}</div>
              <div className="item-link">
                <p className="item-link-text">{text}</p>
              </div>
            </Link>

            {dropdown && isHovered && (
              <div className="cooperation-dropdown">
                {dropdown.map(({ to, text }) => (
                  <Link key={to} to={to} className="cooperation-dropdown-item">
                    <p className="cooperation-dropdown-item-link">{text}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;





