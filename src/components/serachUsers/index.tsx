import React, { useEffect, useState } from "react";
import { Input, List, Tag, Spin, Form } from "antd";
import { useAppDispatch, useAppSelector } from "../../store";
import { searchUsers } from "../../store/usersSlice";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { useTranslation } from "react-i18next";

const UserSearch: React.FC = () => {
  const {t} = useTranslation();
  const dispatch = useAppDispatch();
  const form = useFormInstance(); 

  const [query, setQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<
    { id: string; firstName: string; lastName: string }[]
  >([]);
  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const users = useAppSelector((state) => state.users.usersSearch);
  const loading = useAppSelector((state) => state.users.loading);

  // Поиск пользователей с debounce
  useEffect(() => {
    if (query.trim() === "") return;

    if (debounceTimer) clearTimeout(debounceTimer);

    const timer = setTimeout(() => {
      dispatch(searchUsers({ query }));
    }, 300);

    setDebounceTimer(timer);
    return () => clearTimeout(timer);
  }, [query, dispatch]);

  // Передача ID выбранных сотрудников в форму
  useEffect(() => {
    form.setFieldValue("agencyEmployees", selectedUsers.map((u) => u.id));
  }, [selectedUsers, form]);

  const handleSelectUser = (user: { id: string; firstName: string; lastName: string }) => {
    if (!selectedUsers.some((u) => u.id === user.id)) {
      setSelectedUsers((prev) => [...prev, user]);
      setQuery(""); // очистка поля после выбора
    }
  };

  const handleRemoveUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  return (
    <div className="agency-employees-search">
      <Form.Item
        name="agencyEmployees"
        hidden
        rules={[{ required: true, message: "Выберите хотя бы одного сотрудника" }]}
      >
        <Input />
      </Form.Item>

      <Input
        placeholder="Введите имя сотрудника"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        allowClear
        size="large"
      />

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 10 }}>
          <Spin />
        </div>
      ) : (
        query.trim() !== "" && (
          <div style={{ maxHeight: 200, overflowY: "auto", marginTop: 8 }}>
            <List
              size="small"
              bordered
              dataSource={
                users?.filter((user) => !selectedUsers.some((u) => u.id === user.id)) || []
              }
              renderItem={(user) => (
                <List.Item
                  onClick={() => handleSelectUser(user)}
                  style={{ cursor: "pointer" }}
                >
                  {user.firstName} {user.lastName}
                </List.Item>
              )}
            />
          </div>
        )
      )}

      {selectedUsers.length > 0 && (
        <>
          <div className="inputs-label" style={{ marginTop: "20px" }}>
            <p className="label">{t("titles.selectedEmployees")}</p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 20,
            }}
          >
            {selectedUsers.map((user) => (
              <Tag
                key={user.id}
                closable
                onClose={() => handleRemoveUser(user.id)}
                color="blue"
              >
                {user.firstName} {user.lastName}
              </Tag>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default UserSearch;



