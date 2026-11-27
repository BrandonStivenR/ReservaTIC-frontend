// Pruebas unitarias de las validaciones del front-end (se ejecutan con: npm test)
import { describe, it, expect } from "vitest";
import {
  fichaValida, usuarioValido, horasCoherentes, hayCruce,
  validarLogin, validarRegistro, validarReserva,
} from "./validaciones.js";

const reservaBase = { ambienteId: 1, fecha: "2027-03-15", horaInicio: "08:00", horaFin: "10:00", estado: "PENDIENTE" };

describe("fichaValida y usuarioValido", () => {
  it("acepta una ficha numérica", () => expect(fichaValida("3336092")).toBe(true));
  it("rechaza caracteres especiales en la ficha", () => expect(fichaValida("33@#")).toBe(false));
  it("rechaza una ficha demasiado corta", () => expect(fichaValida("ab")).toBe(false));
  it("acepta un usuario válido", () => expect(usuarioValido("brandon.r")).toBe(true));
  it("rechaza un usuario con espacios", () => expect(usuarioValido("mi usuario")).toBe(false));
});

describe("horasCoherentes", () => {
  it("acepta fin posterior al inicio", () => expect(horasCoherentes("08:00", "10:00")).toBe(true));
  it("rechaza fin anterior al inicio", () => expect(horasCoherentes("15:00", "14:00")).toBe(false));
  it("ignora los segundos que envía el servidor", () => expect(horasCoherentes("08:00:00", "10:00:00")).toBe(true));
});

describe("hayCruce", () => {
  const existentes = [reservaBase];
  it("detecta horarios traslapados", () =>
    expect(hayCruce({ ...reservaBase, horaInicio: "09:00", horaFin: "11:00" }, existentes)).toBe(true));
  it("permite franjas contiguas", () =>
    expect(hayCruce({ ...reservaBase, horaInicio: "10:00", horaFin: "12:00" }, existentes)).toBe(false));
  it("permite otro ambiente en la misma franja", () =>
    expect(hayCruce({ ...reservaBase, ambienteId: 2 }, existentes)).toBe(false));
  it("ignora las reservas canceladas", () =>
    expect(hayCruce(reservaBase, [{ ...reservaBase, estado: "CANCELADA" }])).toBe(false));
});

describe("validarLogin y validarRegistro", () => {
  it("exige usuario y contraseña", () => {
    const e = validarLogin({ usuario: "", contrasena: "" });
    expect(Object.keys(e)).toEqual(["usuario", "contrasena"]);
  });
  it("rechaza un registro con datos inválidos", () => {
    const e = validarRegistro({ nombre: "Ab", usuario: "ab", contrasena: "123" });
    expect(Object.keys(e)).toEqual(["nombre", "usuario", "contrasena"]);
  });
  it("acepta un registro correcto", () =>
    expect(validarRegistro({ nombre: "Ana Gómez", usuario: "ana", contrasena: "Clave123" })).toEqual({}));
});

describe("validarReserva", () => {
  const hoy = "2026-11-27";
  const datos = { ...reservaBase, ficha: "3336092" };
  it("acepta una reserva válida", () => expect(validarReserva(datos, [], hoy)).toEqual({}));
  it("rechaza una fecha pasada", () =>
    expect(validarReserva({ ...datos, fecha: "2026-01-01" }, [], hoy).fecha).toBeDefined());
  it("rechaza una ficha con símbolos", () =>
    expect(validarReserva({ ...datos, ficha: "33@#" }, [], hoy).ficha).toBeDefined());
  it("rechaza un cruce de horario", () =>
    expect(validarReserva({ ...datos, horaInicio: "09:00", horaFin: "11:00" }, [reservaBase], hoy).horaInicio).toBeDefined());
});
