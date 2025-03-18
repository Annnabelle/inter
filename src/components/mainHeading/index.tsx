import React from "react";
import "./styles.sass";

interface MainHeadingProps {
  openEventModal?: () => void;
  children?: React.ReactNode;
  title: string; 
  subtitle?: string; 
}

const MainHeading: React.FC<MainHeadingProps> = ({ children, title, subtitle }) => {
  return (
    <div className="main-heading">
      <div className="heading-container">
        <div className="heading-description">
          {title && (
          <div className="description-title">
            <h1 className="description-title-text">{title}</h1>
          </div>
          )}
          {subtitle && ( 
            <div className="description-subtitle">
              <p className="description-subtitle-text">{subtitle}</p>
            </div>
          )}
        </div>
        <div className="heading-buttons">{children}</div>
      </div>
    </div>
  );
};

export default MainHeading;


