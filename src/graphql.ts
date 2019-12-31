
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
export interface PageInput {
    first?: number;
    after?: string;
    last?: number;
    before?: string;
}

export interface Node {
    id: string;
}

export interface AuthMutation {
    createToken: string;
}

export interface CoinMutation {
    create?: CoinRecord;
}

export interface CoinRecord extends Node {
    id: string;
    name?: string;
    amount?: number;
}

export interface CoinRecordConnection {
    pageInfo: PageInfo;
    edges: CoinRecordEdge[];
}

export interface CoinRecordEdge {
    cursor: string;
    node: CoinRecord;
}

export interface IMutation {
    auth(): AuthMutation | Promise<AuthMutation>;
    coin(): CoinMutation | Promise<CoinMutation>;
    user(): UserMutation | Promise<UserMutation>;
}

export interface PageInfo {
    startCursor?: string;
    endCursor?: string;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}

export interface IQuery {
    viewer(): Viewer | Promise<Viewer>;
}

export interface SubApp extends Node {
    id: string;
    name?: string;
    url?: string;
    icon_name?: string;
}

export interface SubAppConnection {
    pageInfo: PageInfo;
    edges: SubAppEdge[];
}

export interface SubAppEdge {
    cursor: string;
    node: SubApp;
}

export interface User extends Node {
    id: string;
    username?: string;
}

export interface UserMutation {
    create?: User;
}

export interface Viewer {
    username?: string;
    coin?: number;
    coinrecordconnection?: CoinRecordConnection;
    subappconnection?: SubAppConnection;
}
