import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { Select } from 'antd';
import { Language } from '../../i18n';
import { fetchOrganizationSearch } from '../../store/organizations';

interface Organization {
  id: string;
  name: {
    ru: string;
    uz: string;
    en: string;
  };
  [key: string]: any;
}

interface SearchOrganizationProps {
  value?: any;
  onChange?: (value: string) => void;
}

const SearchOrganizationEdit: React.FC<SearchOrganizationProps> = ({ value, onChange }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const handleSearch = (query: string) => {
    if (!query.trim()) return;
    dispatch(fetchOrganizationSearch({ query }));
  };

  useEffect(() => {
    const language = (i18n.resolvedLanguage || 'ru') as Language;

    const dynamicOptions = organizationSearch.map((org: Organization) => ({
      label: org.name?.[language] || org.name.ru,
      value: org.id,
    }));

    const isValueObject = typeof value === 'object' && value !== null && 'id' in value;

    if (isValueObject && !dynamicOptions.some((opt) => opt.value === value.id)) {
      dynamicOptions.unshift({
        label: value.name?.[language] || value.name.ru,
        value: value.id,
      });
    }

    setOptions(dynamicOptions);
  }, [organizationSearch, value, i18n.resolvedLanguage]);

  const selectedValue = typeof value === 'object' && value !== null && 'id' in value ? value.id : value;

  return (
    <Select
      showSearch
      placeholder={t('inputs.search')}
      size="large"
      className="input"
      onSearch={handleSearch}
      filterOption={false}
      options={options}
      value={selectedValue}
      onChange={onChange}
    />
  );
};

export default SearchOrganizationEdit;
