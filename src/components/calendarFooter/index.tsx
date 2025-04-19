import React from 'react'
import './styles.sass'
import { useTranslation } from 'react-i18next'

const CalendarFooter: React.FC = () => {
    const { t } = useTranslation()
    const calendarFooterItem = [
        {
            id: 1,
            text: t('events.conferences'),
            number: 10
        },
        {
            id: 2,
            text: t('events.seminar'),
            number: 10
        },
        {
            id: 3,
            text: t('events.meetings'),
            number: 10
        },
        {
            id: 4,
            text: t('events.partners'),
            number: 10
        },
        {
            id: 5,
            text: t('events.other'),
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