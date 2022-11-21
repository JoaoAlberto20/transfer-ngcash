import { yupResolver } from '@hookform/resolvers/yup'
import { Axios } from 'axios'
import { useContext } from 'react'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'

import { Button } from '../../../../components/Button'
import { Input } from '../../../../components/Input'
import { Modal } from '../../../../components/Modal'
import { Select } from '../../../../components/Select'
import { Title } from '../../../../components/Title'
import { TransactionsContext } from '../../../../context/TransactionsContext'

import { ContainerFilter, ContainerFormFilter } from './styles'

interface ModalFilterTransactionsProps {
  visible: boolean
  handleCloseModal: () => void
}

export const schemasFilterTransactions = yup.object({
  type: yup.string(),
  date: yup.string(),
})

type TypesSchemaFilterTransactions = yup.InferType<
  typeof schemasFilterTransactions
>

export function ModalFilterTransactions({
  visible,
  handleCloseModal,
}: ModalFilterTransactionsProps) {
  const { searchTransactionByDateType } = useContext(TransactionsContext)

  const { control, handleSubmit, reset } =
    useForm<TypesSchemaFilterTransactions>({
      resolver: yupResolver(schemasFilterTransactions),
      defaultValues: {
        type: 'all',
        date: '',
      },
    })

  const handleSubmitFilterTransactions = async (
    data: TypesSchemaFilterTransactions,
  ) => {
    try {
      await searchTransactionByDateType(data)
    } catch (error) {
      if (error instanceof Axios) {
        console.log(error)
      }
    } finally {
      handleCloseModal()
      reset()
    }
  }

  return (
    <Modal visible={visible} handleCloseModal={handleCloseModal}>
      <Title title="Filtrar transações" />
      <ContainerFormFilter
        onSubmit={handleSubmit(handleSubmitFilterTransactions)}
      >
        <ContainerFilter>
          <h3>Filtrar por tipo de laçamento: </h3>

          <Controller
            control={control}
            name="type"
            render={({ field: { onChange, value, name } }) => (
              <Select name={name} value={value} onChange={onChange} required>
                <option value="todos">Todos</option>
                <option value="cash-out">Debito</option>
                <option value="cash-in">Credito</option>
              </Select>
            )}
          />
        </ContainerFilter>
        <ContainerFilter>
          <h3>Filtrar por data: </h3>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <Input
                type="date"
                variant="SECONDARY"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </ContainerFilter>

        <Button type="submit" variant="PRIMARY" title="Filtrar" />
      </ContainerFormFilter>
    </Modal>
  )
}
