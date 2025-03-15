import React from 'react'
import Button from '../button'
import { FaPlus } from "react-icons/fa6";
import './styles.sass'

const MainHeading = () => {
  return (
    <div className='main-heading'>
        <div className="heading-container">
            <div className="heading-description">
                <div className="description-title">
                    <h1 className="description-title-text">Главная</h1>
                </div>
                <div className="description-subtitle">
                    <p className="description-subtitle-text">Подзаголовок</p>
                </div>
            </div>
            <div className="heading-buttons">
                <Button>Создать мероприятие <FaPlus /></Button>
                <Button>Действия</Button>
            </div>
        </div>
    </div>
  )
}

export default MainHeading