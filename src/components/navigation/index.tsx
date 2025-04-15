import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward, IoMdHome } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import {  NavItem } from '../../types';



const Navigation: React.FC = () => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [subHoveredItem, setSubHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { to: '/', icon: <IoMdHome />, text: 'Главная' },
    { 
      to: '/cooperation', 
      icon: <BiWorld />, 
      text: 'Сотрудничество',
      dropdown: [
        { to: '/countries', text: 'Страны' },
        { 
          to: '/international-organizations', 
          text: 'Международные организации',
        },
        { to: '/international-non-governmental-organizations', text: 'Международные неправительственные организации' },
        { to: '/', text: 'Международные документы', icon:     <IoIosArrowForward/>,    subDropdown: [
          { to: '/international-documents', text: 'Международные документы' },
          { to: '/international-treaties', text: 'Международные договора' },
        ] },
        { to: '/experts', text: 'Эксперты' },
        { to: '/translators', text: 'Переводчики' }
      ]
    },
    { icon: <GoGraph />, text: 'Статистика', dropdown: [{to: '/event-statistics', text: "Мероприятия"}, {to: "", text: 'Визиты',  icon: <IoIosArrowForward/>, className: 'sub-dropdown-short',  subDropdown: [
      { to: '/statistics-of-country-visits', text: 'Страны' },
      { to: '/visit-statistics-employee', text: 'Сотрудники' },
    ] }] },
    { to: '/reports', icon: <GrDocument />, text: 'Отчеты' },
    { to: '/administrations', icon: <FiSettings />, text: 'Администрирование' },
  ];

  return (
    <nav className="navigation-items">
      {navItems.map(({ to, icon, text, dropdown }) => {
        const currentPath = location.pathname;
        const isActive = to === '/' ? currentPath === '/' : (to ? currentPath.startsWith(to) : false);
        const isHovered = hoveredItem === (to ?? text);

        return (
          <div 
            key={to ?? text} 
            className={`navigation-items-item ${isActive ? 'active' : ''} ${isHovered ? 'dropdown-open' : ''}`} 
            onMouseEnter={() => setHoveredItem(to ?? text)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {to ? (
              <Link to={to} className="nav-link">
                <div className="item-icon">{icon}</div>
                <div className="item-link">
                  <p className="item-link-text">{text}</p>
                </div>
              </Link>
            ) : (
              <div className="nav-link">
                <div className="item-icon">{icon}</div>
                <div className="item-link">
                  <p className="item-link-text">{text}</p>
                </div>
              </div>
            )}

            {dropdown && isHovered && (
              <div className="cooperation-dropdown">
                {dropdown.map(({ to, text, subDropdown, icon, className }) => {
                  const dropdownKey = to ?? text;
                  const isSubHovered = subHoveredItem === dropdownKey;

                  return (
                    <div 
                      key={dropdownKey}
                      className="cooperation-dropdown-item"
                      onMouseEnter={() => setSubHoveredItem(dropdownKey)}
                      onMouseLeave={() => setSubHoveredItem(null)}
                    >
                      <Link to={to} className="cooperation-dropdown-item-link">{text}</Link>
                      {icon && <div className="cooperation-dropdown-icon">{icon}</div>}
                      {subDropdown && isSubHovered && (
                        <div className={`sub-dropdown ${className}`}>
                          {subDropdown.map(({ to, text }) => (
                            <Link key={to} to={to} className="sub-dropdown-item">
                              {text}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Navigation;





