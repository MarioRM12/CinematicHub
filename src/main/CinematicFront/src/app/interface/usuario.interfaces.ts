import {Lista} from "./lista.interfaces";

export type RolUsuario = "ADMIN" | "USER";

export interface Usuario {
  idUsuario: number;
  username: string;
  rol: RolUsuario; // Usando el nuevo tipo definido
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  correo: string;
  password: string;
  listas: Array<Lista>;
}
// Usuario predeterminado
export const defaultUsuario: Usuario = {
  idUsuario: 0,
  username: '',
  rol: 'USER', // Valor predeterminado como ejemplo
  nombre: '',
  apellido: '',
  fechaNacimiento: new Date(),
  correo: '',
  password: '',
  listas: []
};
