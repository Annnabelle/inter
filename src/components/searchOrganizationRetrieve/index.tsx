import React, { useEffect, useState } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchOrganizationSearch } from '../../store/organizations';
import { Language } from '../../i18n';

interface SearchOrganizationProps {
  value?: string | number;
  onChange?: (value: string | number) => void;
  disabled?: boolean;
  currentName?: string; // сюда можно прокинуть имя организации из props для disabled режима
}

const SearchOrganizationRetrieve: React.FC<SearchOrganizationProps> = ({
  value,
  onChange,
  disabled = false,
  currentName,
}) => {
  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const organizationSearch = useAppSelector((state) => state.organizations.organizationSearch);
  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  const language = (i18n.resolvedLanguage || 'ru') as Language;

  useEffect(() => {
    setOptions(
      organizationSearch.map((c) => ({
        label: c.name?.[language] || c.name.ru,
        value: c.id,
      }))
    );
  }, [organizationSearch, language]);

  const mergedOptions = disabled && value && currentName
    ? [{ label: currentName, value: value.toString() }, ...options]
    : options;

  return (
    <Select
      showSearch={!disabled}
      placeholder={t('inputs.search')}
      size="large"
      className="input"
      onSearch={disabled ? undefined : (val) => dispatch(fetchOrganizationSearch({ query: val }))}
      filterOption={false}
      options={mergedOptions}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default SearchOrganizationRetrieve;

