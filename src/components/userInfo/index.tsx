import React, { useState, useRef, useEffect, useCallback } from "react";
import { Avatar } from "antd";
import { LuUserRound } from "react-icons/lu";
import { IoIosArrowDown } from "react-icons/io";
import { useTranslation } from "react-i18next";
import Button from "../button";
import "./styles.sass";
import { RootState, useAppDispatch, useAppSelector } from "../../store";

const UserInfo: React.FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user)
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  }, [isOpen]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);
  return (
    <div className="user" ref={dropdownRef}>
      <div
        className="user-info"
        onClick={(e) => {
          e.stopPropagation(); 
          setIsOpen((prev) => !prev);
        }}
      >
        <Avatar className="user-avatar" size="large" icon={<LuUserRound className="user-icon" />} />
        <div className="user-text">
          <div className="user-text-container">
            <p className="user-text-container-name">Mukhammad</p>
          </div>
          <div className="user-text-container">
            <p className="user-text-container-role">{t('titles.administrator')}</p>
          </div>
        </div>
        <div className="user-arrow">
          <IoIosArrowDown />
        </div>
      </div>
      {isOpen && (
        <div className="user-dropdown">
          <div className="user-dropdown-action">
            <Button>{t('buttons.logout')}</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
