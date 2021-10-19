import sample from 'lodash/sample'
import { ChainId, CHAIN_NAMES, LOCAL_CHAINS, TEST_CHAINS } from '../constants'

function etherscanNetworkPrefix(chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
      return ``
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return getChainName(chainId).toLocaleLowerCase() + '.'
  }
}

export function getExplorerAddressLink(address: string, chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return `https://${etherscanNetworkPrefix(chainId)}etherscan.io/address/${address}`
    case ChainId.BSC:
      return `https://bscscan.com/address/${address}`
    case ChainId.BSCTestnet:
      return `https://testnet.bscscan.com/address/${address}`
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/address/${address}/transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/address/${address}/transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/address/${address}/transactions`
    case ChainId.Theta:
      return `https://explorer.thetatoken.org/address/${address}`
    case ChainId.ThetaTestnet:
      return `https://testnet-explorer.thetatoken.org/address/${address}`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/address/${address}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`
    case ChainId.Palm:
      return `https://explorer.palm.io/address/${address}`
    case ChainId.Fantom:
      return `https://ftmscan.com/address/${address}`
  }
}

export function getExplorerTransactionLink(transactionHash: string, chainId: ChainId) {
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return `https://${etherscanNetworkPrefix(chainId)}etherscan.io/tx/${transactionHash}`
    case ChainId.BSC:
      return `https://bscscan.com/tx/${transactionHash}`
    case ChainId.BSCTestnet:
      return `https://testnet.bscscan.com/tx/${transactionHash}`
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/tx/${transactionHash}/internal-transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/tx/${transactionHash}/internal-transactions`
    case ChainId.Theta:
      return `https://explorer.thetatoken.org/tx/${transactionHash}`
    case ChainId.ThetaTestnet:
      return `https://testnet-explorer.thetatoken.org/tx/${transactionHash}`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/tx/${transactionHash}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`
    case ChainId.Palm:
      return `https://explorer.palm.io/tx/${transactionHash}`
    case ChainId.Fantom:
      return `https://ftmscan.com/tx/${transactionHash}`
  }
}

export function getRpcURL(chainId: ChainId){
  switch (chainId) {
    case ChainId.Mainnet:
      return ["https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    case ChainId.Ropsten:
      return ["https://ropsten.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    case ChainId.Kovan:
      return ["https://kovan.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    case ChainId.Rinkeby:
      return ["https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    case ChainId.Goerli:
      return ["https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"]
    case ChainId.BSC:
      return [
        "https://bsc-dataseed1.ninicoin.io",
        "https://bsc-dataseed1.defibit.io",
        "https://bsc-dataseed.binance.org"
      ]
    case ChainId.xDai:
      return ["https://dai.poa.network"]
    case ChainId.Polygon:
      return ["https://polygon-rpc.com"]
    case ChainId.Mumbai:
      return ["https://rpc-mumbai.maticvigil.com"]
    case ChainId.Harmony:
      return ["https://api.harmony.one"]
    case ChainId.Moonriver:
      return ["https://rpc.moonriver.moonbeam.network"]
    case ChainId.BSCTestnet:
      return [
        "https://data-seed-prebsc-1-s1.binance.org:8545",
        "https://data-seed-prebsc-2-s1.binance.org:8545",
        "https://data-seed-prebsc-1-s2.binance.org:8545",
        "https://data-seed-prebsc-2-s2.binance.org:8545",
        "https://data-seed-prebsc-1-s3.binance.org:8545",
        "https://data-seed-prebsc-2-s3.binance.org:8545"
      ]
    default:
      return []
  }
}

export function getChainName(chainId: ChainId) {
  return CHAIN_NAMES[chainId]
}

export function isTestChain(chainId: ChainId) {
  return TEST_CHAINS.includes(chainId)
}

export function isLocalChain(chainId: ChainId) {
  return LOCAL_CHAINS.includes(chainId)
}

export function getExplorerLink(chainId: ChainId) : string{
  switch (chainId) {
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Kovan:
    case ChainId.Rinkeby:
    case ChainId.Goerli:
      return `https://${etherscanNetworkPrefix(chainId)}etherscan.io/`
    case ChainId.BSC:
      return `https://bscscan.com/`
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/`
    case ChainId.BSCTestnet:
      return `https://testnet.bscscan.com/`
    default:
      return ''
  }
}

export function getRpcUrls(supportedChainIds?:number[]){
  var objs:{[k:number]:string} = {}
  supportedChainIds?.map(c => objs[c] = sample(getRpcURL(c)) ?? '')
  return objs
}

export function getChainNativeCurrency(chainId: ChainId):{name:string,symbol:string,decimals:number}{
  switch (chainId){
    case ChainId.Mainnet:
    case ChainId.Ropsten:
    case ChainId.Rinkeby:
    case ChainId.Kovan:
    case ChainId.Goerli:
    case ChainId.xDai:
    case ChainId.Polygon:
    case ChainId.Mumbai:
    case ChainId.Harmony:
    case ChainId.Moonriver:
      return {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      }
    case ChainId.BSC:
    case ChainId.BSCTestnet:
      return {
        name: 'BNB',
        symbol: 'bnb',
        decimals: 18,
      }
    default:
      return {
        name: '',
        symbol: '',
        decimals: 0,
      }
  }
}

export const setupNetwork = async (chainId: ChainId): Promise<boolean> =>  {
  const provider = window.ethereum
  if (provider && provider.request) {

    try {
      await provider?.request({
        method: 'wallet_addEthereumChain',
        params: [
          {
            chainId: `0x${chainId.toString(16)}`,
            chainName: getChainName(chainId),
            nativeCurrency: getChainNativeCurrency(chainId),
            rpcUrls: getRpcURL(chainId),
            blockExplorerUrls: [getExplorerLink(chainId)],
          },
        ],
      })
      return true
    } catch (error) {
      console.error('Failed to setup the network in Metamask:', error,chainId,getRpcURL(chainId))
      return false
    }
  } else {
    console.error("Can't setup the BSC network on metamask because window.ethereum is undefined")
    return false
  }
}