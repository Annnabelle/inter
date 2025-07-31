import React, { useEffect, useState } from "react";
import { Input, List, Tag, Spin, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { searchUsers } from "../../store/usersSlice";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

const UserSearch: React.FC = () => {
  const dispatch = useAppDispatch();
  const form = useFormInstance(); // получаем форму из контекста

  const [query, setQuery] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const users = useAppSelector((state) => state.users.usersSearch);
  const loading = useAppSelector((state) => state.users.loading);

  useEffect(() => {
    if (query.trim() === "") return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      dispatch(searchUsers({ query }));
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    form.setFieldValue("agencyEmployees", selectedUserIds);
  }, [selectedUserIds]);

  const handleSelectUser = (userId: string) => {
    if (!selectedUserIds.includes(userId)) {
      setSelectedUserIds((prev) => [...prev, userId]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  return (
    <div className="agency-employees-search">
      <Form.Item
        name="agencyEmployees"
        hidden
        rules={[{ required: true, message: "Выберите хотя бы одного сотрудника" }]}
      >
        <Input className="input" size="large" />
      </Form.Item>

      <Input
        placeholder="Введите имя сотрудника"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        allowClear
        className="input" size="large"
      />

    {loading ? (
        <Spin />
        ) : (
        <div style={{ maxHeight: 200, overflowY: "auto" }}>
            <List
            size="small"
            bordered
            dataSource={users?.filter((user) => !selectedUserIds.includes(user.id)) || []}
            renderItem={(user) => (
                <List.Item
                onClick={() => handleSelectUser(user.id)}
                style={{ cursor: "pointer" }}
                >
                {user.firstName} {user.lastName}
                </List.Item>
            )}
            />
        </div>
    )}


      {selectedUserIds.length > 0 && (
        <>
          <div className="inputs-label" style={{marginTop: "20px"}}>
                <p className="label">Выбранные сотрудники</p>
            </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 25 }}>
            {selectedUserIds.map((id) => {
              const user = users?.find((u) => u.id === id);
              return (
                <Tag
                  key={id}
                  closable
                  onClose={() => handleRemoveUser(id)}
                  color="blue"
                >
                  {user?.firstName} {user?.lastName}
                </Tag>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;


