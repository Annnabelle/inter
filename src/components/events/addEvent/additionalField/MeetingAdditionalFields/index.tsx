import React, { useState } from "react";
import { Form, Input, Select } from "antd";
import SearchCountriesOrOrganizations from "../../../../searchCountriesOrOrganizations";
import { useTranslation } from "react-i18next";
import { EventFormat, EventLevel } from "../../../../../dtos/events/addEvent";

const MeetingAdditionalFields: React.FC = () => {
    const { t } = useTranslation();
    const [files, setFiles] = useState([{ id: Date.now() }]);
    
    const addFileField = () => {
        setFiles([...files, { id: files.length + 1}]);
    };

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
    return (
        <>
            <div className="form-inputs">
                <Form.Item className="input" name="place">
                    <Input className="input" placeholder={t('inputs.placeOfSigning')} size="large" />
                </Form.Item>
            </div>
            <div className="inputs-label">
                <p className="label">Формат встречи</p>
            </div>
            <div className="form-inputs">
                <Form.Item className="input" name="format">
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
                <Form.Item className="input" name="level">
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
                {files.map((item, index) => (
                    <div className="form-inputs" key={item.id}>
                        <SearchCountriesOrOrganizations fieldName={['partners', index]} />
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

export default MeetingAdditionalFields;