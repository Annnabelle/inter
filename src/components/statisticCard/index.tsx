import React from 'react';
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './styles.sass';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface StatisticsCardProps {
  title: string;
  total: number;
  agencyPercent: number;
  otherPercent?: number;
  thirdPercent?: number
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({
  title,
  total,
  agencyPercent,
  otherPercent,
  thirdPercent,
}) => {
const navigate = useNavigate()
const { t } = useTranslation()
  const handleNavigate = () => {
    navigate('/event-statistics-inner')
  }
  return (
    <div className="statistics-card" onClick={handleNavigate}>
      <div className="statistics-heading">
        <div className="statistics-subtitle">
          <p className="subtitle">{t('titles.overallStatistics')}</p>
        </div>
        <div className="statistics-title">
          <h2 className="title">{title}</h2>
        </div>
      </div>
      <div className="progress-container">
        <CircularProgressbarWithChildren
          value={agencyPercent}
          styles={buildStyles({
            pathColor: '#5D5FEF',
            trailColor: '#EADCF8',
            strokeLinecap: 'round',
          })}
        >
          <div>
            <div className="total-label">
              <p className="label">{t('titles.totalMeetings')}</p>
            </div>
            <div className="total-value">
              <p className="value">{total.toLocaleString()}</p>
            </div>
          </div>
        </CircularProgressbarWithChildren>
      </div>
      <div className="statistics-footer">
        <div className="statistics-items">
          <div className="statistics-items-dot">
            <span className="statistics-items-dot-item dot-agency"></span>
          </div>
          <div className="statistics-items-dot-text">
            <p className='text'>{t('titles.Agency')} <span className='percent'> {agencyPercent}%</span></p>
          </div>
        </div>
        <div className="statistics-items">
          <div className="statistics-items-dot">
            <span className="statistics-items-dot-item dot-other"></span>
          </div>
          <div className="statistics-items-dot-text">
            <p className="text">{t('titles.otherOrganizer')} <span className='percent'>{otherPercent}%</span> </p>
          </div>
        </div>
        
        {thirdPercent && (
          <div className="statistics-items">
            <div className="statistics-items-dot">
              <span className="statistics-items-dot-item dot-third"></span>
            </div>
            <div className="statistics-items-dot-text">
              <p className="text">{t('titles.expertLevel')} <span className='percent'>{thirdPercent}%</span> </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatisticsCard;

