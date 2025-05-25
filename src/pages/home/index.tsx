import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { theme } from "antd";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";
import CalendarComponent from "../../components/calendar";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import CalendarFooter from "../../components/calendarFooter";
import Button from "../../components/button";
import { useTranslation } from "react-i18next";

const MainEventsPage: React.FC = () => {
    const { t } = useTranslation();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [addEventModalOpen, setAddEventModalOpen] = useState<boolean>(false); 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const eventsDropdownRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (isOpen && eventsDropdownRef.current && !eventsDropdownRef.current.contains(event.target as Node)) {
            setIsOpen(false);
        }
    }, [isOpen]);
    

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);

    const showModal = () => {
        setAddEventModalOpen(true);
    };
    const handleCancel = () => {
        setAddEventModalOpen(false);
    };

    return (
        <MainLayout>
            <MainHeading title={`${t("titles.main")}` }subtitle="Подзаголовок">
                 <Button onClick={showModal}>
                    {t('buttons.create')} {t('crudNames.event')} <FaPlus />
                    </Button>
                <div className="layout-events-heading-dropdown" ref={eventsDropdownRef}>
                    <Button  onClick={(e) => {e.stopPropagation(); setIsOpen((prev) => !prev);}} className="outline">{t('buttons.actions')}</Button>
                    {isOpen && (
                        <div className="event-dropdown">
                            <div className="event-dropdown-action">
                                <Button className="outline-black">{t("buttons.excelDownload")}<HiOutlineDocumentDownload fontSize={24}/> </Button>
                                <Button className="outline-black">{t("buttons.worldDownload")} <HiOutlineDocumentDownload fontSize={24}/></Button>
                                <Button className="outline-black">{t("buttons.print")} <IoPrintOutline fontSize={24} /></Button>
                            </div>
                        </div>
                    )}
                </div>
            </MainHeading>
            <div
                style={{
                    background: colorBgContainer,
                }}
                className="layout-content-container"
            >
                <CalendarComponent
                    closeEventModal={handleCancel}
                    openEventModal={addEventModalOpen} 
                /> 
            <CalendarFooter/>
            </div>
        </MainLayout>
    );
};

export default MainEventsPage;
