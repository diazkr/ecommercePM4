import { SetMetadata } from "@nestjs/common";
import { Rol } from "src/auth/roles.enum";

export const Roles = (...roles:Rol[]) => SetMetadata('roles',roles)