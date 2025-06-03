import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchCountries } from '../../store/countries';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { Language } from '../../i18n';

type Props = {
  fieldName?: string;
};

const SearchCountry: React.FC<Props> = ({ fieldName = 'source' }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const countrySearch = useAppSelector((state) => state.countries.countriesSearch);
  const [searchType] = useState<'country'>('country');
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    dispatch(fetchCountries({ query: value }));
  };

  useEffect(() => {
    const language = (i18n.resolvedLanguage || 'ru') as Language;
    setOptions(
      countrySearch.map((c) => ({
        label: c.name?.[language] || c.name.ru,
        value: c.id,
      }))
    );
  }, [countrySearch, i18n.resolvedLanguage]);

  return (
    <>
      {/* Устанавливаем entity=country */}
      <Form.Item name={[fieldName, 'entity']} initialValue="country" hidden>
        <Select options={[{ label: 'country', value: 'country' }]} />
      </Form.Item>

      <Form.Item name={[fieldName, 'value']} className="input" rules={[{ required: true, message: t('errors.required') }]}>
        <Select
          showSearch
          placeholder={t('inputs.search')}
          size="large"
          className="input"
          onSearch={handleSearch}
          filterOption={false}
          options={options}
        />
      </Form.Item>
    </>
  );
};

export default SearchCountry;
