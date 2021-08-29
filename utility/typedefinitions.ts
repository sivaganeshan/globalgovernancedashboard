export type globalStatsProp={
    totalProposals: number,
      totalProtocols:number,
      totalUniqueVoters:number,
      totalVotesCast:number
  }

  export type globalStatsResponse={
      data : globalStatsProp
  }

  export type topProtocolsByProposals = {
    thumbUrl : string | undefined,
    name : string,
    totalProposals: number,
    cname:string
}

export type allProtocols = {
    thumbUrl : string | undefined,
    name : string,
    totalProposals: number,
    cname:string,
    totalVotes:number,
    uniqueVoters:number,
    avatar:string,
    tokenSymbol: string,
    tokenNetwork:string,
    contractAddress:string,
    tokenPrice:number,
    tokenCurrency:string
}


export interface Icon {
    adapter: string;
    size: string;
    url: string;
}

export interface MarketPrice {
    currency: string;
    price: number;
}

export interface Token {
    adapter: string;
    symbol: string;
    network: string;
    contractAddress: string;
    marketPrices: MarketPrice[];
}

export interface AllProtocolsResponse {
    cname: string;
    name: string;
    totalProposals: number;
    totalVotes: number;
    uniqueVoters: number;
    icons: Icon[];
    tokens: Token[];
}


