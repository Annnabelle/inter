import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { fetchOrganizerSearch } from '../../store/orginizer';

type Props = {
  fieldName?: string;
  initialValue?: { id: string; name: string };
};

const SearchOrganizerEdit: React.FC<Props> = ({ fieldName, initialValue }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const organizerSearch = useAppSelector((state) => state.organizer.organizerSearch);

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [selectedValue, setSelectedValue] = useState<string | undefined>(undefined);
  const [searchType, setSearchType] = useState(initialValue ? 'organizer' : 'none');

  const formItemName = fieldName ?? 'organizer';

  useEffect(() => {
    if (initialValue?.id) {
      setSelectedValue(initialValue.id);
    }
  }, [initialValue]);

  useEffect(() => {
    const baseOptions = organizerSearch.map((c) => ({
      label: c.name,
      value: c.id,
    }));

    if (
      initialValue &&
      !baseOptions.find((opt) => opt.value === initialValue.id)
    ) {
      baseOptions.unshift({
        label: initialValue.name,
        value: initialValue.id,
      });
    }

    setOptions(baseOptions);
  }, [organizerSearch, initialValue]);

  const handleSearch = (value: string) => {
    if (value.trim()) {
      dispatch(fetchOrganizerSearch({ query: value }));
    }
  };

  return (
    <>
      <Select
        size="large"
        value={searchType}
        onChange={(value) => {
          setSearchType(value);
          if (value !== 'organizer') {
            setSelectedValue(undefined);
          } else if (initialValue?.id) {
            setSelectedValue(initialValue.id);
          }
        }}
        options={[
          { label: t('inputs.notSelected') || 'Не выбран', value: 'none' },
          { label: t('titles.roles.organizer') || 'Организатор', value: 'organizer' },
        ]}
      />

      <Form.Item name={formItemName} className="input" initialValue={initialValue?.id}>
        <Select
          showSearch
          allowClear
          placeholder={t('inputs.search')}
          size="large"
          className="input"
          onSearch={handleSearch}
          filterOption={false}
          disabled={searchType !== 'organizer'}
          options={options}
          value={selectedValue}
          onChange={(value) => setSelectedValue(value || undefined)}
        />
      </Form.Item>
    </>
  );
};

export default SearchOrganizerEdit;


