import { NetworkConnector } from '@web3-react/network-connector'
import { useEffect } from 'react'
import { useEthers } from '../hooks'
import { InjectedConnector } from '@web3-react/injected-connector'
import { useConfig } from './config/context'
import { CONNECTOR_LOCAL_STORAGE_KEY ,ConnectorNames} from '../constants'

const _binanceChainListener = async () =>
  new Promise<void>((resolve) =>
    Object.defineProperty(window, 'BinanceChain', {
      get() {
        return this.bsc
      },
      set(bsc) {
        this.bsc = bsc

        resolve()
      },
    }),
  )

export function NetworkActivator() {
  const { activate, account, chainId: connectedChainId, active, connector, activateBrowserWallet} = useEthers()
  const { readOnlyChainId, readOnlyUrls} = useConfig()
  useEffect(() => {
    const eagerConnect = async () => {
      const connectorId = window.localStorage.getItem(CONNECTOR_LOCAL_STORAGE_KEY) as ConnectorNames
      if (connectorId) {
        const isConnectorBinanceChain = connectorId === ConnectorNames.BSC
        const isBinanceChainDefined = Reflect.has(window, 'BinanceChain')
  
        // Currently BSC extension doesn't always inject in time.
        // We must check to see if it exists, and if not, wait for it before proceeding.
        if (isConnectorBinanceChain && !isBinanceChainDefined) {
          _binanceChainListener().then(() => activateBrowserWallet && activateBrowserWallet(connectorId))
          return
        }

        if (connectorId === ConnectorNames.Injected && connector instanceof InjectedConnector){
          if (await connector.isAuthorized()){
              activateBrowserWallet && activateBrowserWallet(connectorId)
          }
        }else if (!account){
          activateBrowserWallet && activateBrowserWallet(connectorId)
        }
      }
      // const injected = new InjectedConnector({ supportedChainIds: chainIds })
      // if (await injected.isAuthorized()) {
      //   activate(injected)
      // }
    }
    eagerConnect()
  }, [activateBrowserWallet])

  useEffect(() => {
    if (readOnlyChainId && readOnlyUrls) {
      if (!active || (connector instanceof NetworkConnector && connectedChainId !== readOnlyChainId)) {
        activate(new NetworkConnector({ defaultChainId: readOnlyChainId, urls: readOnlyUrls || [] }))
      }
    }
  }, [readOnlyChainId, readOnlyUrls, active, account, connectedChainId, connector])

  return null
}
