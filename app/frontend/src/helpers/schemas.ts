import * as yup from 'yup'

const schemas = {
  username: yup
    .string()
    .min(3, 'Digite pelo menos 3 caracteres')
    .trim()
    .required('Informe o username'),
  password: yup
    .string()
    .min(8, 'Digite pelo menos 8 caracteres')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).*$/,
      'A senha deve conter pelo menos uma letra maiúscula e uma minúscula, e um número',
    )
    .required('Informe o password'),
}

export const SchemaSigIn = yup.object({
  ...schemas,
})

export const SchemaSigUp = yup.object({
  ...schemas,
  passwordConfirm: yup
    .string()
    .required('Confirme a senha')
    .oneOf([yup.ref('password'), null], 'A confirmação da senha não confere'),
})

export type TypesSchemaSigIn = yup.InferType<typeof SchemaSigIn>

export type TypesSchemaSigUp = yup.InferType<typeof SchemaSigUp>
