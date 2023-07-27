export const expresions = {
    name: /^[a-zA-Z]+( [a-zA-Z]+)+$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&#.])[A-Za-z\d$@$!%*?&#.]{8,15}$/, //contrasena debe tener entre 8-15 caract., minus, mayus, num y caract especial [$@$!%*?&#.] cualquier a de los que estan dentro de los corchetes
    phoneCode: /^(?:\+)?[1-9]{1,3}$/,
    phone: /^[0-9]{6,15}$/,
    birthday: /^(?:19[5-9]\d|20[0-1]\d)(\/|-)(0[1-9]|1[0-2])(\/|-)([0-2][0-9]|3[0-1])$/
  }
