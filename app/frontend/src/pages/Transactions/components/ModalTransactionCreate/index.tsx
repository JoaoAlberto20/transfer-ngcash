import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Modal } from '../../../../components/Modal'
import { TransactionsContext } from '../../../../context/TransactionsContext'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { ContainerForm, ContainerInputs } from './styles'
import { Input } from '../../../../components/Input'
import { Button } from '../../../../components/Button'
import { Title } from '../../../../components/Title'

export const schemasNewTransactions = yup.object({
  username: yup
    .string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters long'),
  value: yup
    .string()
    .required('Value is required')
    .min(1, 'Value must be greater than one'),
})

type TypesNewTransactions = yup.InferType<typeof schemasNewTransactions>

interface ModalTransactionCreateProps {
  visible: boolean
  handleCloseModal: () => void
}

export function ModalTransactionCreate({
  handleCloseModal,
  visible,
}: ModalTransactionCreateProps) {
  const { createTransactions } = useContext(TransactionsContext)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<TypesNewTransactions>({
    resolver: yupResolver(schemasNewTransactions),
    defaultValues: {
      username: '',
      value: '0.00',
    },
  })

  const handleNewTransactions = async (data: TypesNewTransactions) => {
    try {
      await createTransactions(data)
      toast.success('Transação feito com sucesso.')
      reset()
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.info(error.response?.data.message)
      }
    }
  }

  return (
    <Modal visible={visible} handleCloseModal={handleCloseModal}>
      <Title title="Nova transação" />
      <ContainerForm onSubmit={handleSubmit(handleNewTransactions)}>
        <ContainerInputs>
          <Controller
            control={control}
            name="username"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                variant="SECONDARY"
                placeholder="Username para quem você vai enviar o valor"
                value={value}
                onChange={onChange}
                errorMessage={errors.username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="value"
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                mask="currency"
                variant="SECONDARY"
                placeholder="Valor da Transação"
                value={value}
                onChange={onChange}
                errorMessage={errors.value?.message}
              />
            )}
          />
        </ContainerInputs>
        <Button
          type="submit"
          variant="PRIMARY"
          title="Realizar transação"
          disabled={!isValid}
        />
      </ContainerForm>
    </Modal>
  )
}
