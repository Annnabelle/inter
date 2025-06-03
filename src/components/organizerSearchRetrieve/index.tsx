import React, { useEffect, useState } from "react";
import { Select, Form } from "antd";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../../store";

type Props = {
  initialValue?: { id: string; name: string };
};

const SearchOrganizerRetrieve: React.FC<Props> = ({ initialValue }) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const organizerSearch = useAppSelector((state) => state.organizer.organizerSearch);

  const [options, setOptions] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    const baseOptions = organizerSearch.map((org) => ({
      label: org.name,
      value: org.id,
    }));

    if (initialValue && !baseOptions.find((opt) => opt.value === initialValue.id)) {
      baseOptions.unshift({
        label: initialValue.name,
        value: initialValue.id,
      });
    }

    setOptions(baseOptions);
  }, [organizerSearch, initialValue]);

  return (
    <>
      <Select
        size="large"
        value="organizer"
        disabled
        options={[
          { label: t("inputs.notSelected") || "Не выбран", value: "none" },
          { label: t("titles.roles.organizer") || "Организатор", value: "organizer" },
        ]}
      />

      <Form.Item name="organizer" className="input" initialValue={initialValue?.id}>
        <Select
          showSearch
          disabled
          size="large"
          placeholder={t("inputs.search")}
          className="input"
          filterOption={false}
          value={initialValue?.id}
          options={options}
        />
      </Form.Item>
    </>
  );
};

export default SearchOrganizerRetrieve;
