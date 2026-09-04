const validateEmail = (email) => {
  if (typeof email !== 'string') return false;
  if (/\s/.test(email)) return false;
  if (email.includes('..')) return false;

  // Regla de validación de sintaxis:
  // ^[a-zA-Z0-9._%+-]+ -> name: caracteres alfanuméricos y símbolos permitidos
  // @                  -> Arroba obligatoria
  // [a-zA-Z0-9.-]+     -> Dominio: caracteres alfanuméricos y guiones
  // \.[a-zA-Z]{2,}$    -> Extensión/TLD: punto seguido de al menos 2 letras (.com, .org, .es)
  const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regexEmail.test(email);
};

const validateName = (name) => {
  // Asegura que la entrada sea una cadena de texto
  if (typeof name !== 'string') return false;

  // 1. Longitud permitida (entre 8 y 20 caracteres)
  if (name.length < 8 || name.length > 20) return false;

  // 2. Restricción de puntos consecutivos
  if (name.includes('..')) return false;

  // \p{L} -> cualquier letra (incluye mayúsculas, minúsculas, tildes, ñ)
  // \s    -> espacios entre nombres/apellidos
  // '     -> opcional para apellidos como O'Connor o D'Angelo
  const regexFullName = /^\p{L}+([\s'-]\p{L}+)*$/u;

  return regexFullName.test(name);
};

const validatePassword = (password) => {
  if (typeof password !== 'string') {
    return false;
  }

  // 1. Longitud mínima (mínimo 8 caracteres) y máxima recomendada (al menos 64)
  const LONGITUD_MINIMA = 8;
  const LONGITUD_MAXIMA = 64;

  if (password.length < LONGITUD_MINIMA) {
    return false;
  }
  if (password.length > LONGITUD_MAXIMA) {
    return false;
  }

  // 2. Comprobación de secuencias triviales o repeticiones excesivas (ej: "aaaaa", "123456")
  const regexRepeticion = /(.)\1{3,}/; // 4 o más caracteres idénticos consecutivos
  if (regexRepeticion.test(password)) {
    return false;
  }

  const secuenciasComunes = ['12345678', '87654321', 'qwertyui', 'asdfghjk'];
  const passwordLower = password.toLowerCase();
  for (const seq of secuenciasComunes) {
    if (passwordLower.includes(seq)) {
      return false;
    }
  }

  return true;
};

export default function validateUser(email, name, password) {
  const errors = [];

  if (!validateEmail(email)) {
    errors.push('You need to POST a valid email');
  }
  if (!validateName(name)) {
    errors.push('You need to POST a valid Name');
  }

  if (!validatePassword(password)) {
    errors.push('You need to POST a valid password');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
