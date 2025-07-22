import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCountries } from '../../store/countries';
import { fetchOrganizationSearch } from '../../store/organizations';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { Language } from '../../i18n';

type Props = {
  fieldName?: string | (string | number)[];
};

const SearchCountriesOrOrganizations: React.FC<Props> = ({ fieldName }) => {
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

  useEffect(() => {
    const language = (i18n.resolvedLanguage || 'ru') as Language;

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
    } else {
      setOptions([]);
    }
  }, [countriesSearch, organizationSearch, searchType, i18n.resolvedLanguage]);

  const baseName = Array.isArray(fieldName) ? fieldName : fieldName ? [fieldName] : [];

  let nameEntity: (string | number)[];
  let nameValue: (string | number)[];

  if (baseName.length === 1) {
    nameEntity = [baseName[0], 'entity'];
    nameValue = [baseName[0], 'value'];
  } else if (baseName.length === 2) {
    nameEntity = [baseName[0], baseName[1], 'entity'];
    nameValue = [baseName[0], baseName[1], 'value'];
  } else {
    nameEntity = [...baseName, 'entity'];
    nameValue = [...baseName, 'value'];
  }

  return (
    <>
      <Form.Item name={nameEntity} className="input" initialValue="none" rules={[{ required: true, message: t('errors.required') }]}>
        <Select
          size="large"
          value={searchType}
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

      <Form.Item name={nameValue} className="input" rules={[{ required: true, message: t('errors.required') }]}>
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

export default SearchCountriesOrOrganizations;




