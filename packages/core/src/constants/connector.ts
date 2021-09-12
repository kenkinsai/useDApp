export enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    BSC = "bsc",
}

export enum ConnectorTitle {
    Metamask = "Metamask",
    TrustWallet = "TrustWallet",
    MathWallet = "MathWallet",
    TokenPocket = "TokenPocket",
    WalletConnect =  "WalletConnect",
    BinanceChainWallet = "Binance Chain Wallet",
    SafePalWallet = "SafePal Wallet",
}

export const CONNECTORS = {
    [ConnectorTitle.Metamask]: ConnectorNames.Injected,
    [ConnectorTitle.TrustWallet]: ConnectorNames.Injected,
    [ConnectorTitle.MathWallet]: ConnectorNames.Injected,
    [ConnectorTitle.TokenPocket] :ConnectorNames.Injected,
    [ConnectorTitle.WalletConnect]:ConnectorNames.WalletConnect,
    [ConnectorTitle.BinanceChainWallet]:ConnectorNames.BSC,
    [ConnectorTitle.SafePalWallet] :ConnectorNames.Injected
}

export const CONNECTOR_LOCAL_STORAGE_KEY = "connectorId";