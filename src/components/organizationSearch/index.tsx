import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { Language } from '../../i18n';
import { fetchOrganizationSearch } from '../../store/organizations';

interface SearchOrganizationProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
}

const SearchOrganization: React.FC<SearchOrganizationProps>= ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const handleSearch = (value: string) => {
    if (!value.trim()) return;
    dispatch(fetchOrganizationSearch({ query: value }));
  };

  useEffect(() => {
    const language = (i18n.resolvedLanguage || 'ru') as Language;
    setOptions(
      organizationSearch.map((c) => ({
        label: c.name?.[language] || c.name.ru,
        value: c.id,
      }))
    );
  }, [organizationSearch, i18n.resolvedLanguage]);

  return (
    <>
         <Select
            showSearch
            placeholder={t('inputs.search')}
            size="large"
            className="input"
            onSearch={handleSearch}
            filterOption={false}
            options={options}
            value={value}
            onChange={onChange} 
            />
    </>
  );
};

export default SearchOrganization;