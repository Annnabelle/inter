import { LoginForm } from "../store/authSlice";
import { User } from "../types/user";
import { LoginRequestDto, UserResponseDto } from "./dtos";
import { UserRole } from "./roles";

export function mapLoginFormToDto(data: LoginForm) : LoginRequestDto { 
  return {
    email: data.email,
    password: data.password,
  };
}

export function mapUserDtoToUser(userDto: UserResponseDto): User {
  const roleAlias = userDto.role.alias.toUpperCase() as keyof typeof UserRole;

  return {
    id: userDto.id,
    firstName: userDto.firstName,
    lastName: userDto.lastName,
    email: userDto.email,
    phone: userDto.phone,
    status: userDto.status,
    role: UserRole[roleAlias] || UserRole.USER,
    language: userDto.language,
    lastLoggedInAt: userDto.lastLoggedInAt ? new Date(userDto.lastLoggedInAt) : null,
  };
}




