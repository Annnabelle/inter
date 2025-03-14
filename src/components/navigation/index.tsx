import React from 'react'
import { Link } from 'react-router-dom'
import { IoMdHome } from "react-icons/io";
import { BiWorld } from "react-icons/bi";
import { GoGraph } from "react-icons/go";
import { GrDocument } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";



const Navigation: React.FC = () => {
  return (
    <div className='navigation'>
        <nav className="navigation-items">
            <Link to='/' className="navigation-items-item">
                <div className="item-icon"><IoMdHome /></div>
                <div className="item-link">
                    <div className='item-link-text'>Главная</div>
                </div>
            </Link>
            <Link to='/' className="navigation-items-item">
                <div className="item-icon"><BiWorld /></div>
                <div className="item-link">
                    <div className='item-link-text'>Сотрудничество</div>
                </div>
            </Link>
            <Link to='/' className="navigation-items-item">
                <div className="item-icon"><GoGraph /></div>
                <div className="item-link">
                    <div className='item-link-text'>Статистика</div>
                </div>
            </Link>
            <Link to='/' className="navigation-items-item">
                <div className="item-icon"><GrDocument /></div>
                <div className="item-link">
                    <div className='item-link-text'>Отчеты</div>
                </div>
            </Link>
            <Link to='/' className="navigation-items-item">
                <div className="item-icon"><FiSettings /></div>
                <div className="item-link">
                    <div className='item-link-text'>Администрирование</div>
                </div>
            </Link>
        </nav>
    </div>
  )
}

export default Navigation