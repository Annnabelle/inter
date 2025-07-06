import { useEffect, useState } from 'react';
import { Input, Form } from 'antd';
import { useTranslation } from 'react-i18next';
import { debounce } from 'lodash';

interface SearchExpertProps {
  onSearch: (query: string) => void;
}

const SearchExpert: React.FC<SearchExpertProps> = ({ onSearch }) => {
  const { t } = useTranslation();
  const [inputValue, setInputValue] = useState('');

  const debouncedSearch = debounce((value: string) => {
    onSearch(value);
  }, 500);

  useEffect(() => {
    debouncedSearch(inputValue);
    return () => {
      debouncedSearch.cancel();
    };
  }, [inputValue]);

  return (
    <div className="form-inputs">
      <Form.Item
        className="input"
        name="searchExpert"
      >
        <Input
          size="large"
          placeholder={t('inputs.searchExpert')}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          allowClear
        />
      </Form.Item>
    </div>
  );
};

export default SearchExpert;

