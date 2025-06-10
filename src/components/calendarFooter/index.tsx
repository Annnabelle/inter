import React from 'react'
import { useTranslation } from 'react-i18next'
import './styles.sass'

interface CalendarFooterProps {
  eventCounter: {
    birthday?: number
    conference?: number
    delegations?: number
    diplomatic?: number
    foreign?: number
    meeting?: number
    personal?: number
    seminar?: number
    significant?: number
    [key: string]: number | undefined
  }
}

const CalendarFooter: React.FC<CalendarFooterProps> = ({ eventCounter }) => {
  const { t } = useTranslation()

  const calendarFooterItem = [
    {
      id: 1,
      key: 'birthday',
      text: t('events.birthday'),
    },
    {
      id: 2,
      key: 'conference',
      text: t('events.conference'),
    },
    {
      id: 3,
      key: 'delegations',
      text: t('events.delegations'),
    },
    {
      id: 4,
      key: 'diplomatic',
      text: t('events.diplomatic'),
    },
    {
      id: 5,
      key: 'foreign',
      text: t('events.foreign'),
    },
    {
      id: 6,
      key: 'meeting',
      text: t('events.meeting'),
    },
    {
      id: 7,
      key: 'personal',
      text: t('events.personal'),
    },
    {
      id: 8,
      key: 'seminar',
      text: t('events.seminar'),
    },
    {
      id: 9,
      key: 'significant',
      text: t('events.significant'),
    },
  ]

  return (
    <div className="calendar-footer">
      <div className="container-items">
        {calendarFooterItem.map((item) => (
          <div className="item" key={item.id}>
            <div className="item-circle">
              <div className="circle"></div>
            </div>
            <div className="item-text">
              <p className="text">{item.text}:</p>
            </div>
            <div className="item-number">
              <p className="number">{eventCounter[item.key] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CalendarFooter
