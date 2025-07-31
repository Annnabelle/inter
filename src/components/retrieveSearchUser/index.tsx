import React, { useEffect, useState } from "react";
import { Input, List, Tag, Spin, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { retrieveUserById, searchUsers } from "../../store/usersSlice";
import useFormInstance from "antd/es/form/hooks/useFormInstance";

interface RetrieveUserSearchProps {
  initialValue?: string[]; // Массив ID
  readonly?: boolean;
}

const RetrieveUserSearch: React.FC<RetrieveUserSearchProps> = ({ initialValue = [], readonly = false }) => {

  const dispatch = useAppDispatch();
  const form = useFormInstance();

  const [query, setQuery] = useState("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>(initialValue);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const users = useAppSelector((state) => state.users.users);
  const usersSearch = useAppSelector((state) => state.users.usersSearch);
  const loading = useAppSelector((state) => state.users.loading);

    useEffect(() => {
        if (initialValue.length > 0) {
            initialValue.forEach((id) => {
            dispatch(retrieveUserById(id));
            });
        }
    }, [dispatch, initialValue]);



  useEffect(() => {
    form.setFieldValue("agencyEmployees", selectedUserIds);
  }, [selectedUserIds]);

  useEffect(() => {
    if (readonly || query.trim() === "") return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      dispatch(searchUsers({ query }));
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [query]);

  const handleSelectUser = (userId: string) => {
    if (!selectedUserIds.includes(userId)) {
      setSelectedUserIds((prev) => [...prev, userId]);
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUserIds((prev) => prev.filter((id) => id !== userId));
  };

  const displayedUsers = readonly
    ? users.filter((u) => selectedUserIds.includes(u.id))
    : usersSearch.filter((u) => !selectedUserIds.includes(u.id));

  return (
    <div className="agency-employees-search">
      <Form.Item name="agencyEmployees" hidden>
        <Input />
      </Form.Item>

      {!readonly && (
        <Input
          placeholder="Введите имя сотрудника"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          allowClear
          className="input"
          size="large"
        />
      )}

      {!readonly && (
        loading ? (
          <Spin />
        ) : (
          <div style={{ maxHeight: 200, overflowY: "auto" }}>
            <List
              size="small"
              bordered
              dataSource={displayedUsers}
              renderItem={(user) => (
                <List.Item onClick={() => handleSelectUser(user.id)} style={{ cursor: "pointer" }}>
                  {user.firstName} {user.lastName}
                </List.Item>
              )}
            />
          </div>
        )
      )}

      {selectedUserIds.length > 0 && (
        <>
          <div className="inputs-label" style={{ marginTop: "20px" }}>
            <p className="label">Выбранные сотрудники</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 25 }}>
            {selectedUserIds.map((id) => {
              const user = users.find((u) => u.id === id);
              return (
                <Tag
                  key={id}
                  closable={!readonly}
                  onClose={() => !readonly && handleRemoveUser(id)}
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

export default RetrieveUserSearch;

