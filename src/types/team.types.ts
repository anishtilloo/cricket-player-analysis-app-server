import { Query } from 'express-serve-static-core';

import { Send } from "express-serve-static-core";

//  Request Types
interface TeamBodyRequestObject {
    teamName: string;
    ownerName: string; 
    coach: any;
    netWorth: number; 
};

export interface TypedRequestBodyTeam extends Express.Request {
    body: TeamBodyRequestObject;
};

export interface TypedRequestQueryTeam<T extends Query> extends Express.Request {
    quer: T;
};


// Response Types
interface TeamResponseObject {
    success: boolean;
    message: string;
    data: any;
}

export interface TypedResponseTeam extends Express.Response {
    json: Send<TeamResponseObject, this>;
}



export interface TeamResponseGetObject {
    success: boolean
    responseCode: number
    message: string
    data: any
}

export interface TeamResponsePostObject {
    success: boolean
    responseCode: number
    message: string
}