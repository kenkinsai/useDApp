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
import { rpcURLs } from '../helpers'

type ActivateBrowserWallet = (connectorId?:ConnectorNames,setupNetwork?: () => Promise<boolean>, onError?: (error: Error) => void, throwErrors?: boolean) => void
type DeactiveBrowserWallet = () => void
const connectorByName = (connectorId?:ConnectorNames, supportedChainIds?:number[]) => {
  if (connectorId === ConnectorNames.Injected){
    return new InjectedConnector({ supportedChainIds: supportedChainIds })
  }
  if (connectorId === ConnectorNames.BSC){
    return new BscConnector({ supportedChainIds: supportedChainIds })
  }

  return new WalletConnectConnector({
    supportedChainIds: supportedChainIds,
    qrcode: true,
    rpc:  rpcURLs(supportedChainIds),
    pollingInterval: 12000
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
  const { supportedChains, switchingChainId} = useConfig()
  const chainIds = (switchingChainId === undefined) ? supportedChains : [switchingChainId]
  const activateBrowserWallet = useCallback<ActivateBrowserWallet>(
    async (connectorId,setupNetwork, onError, throwErrors) => {
        const connector = connectorByName(connectorId,chainIds)
        if (connector){
          await result.activate(connector, async (error: Error) => {
            if (error instanceof UnsupportedChainIdError){
              if (setupNetwork instanceof Function) {
                const hasSetup = await setupNetwork()
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
    [result,chainIds]
  )

  const logout = useCallback<DeactiveBrowserWallet>(() => {
    result.deactivate()
    if (window.localStorage.getItem('walletconnect')) {
      const connector = connectorByName(ConnectorNames.WalletConnect,chainIds)
      if (connector instanceof WalletConnectConnector){
        connector.close()
        connector.walletConnectProvider = null
      }
    }
    window.localStorage.removeItem(CONNECTOR_LOCAL_STORAGE_KEY)
  }, [result,chainIds])

  return { ...result,activateBrowserWallet,logout} 
}
