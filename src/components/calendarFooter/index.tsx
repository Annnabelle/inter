import React from 'react'
import './styles.sass'

const CalendarFooter: React.FC = () => {
    const calendarFooterItem = [
        {
            id: 1,
            text: 'Конференции/Форумы',
            number: 10
        },
        {
            id: 2,
            text: 'Семинар/Тренинг',
            number: 10
        },
        {
            id: 3,
            text: 'Встречи',
            number: 10
        },
        {
            id: 4,
            text: 'Партнеры',
            number: 10
        },
        {
            id: 5,
            text: 'Другое',
            number: 10
        }
    ]
  return (
    <div className='calendar-footer'>
        <div className="container-items">
            {calendarFooterItem?.map((item) => (
            <div className="item">
                <div className="item-circle">
                    <div className="circle"></div>
                </div>
                <div className="item-text">
                    <p className="text">{item.text}:</p>
                </div>
                <div className="item-number">
                    <p className="number">{item.number}</p>
                </div>
            </div>
            ))}
        </div>
    </div>
  )
}

export default CalendarFooter