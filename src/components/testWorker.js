import { testItems } from './test.worker'

const cardItems = typeof window === 'object' && new testItems()

export default cardItems