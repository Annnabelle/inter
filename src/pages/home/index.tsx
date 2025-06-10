import { useCallback, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { theme } from "antd";
import { HiOutlineDocumentDownload } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { RootState, useAppSelector } from "../../store";
import { UserRole } from "../../utils/roles";
import { getUserRole } from "../../utils/getUserRole";
import CalendarComponent from "../../components/calendar";
import MainLayout from "../../components/layout";
import MainHeading from "../../components/mainHeading";
import CalendarFooter from "../../components/calendarFooter";
import Button from "../../components/button";
import ModalWindow from "../../components/modalWindow";
import AddEventForm from "../../components/events/addEvent";
import moment from "moment";
import * as XLSX from "xlsx";

const MainEventsPage: React.FC = () => {
    const { t } = useTranslation();
    const role = getUserRole();
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    const [addEventModalOpen, setAddEventModalOpen] = useState<boolean>(false); 
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const eventsDropdownRef = useRef<HTMLDivElement>(null);
    const events = useAppSelector((state: RootState) => state.eventsCalendar.eventsCalendar)
    const eventCounter = useAppSelector((state) => state.eventsCalendar.eventCounter)
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

    const handleCreateEventModalOpen = () => {
        setAddEventModalOpen(true);
    };

    const handleCancel = () => {
        setAddEventModalOpen(false);
    };

    const handleDownloadExcel = () => {
        const ws = XLSX.utils.json_to_sheet(
            events.map((event) => ({
            "Название мероприятия": event.name,
            "Дата начала": moment(event.startDate).format("DD MMM YYYY HH:mm"),
            "Дата окончания": moment(event.endDate).format("DD MMM YYYY HH:mm"),
            "Комментарий": event.comment || "-",
            }))
        );

        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "События");

        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const excelFile = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        saveAs(excelFile, "Список_мероприятий.xlsx");
    };

    const handleDownloadWord = () => {
        const doc = new Document({
            sections: [
            {
                properties: {},
                children: [
                new Paragraph({
                    children: [
                    new TextRun({
                        text: "Список мероприятий",
                        bold: true,
                        size: 36,
                    }),
                    ],
                }),
                ...events.map((event) =>
                    new Paragraph({
                    children: [
                        new TextRun({
                        text: `• ${event.name} - ${moment(event.startDate).format("DD MMMM YYYY HH:mm")} → ${moment(event.endDate).format("DD MMMM YYYY HH:mm")}`,
                        size: 24,
                        }),
                    ],
                    })
                ),
                ],
            },
            ],
        });

        Packer.toBlob(doc).then((blob) => {
            saveAs(blob, "Список_мероприятий.docx");
        });
    };

    return (
        <MainLayout>
            <MainHeading title={`${t("titles.main")}` } subtitle="Подзаголовок">
                {role !== UserRole.EMPLOYEE && (
                    <Button onClick={handleCreateEventModalOpen}>
                        {t('buttons.create')} {t('crudNames.event')} <FaPlus />
                    </Button>
                )}
                <div className="layout-events-heading-dropdown" ref={eventsDropdownRef}>
                    <Button  onClick={(e) => {e.stopPropagation(); setIsOpen((prev) => !prev);}} className="outline">{t('buttons.actions')}</Button>
                    {isOpen && (
                        <div className="event-dropdown">
                            <div className="event-dropdown-action">
                                <Button onClick={handleDownloadExcel} className="outline-black">{t("buttons.excelDownload")}<HiOutlineDocumentDownload fontSize={24}/> </Button>
                                <Button onClick={handleDownloadWord}  className="outline-black">{t("buttons.worldDownload")} <HiOutlineDocumentDownload fontSize={24}/></Button>
                                {/* <Button className="outline-black">{t("buttons.print")} <IoPrintOutline fontSize={24} /></Button> */}
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
                <CalendarComponent/> 
                <CalendarFooter eventCounter={eventCounter || {}}/>
                  <ModalWindow
                        title={`${t('buttons.create')}` + " " 
                        +  `${t("crudNames.event")}`}
                        openModal={addEventModalOpen}
                        closeModal={handleCancel}
                    >
                        <AddEventForm 
                            // closeModal={handleCancel}
                            onSuccess={() => setAddEventModalOpen(false)} 
                        />
                    </ModalWindow>
            </div>
        </MainLayout>
    );
};

export default MainEventsPage;
