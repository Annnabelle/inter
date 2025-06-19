import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import { useTranslation } from "react-i18next";
import { EventFormat, EventLevel } from "../../../../dtos/events/addEvent";
import SearchCountriesOrOrganizationsEdit from "../../../searchCountriesOrOrganizationsEdit";

interface MeetingEditAdditionalFieldsProps {
  event: any;
  form: any;
}

const MeetingAdditionalFieldsEdit: React.FC<MeetingEditAdditionalFieldsProps> = ({event}) => {
    const { t } = useTranslation();

    const LevelOptions = [
        { value: EventLevel.Deputy, label: t('titles.roles.director') },
        { value: EventLevel.Director, label: t('titles.roles.deputy') },
        { value: EventLevel.Expert, label: t('titles.roles.expert') }
    ];
    const FormatOptions = [
        { value: EventFormat.Personal, label: t('events.personal') },
        { value: EventFormat.Online, label: t('events.online') },
        { value: EventFormat.Hybrid, label: t('events.hybrid') }
    ];

    const initialPartners = event?.partners || [];
    
    const [files, setFiles] = useState(
    initialPartners.length > 0
        ? initialPartners.map((partner: any, index: any) => ({
            id: Date.now() + index,
            initialEntity: partner.entity,
            initialValue: {
            id: partner.value.id,
            name: partner.value.name
            }
        }))
        : [{ id: Date.now() }]
    );

    const addFileField = () => {
    setFiles([
        ...files,
        { id: Date.now() + Math.random() }
    ]);
    };

    return (
        <>
            <div className="form-inputs">
                <Form.Item className="input" name="place" initialValue={event?.place}>
                    <Input className="input" placeholder="место подписания" size="large" />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Формат встречи</p>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="format" initialValue={event?.format}>
                    <Select
                        className="input"
                        size="large"
                        options={FormatOptions}
                        placeholder={t('tableTitles.format')}
                    />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Уровень</p>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="level" initialValue={event?.level}>
                    <Select
                        className="input"
                        size="large"
                        options={LevelOptions}
                        placeholder={t('tableTitles.level')}
                    />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Партнеры</p>
            </div>
            {files.map((item: any, index: any) => (
                <div className="form-inputs" key={item.id}>
                    <SearchCountriesOrOrganizationsEdit
                        fieldName={['partners', index]}
                        initialEntity={item.initialEntity}
                        initialValue={item.initialValue}
                    />
                </div>
            ))}

            <div className="form-btn-new">
                <p className="form-btn-new-text" onClick={addFileField}>
                {t('buttons.add')}
                </p>
            </div>
        </>
    )
    
}

export default MeetingAdditionalFieldsEdit;