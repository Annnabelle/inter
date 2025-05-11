import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { IoIosArrowForward, IoMdHome } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import {  NavItem } from '../../types';
import { useTranslation } from 'react-i18next';



const Navigation: React.FC = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [subHoveredItem, setSubHoveredItem] = useState<string | null>(null);

  const navItems: NavItem[] = [
    { to: '/main', icon: <IoMdHome />, text: `${t('navigation.main')}` },
    { 
      to: '/cooperation', 
      icon: <BiWorld />, 
      text: `${t('navigation.cooperation')}`,
      dropdown: [
        { to: '/countries', text: `${t('navigation.countries')}` },
        // {to: '/organizations', text: 'Организации'},
        { 
          to: '/international-organizations', 
          text: `${t('navigation.internationalOrganizations')}`,
        },
        { to: '/international-non-governmental-organizations', text: `${t('navigation.internationalNonGovernmentalOrganizations')}` },
        { to: '/', text: `${t('navigation.internationalDocuments')}`, icon:     <IoIosArrowForward/>,    subDropdown: [
          { to: '/international-documents', text: `${t('navigation.internationalDocuments')}`},
          { to: '/international-treaties', text: `${t('navigation.internationalTreaties')}`},
        ] },
        { to: '/experts', text: `${t('navigation.experts')}` },
        { to: '/translators', text: `${t('navigation.translators')}` }
      ]
    },
    { icon: <GoGraph />, text: `${t('navigation.eventStatistics')}`, dropdown: [{to: '/event-statistics', text: `${t('navigation.events')}`}, {to: "", text: `${t('navigation.visits')}`,  icon: <IoIosArrowForward/>, className: 'sub-dropdown-short',  subDropdown: [
      { to: '/statistics-of-country-visits', text:  `${t('navigation.countries')}` },
      { to: '/visit-statistics-employee', text: `${t('navigation.employees')}`  },
    ] }] },
    { to: '/reports', icon: <GrDocument />, text: `${t('navigation.reports')}` },
    { to: '/administrations', icon: <FiSettings />, text: `${t('navigation.administrations')}`  },
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





