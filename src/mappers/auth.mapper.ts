
import { LoginRequestDto, UserResponseDto } from "../dtos/users";
import { LoginFormTypes } from "../types/auth.types";
import { User } from "../types/user";
import { UserRole } from "../utils/roles";

export function mapLoginFormToDto(data: LoginFormTypes) : LoginRequestDto { 
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
    role: userDto.role,
    // role: UserRole[roleAlias] || UserRole.USER,
    language: userDto.language,
    lastLoggedInAt: userDto.lastLoggedInAt ? new Date(userDto.lastLoggedInAt).toISOString() : null,
  };
}
