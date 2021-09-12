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
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/address/${address}/transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/address/${address}/transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/address/${address}/transactions`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/address/${address}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/address/${address}/transactions`
    case ChainId.BSCTest:
      return `https://testnet.bscscan.com/address/${address}`
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
    case ChainId.xDai:
      return `https://blockscout.com/poa/xdai/tx/${transactionHash}/internal-transactions`
    case ChainId.Polygon:
      return `https://explorer-mainnet.maticvigil.com/tx/${transactionHash}/internal-transactions`
    case ChainId.Mumbai:
      return `https://explorer-mumbai.maticvigil.com/tx/${transactionHash}/internal-transactions`
    case ChainId.Harmony:
      return `https://explorer.harmony.one/tx/${transactionHash}`
    case ChainId.Moonriver:
      return `https://blockscout.moonriver.moonbeam.network/tx/${transactionHash}/internal-transactions`
    case ChainId.BSCTest:
      return `https://testnet.bscscan.com/tx/${transactionHash}`
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
      return ["https://bsc-dataseed1.ninicoin.io","https://bsc-dataseed1.defibit.io","https://bsc-dataseed.binance.org"]
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
    case ChainId.BSCTest:
      return ["https://data-seed-prebsc-1-s1.binance.org:8545"]
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

export function rpcURLs(supportedChainIds?:number[]){
  var objs:{[k:number]:string} = {}
  supportedChainIds?.map(c => objs[c] = sample(getRpcURL(c)) ?? '')
  return objs
}