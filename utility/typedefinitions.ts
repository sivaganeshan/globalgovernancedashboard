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

export interface StartTime {
    timestamp: number;
}

export interface EndTime {
    timestamp: number;
}

export interface Result {
    total: number;
    choice: number;
}

export interface Proposal {
    refId: string;
    id: string;
    title: string;
    content: string;
    protocol: string;
    adapter: string;
    proposer: string;
    totalVotes: number;
    blockNumber: number;
    externalUrl: string;
    startTime: StartTime;
    endTime: EndTime;
    startTimestamp: number;
    endTimestamp: number;
    currentState: string;
    choices: string[];
    results: Result[];
    events: any[];
}

export interface AllProposals {
    data: Proposal[];
    nextCursor: string;
}

export interface ProposalResponse{
    title : string,
    refid:string,
    proposer:string,
    totalVotes:number,
    externalUrl:string,
    startsAt:string,
    endsAt:string,
    choices : string,
    results:string,
    state:string,
}



