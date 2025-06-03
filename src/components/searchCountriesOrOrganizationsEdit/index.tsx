import React, { useEffect, useState } from 'react';
import { Form, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCountries } from '../../store/countries';
import { fetchOrganizationSearch } from '../../store/organizations';
import { Language } from '../../i18n';

type Props = {
  fieldName?: string | (string | number)[];
  initialEntity?: 'country' | 'organization';
  initialValue?: {
    id: string;
    name: {
      ru: string;
      uz?: string;
      en?: string;
    };
  };
};

const SearchCountriesOrOrganizationsEdit: React.FC<Props> = ({
  fieldName,
  initialEntity,
  initialValue,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const countriesSearch = useAppSelector((state) => state.countries.countriesSearch);
  const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch);

  const [searchType, setSearchType] = useState<'country' | 'organization' | 'none'>('none');
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const handleSearch = (value: string) => {
    if (!value.trim() || searchType === 'none') return;

    if (searchType === 'country') {
      dispatch(fetchCountries({ query: value }));
    } else if (searchType === 'organization') {
      dispatch(fetchOrganizationSearch({ query: value }));
    }
  };

  const language = (i18n.resolvedLanguage || 'ru') as Language;

  const baseName = Array.isArray(fieldName) ? fieldName : fieldName ? [fieldName] : [];
  const nameEntity = [...baseName, 'entity'];
  const nameValue = [...baseName, 'value'];

  useEffect(() => {
    if (initialEntity && initialValue?.id && initialValue?.name) {
      const label = initialValue.name?.[language] || initialValue.name.ru;
      setSearchType(initialEntity);
      setOptions([{ label, value: initialValue.id }]);
    }
  }, [initialEntity, initialValue, language]);

  useEffect(() => {
    if (searchType === 'country') {
      setOptions(
        countriesSearch.map((c) => ({
          label: c.name?.[language] || c.name.ru,
          value: c.id,
        }))
      );
    } else if (searchType === 'organization') {
      setOptions(
        organizationSearch.map((o) => ({
          label: o.name?.[language] || o.name.ru,
          value: o.id,
        }))
      );
    }
  }, [countriesSearch, organizationSearch, searchType, language]);

  return (
    <>
      <Form.Item name={nameEntity} className="input" initialValue={initialEntity || 'none'}>
        <Select
          size="large"
          onChange={(value: 'country' | 'organization' | 'none') => {
            setSearchType(value);
            setOptions([]);
          }}
          options={[
            { label: t('inputs.notSelected') || 'Не выбрано', value: 'none' },
            { label: t('tableTitles.countries'), value: 'country' },
            { label: t('titles.organizations'), value: 'organization' },
          ]}
        />
      </Form.Item>

      <Form.Item name={nameValue} className="input" initialValue={initialValue?.id}>
        <Select
          showSearch
          placeholder={t('inputs.search')}
          size="large"
          className="input"
          onSearch={handleSearch}
          filterOption={false}
          options={options}
          disabled={searchType === 'none'}
          allowClear
        />
      </Form.Item>
    </>
  );
};

export default SearchCountriesOrOrganizationsEdit;
