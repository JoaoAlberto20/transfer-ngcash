import { useContext } from 'react'
import { AuthContext } from '../../../../context/AuthContext'

import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { SchemaSigUp, TypesSchemaSigUp } from '../../../../helpers/schemas'

import { AxiosError } from 'axios'

import { Input } from '../../../../components/Input'
import { Title } from '../../../../components/Title'
import { Button } from '../../../../components/Button'

import { ContentInput, FormSingUpnContainer } from './styles'

import { LockSimple, User } from 'phosphor-react'
import { toast } from 'react-toastify'

export function FormSingUp() {
  const { create } = useContext(AuthContext)

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TypesSchemaSigUp>({
    resolver: yupResolver(SchemaSigUp),
    defaultValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const handleSingUp = async (data: TypesSchemaSigUp) => {
    try {
      await create(data)
      toast.success('Cadastro feito com sucesso.')
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.info(error.response?.data.message)
      }
    }
  }

  return (
    <FormSingUpnContainer onSubmit={handleSubmit(handleSingUp)}>
      <Title title="Cadastrar" />
      <ContentInput>
        <div>
          <label htmlFor="">Username:</label>
          <Controller
            name="username"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                placeholder="Digite seu username"
                variant="PRIMARY"
                icon={<User />}
                value={value}
                onChange={onChange}
                errorMessage={errors.username?.message}
                autoComplete="true"
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
                placeholder="Digite sua senha"
                variant="PRIMARY"
                icon={<LockSimple />}
                value={value}
                onChange={onChange}
                errorMessage={errors.password?.message}
              />
            )}
          />
        </div>
        <div>
          <label htmlFor="">Confirme seu password:</label>
          <Controller
            name="passwordConfirm"
            control={control}
            render={({ field: { onChange, value } }) => (
              <Input
                type="password"
                placeholder="Confirme a sua senha"
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
      <Button type="submit" variant="PRIMARY" title="Entrar" />
    </FormSingUpnContainer>
  )
}
