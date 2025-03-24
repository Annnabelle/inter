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

const MainEventsPage: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
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
            <MainHeading title="Главная" subtitle="Подзаголоок">
                 <Button onClick={showModal}>
                    Создать мероприятие <FaPlus />
                </Button>
                <div className="layout-events-heading-dropdown" ref={eventsDropdownRef}>
                    <Button  onClick={(e) => {e.stopPropagation(); setIsOpen((prev) => !prev);}}>Действия</Button>
                    {isOpen && (
                        <div className="event-dropdown">
                            <div className="event-dropdown-action">
                                <Button className="outline-black">Скачать Excel <HiOutlineDocumentDownload fontSize={24}/> </Button>
                                <Button className="outline-black">Скачать World <HiOutlineDocumentDownload fontSize={24}/></Button>
                                <Button className="outline-black">Печать <IoPrintOutline fontSize={24} /></Button>
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
