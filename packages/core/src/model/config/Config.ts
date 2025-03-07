import { ChainId } from '../../constants'

export type NodeUrls = {
  [chainId: number]: string
}

export type MulticallAddresses = {
  [chainId: number]: string
}

export type FullConfig = {
  readOnlyChainId?: ChainId
  readOnlyUrls?: NodeUrls
  switchingChainId?: ChainId
  multicallAddresses?: MulticallAddresses
  supportedChains: number[]
  pollingInterval?: number
  notifications: {
    checkInterval: number
    expirationPeriod: number
  }
  localStorage: {
    transactionPath: string
  }
}

export type Config = Partial<FullConfig>
