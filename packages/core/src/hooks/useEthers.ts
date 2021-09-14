import { useWeb3React , UnsupportedChainIdError} from '@web3-react/core'
import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from '@web3-react/injected-connector'
import {
  UserRejectedRequestError as UserRejectedRequestErrorWalletConnect,
  WalletConnectConnector,
} from '@web3-react/walletconnect-connector'

import { Web3Provider } from '@ethersproject/providers'
import { BscConnector,NoBscProviderError } from '@binance-chain/bsc-connector'
import { ChainId,ConnectorNames, CONNECTOR_LOCAL_STORAGE_KEY } from '../constants'
import { useCallback } from 'react'
import { useConfig } from '../providers/config/context'
import { InjectedConnector } from '@web3-react/injected-connector'
import { getRpcUrls, setupNetwork} from '../helpers'
import { AbstractConnector } from '@web3-react/abstract-connector'

type ActivateBrowserWallet = (connectorId:ConnectorNames,onError?: (error: Error) => void, throwErrors?: boolean) => void
type DeactiveBrowserWallet = () => void

const connectorByName = (connectorId?:ConnectorNames, chainIds?:number[], fullChainIds?:number[], pollingInterval?:number) => {
  if (connectorId === ConnectorNames.Injected){
    return new InjectedConnector({ supportedChainIds: chainIds })
  }
  if (connectorId === ConnectorNames.BSC){
    return new BscConnector({ supportedChainIds: chainIds })
  }

  return new WalletConnectConnector({
    supportedChainIds: chainIds,
    qrcode: true,
    rpc: getRpcUrls(fullChainIds),
    pollingInterval: pollingInterval,
  })
}

export type Web3Ethers = ReturnType<typeof useWeb3React> & {
  library?: Web3Provider
  chainId?: ChainId
  activateBrowserWallet?: ActivateBrowserWallet
  logout?: DeactiveBrowserWallet
}

// export function useEthers(): Web3Ethers {
//   const result = useWeb3React<Web3Provider>()
//   const { supportedChains } = useConfig()
//   const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
//     async (onError, throwErrors) => {
//       const injected = new InjectedConnector({ supportedChainIds: supportedChains })
//       if (onError instanceof Function) {
//         await result.activate(injected, onError, throwErrors)
//       } else {
//         await result.activate(injected, undefined, throwErrors)
//       }
//     },
//     [supportedChains]
//   )
//   return { ...result, activateBrowserWallet }
// }

export function useEthers(): Web3Ethers {
  const result = useWeb3React<Web3Provider>()
  const { supportedChains, switchingChainId, pollingInterval} = useConfig()
  const chainIds = (switchingChainId === undefined) ? supportedChains : [switchingChainId]
  
  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    (connectorId, onError, throwErrors) => {
      const connector = connectorByName(connectorId,chainIds,supportedChains,pollingInterval)
      if (connector){
          result.activate(connector, async (error: Error) => {
              if (!(connector instanceof WalletConnectConnector) && 
                  error instanceof UnsupportedChainIdError){
              if (switchingChainId) {
                const hasSetup = await setupNetwork(switchingChainId)
                if (hasSetup) {
                  result.activate(connector)
                }
              }
            }else{
              window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY)
              if (
                error instanceof UserRejectedRequestErrorInjected || 
                error instanceof UserRejectedRequestErrorWalletConnect
              ) {
                if (connector instanceof WalletConnectConnector) {
                  const walletConnector = connector as WalletConnectConnector
                  walletConnector.walletConnectProvider = null
                }
              }
            }
            if (onError instanceof Function) {
              onError(error)
            }
          },throwErrors)
        }
    },
    [result,chainIds,pollingInterval,switchingChainId,supportedChains]
  )

  const logout = useCallback<DeactiveBrowserWallet>(() => {
    window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY)
    result.deactivate()
    if (window.localStorage.getItem('walletconnect')) {
      if (result.connector instanceof WalletConnectConnector){
          result.connector.close()
          result.connector.walletConnectProvider = null
      }
    }
  }, [result])

  return { ...result,activateBrowserWallet,logout} 
}
