import { useCallback, useEffect, useRef, useState } from "react";
import { Form } from "antd";
import { FaPlus } from "react-icons/fa";
import { theme } from "antd";
import CalendarComponent from "../../components/calendar";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import CalendarFooter from "../../components/calendarFooter";
import Button from "../../components/button";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { IoPrintOutline } from "react-icons/io5";

const MainEventsPage: React.FC = () => {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();

    const [form] = Form.useForm();
    const [addEventModalOpen, setAddEventModalOpen] = useState(false); 
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

    const openEventModal = () => setAddEventModalOpen(true);
    const closeEventModal = () => {
        setAddEventModalOpen(false);
        form.resetFields();
    };

    return (
        <MainLayout>
            <MainHeading openEventModal={openEventModal} title="Главная" subtitle="Подзаголоок">
                 <Button onClick={openEventModal}>
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
                    // minHeight: 280,
                    // height: "100vh",
                    // padding: 24,
                    // borderRadius: borderRadiusLG,
                }}
                className="layout-content-container"
            >
                <CalendarComponent
                    closeEventModal={closeEventModal}
                    // setAddEventModalOpen={setAddEventModalOpen}
                    addEventModalOpen={addEventModalOpen} // Передаём проп, чтобы модальное окно могло корректно работать
                /> 
            <CalendarFooter/>
            </div>
        </MainLayout>
    );
};

export default MainEventsPage;
