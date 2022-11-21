import { priceFormatter } from '../../helpers/formatter'
import { PriceHighLightContainer } from './styles'

interface PriceHighLightProps {
  price: number
  type: 'cash-in' | 'cash-out'
}

export function PriceHighLight({ price, type }: PriceHighLightProps) {
  return (
    <PriceHighLightContainer variant={type}>
      {type === 'cash-out' && '-'}
      {priceFormatter.format(price)}
    </PriceHighLightContainer>
  )
}
