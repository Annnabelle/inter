// import { AdministrationDataType, User } from "../types/user";
  
// import { format } from 'date-fns';
// import { useTranslation } from 'react-i18next';
// import {TFunction} from 'i18next'


// export const mapUsersToAdministrationData = (users: User[], t: TFunction): AdministrationDataType[] => {
//     const { i18n } = useTranslation();
    
//     return users.map((user) => {
//       const roleName = user.role.name;
//       const language = i18n.language as keyof typeof roleName;
      
//       // Если язык не существует в role.name, использовать английский
//       const translatedRole = roleName[language] || roleName['en'];
  
//       return {
//         key: String(user.id),
//         name: user.firstName,
//         role: translatedRole,
//         status: user.status ? 'Active' : 'Inactive',
//         lastLoggedInAt: user.lastLoggedInAt ? format(new Date(user.lastLoggedInAt), 'dd.MM.yyyy') : '',
//         action: t('buttons.edit'),
//       };
//     });
//   };
  