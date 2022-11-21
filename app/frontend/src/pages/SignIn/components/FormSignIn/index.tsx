import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaSigIn, TypesSchemaSigIn } from '../../../../helpers/schemas'

import { AxiosError } from 'axios'

import { Input } from '../../../../components/Input'
import { Title } from '../../../../components/Title'
import { Button } from '../../../../components/Button'

import { ContentInput, FormFormSignInContainer } from './styles'

import { LockSimple, User } from 'phosphor-react'
import { toast } from 'react-toastify'

export function FormSignIn() {
  const { login } = useContext(AuthContext)

  const {
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<TypesSchemaSigIn>({
    resolver: yupResolver(SchemaSigIn),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const handleSignIn = async (data: TypesSchemaSigIn) => {
    try {
      await login(data)
      toast.success('Login feito com sucesso.')
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        toast.warning(error.response?.data.message)
      }
    }
  }

  return (
    <FormFormSignInContainer onSubmit={handleSubmit(handleSignIn)}>
      <Title title="Entrar" />
      <ContentInput>
        <div>
          <label htmlFor="">Username:</label>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Digite seu username cadastrado"
                variant="PRIMARY"
                icon={<User />}
                value={value}
                onChange={onChange}
                errorMessage={errors.username?.message}
              />
            )}
          />
        </div>

        <div>
          <label htmlFor="">Password:</label>
          <Controller
            name="password"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                placeholder="Digite sua senha cadastrado"
                variant="PRIMARY"
                icon={<LockSimple />}
                value={value}
                onChange={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </div>
      </ContentInput>
      <Button
        type="submit"
        variant="PRIMARY"
        title="Entrar"
        disabled={!isValid}
      />
    </FormFormSignInContainer>
  )
}
