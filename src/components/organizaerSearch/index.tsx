import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { useTranslation } from 'react-i18next';
import { Form, Select } from 'antd';
import { fetchOrganizerSearch } from '../../store/orginizer';

type Props = {
  fieldName?: string;
  initialValue?: { id: string; name: string };
};

const SearchOrganizer: React.FC<Props> = ({ fieldName, initialValue }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const organizerSearch = useAppSelector((state) => state.organizer.organizerSearch);

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);
  const [isOrganizerSelected, setIsOrganizerSelected] = useState(!!initialValue);
  const [selectedOrganizer, setSelectedOrganizer] = useState<string | undefined>(
    initialValue?.id ?? undefined
  );

  const formItemName = fieldName ?? 'organizer';

  useEffect(() => {
    const baseOptions = organizerSearch.map((c) => ({
      label: c.name,
      value: c.id,
    }));

    // Если начальное значение отсутствует в полученных опциях, добавим его вручную
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
    if (!value.trim()) return;
    dispatch(fetchOrganizerSearch({ query: value }));
  };

  return (
    <>
      <Select
        size="large"
        value={isOrganizerSelected ? 'organizer' : 'none'}
        onChange={(value) => {
          const isSelected = value === 'organizer';
          setIsOrganizerSelected(isSelected);
          if (!isSelected) setSelectedOrganizer(undefined);
        }}
        options={[
          { label: t('inputs.notSelected') || 'Не выбран', value: 'none' },
          { label: t('titles.roles.organizer') || 'Организатор', value: 'organizer' },
        ]}
        disabled={!!initialValue}
      />

      <Form.Item
        name={formItemName}
        className="input"
        initialValue={initialValue?.id} 
        rules={[{ required: true, message: t('errors.required') }]}
      >
        <Select
          showSearch
          allowClear
          disabled={!isOrganizerSelected || !!initialValue}
          placeholder={t('inputs.search')}
          size="large"
          className="input"
          onSearch={handleSearch}
          filterOption={false}
          options={options}
          value={selectedOrganizer} 
          onChange={(value) => setSelectedOrganizer(value || undefined)}
        />
      </Form.Item>
    </>
  );
};

export default SearchOrganizer;



