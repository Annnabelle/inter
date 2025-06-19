import React, { useEffect, useState } from 'react';
import { Select, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { Language } from '../../i18n';

interface SearchProps {
  event: any;
  form: any;
  fieldName?: string[];
}

const SearchCountryOrOrganizationRetrieve: React.FC<SearchProps> = ({ event, form, fieldName }) => {
  const { t, i18n } = useTranslation();
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const language = (i18n.resolvedLanguage || 'ru') as Language;

  const getEntityData = (event: any) => {
    return event?.entity && event?.value?.name
      ? event
      : event?.source?.value?.name
      ? event.source
      : event?.donor?.value?.name
      ? event.donor
      : event?.delegation?.value?.name
      ? event.delegation
      : event?.organizer?.value?.name
      ? event.organizer
      : null;
  };

  const entityData = getEntityData(event);
  const searchType = entityData?.entity || 'none';

  useEffect(() => {
    const entityData = getEntityData(event);
    const searchType = entityData?.entity || 'none';
    const sourceName = entityData?.value?.name?.[language] || '';
    const sourceId = entityData?.value?.id || '';

    if (!sourceName || !sourceId || searchType === 'none') return;

    const newOptions = [{ label: sourceName, value: sourceId }];
    setOptions(newOptions);

    form.setFields([
      { name: [...(fieldName || []), 'sourceEntity'], value: searchType },
      {
        name: [...(fieldName || []), searchType === 'country' ? 'countryId' : 'organizationId'],
        value: { label: sourceName, value: sourceId },
      },
    ]);
  }, [language, event, form, fieldName]);

  return (
    <div className="form-inputs">
      <Form.Item className="input" name={[...(fieldName || []), 'sourceEntity']}>
        <Select
          disabled
          size="large"
          options={[
            { label: t('inputs.notSelected') || 'Не выбрано', value: 'none' },
            { label: t('tableTitles.countries'), value: 'country' },
            { label: t('titles.organizations'), value: 'organization' },
          ]}
        />
      </Form.Item>

      <Form.Item
        className="input"
        name={[
          ...(fieldName || []),
          searchType === 'country' ? 'countryId' : 'organizationId',
        ]}
      >
        <Select
          labelInValue
          disabled
          showSearch={false}
          placeholder={t('inputs.search')}
          size="large"
          options={options}
        />
      </Form.Item>
    </div>
  );
};

export default SearchCountryOrOrganizationRetrieve;






