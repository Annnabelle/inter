import { PaginatedResponse, PaginatedResponseDto } from "../dtos/main.dto";
import { LoginRequestDto, UserRegisterRequestDto, UserRequestUpdateDto, UserResponseDto } from "../dtos/users";
import { UserUpdateType } from "../store/usersSlice";
import { User, userLoginType, UserRegister } from "../types/user";

  export function mapUserDtoToUser(userDto: UserResponseDto): User {
    return {
      id: userDto.id,
      firstName: userDto.firstName,
      lastName: userDto.lastName,
      email: userDto.email,
      phone: userDto.phone,
      status: userDto.status,
      role: {
        name:{
          en: userDto.role.name.en,
          uz: userDto.role.name.uz,
          ru: userDto.role.name.ru
        }
      },
      language: userDto.language,
      lastLoggedInAt: userDto.lastLoggedInAt,
    }
  };

  export function mapUserLoginToLoginRequestDto(userLogin: userLoginType): LoginRequestDto{
    return{
      email: userLogin.email,
      password: userLogin.password
    }
  }

export function mapUserRegisterToUserRegisterDto(user: UserRegister): UserRegisterRequestDto{
  return{
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    role: user.role,
    password: user.password, 
    language: user.language,
  }
}


export function mapUserUpdateToUpdateUserDto(user: UserUpdateType): UserRequestUpdateDto{
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    phone: user.phone,
    email: user.email,
    language: user.language
  };
};

export function mapPaginatedUsersDtoToPaginatedUsers(paginatedUsers: PaginatedResponseDto<UserResponseDto>): PaginatedResponse<User>{
  return {
    page: paginatedUsers.page,
    limit: paginatedUsers.limit,
    total: paginatedUsers.total,
    data: paginatedUsers.data.map(userDto => {
      return mapUserDtoToUser(userDto)
    })
  }
}


  