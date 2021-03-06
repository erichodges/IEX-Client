/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me_quoteList {
  __typename: "QuoteList";
  id: string | null;
  name: string | null;
  tickers: (string | null)[] | null;
}

export interface MeQuery_me {
  __typename: "User";
  userName: string | null;
  email: string;
  id: string;
  quoteList: (MeQuery_me_quoteList | null)[] | null;
}

export interface MeQuery {
  me: MeQuery_me | null;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login {
  __typename: "User";
  userName: string | null;
  id: string;
  email: string;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LogoutMutation
// ====================================================

export interface LogoutMutation {
  logout: boolean;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: RegisterMutation
// ====================================================

export interface RegisterMutation {
  register: boolean;
}

export interface RegisterMutationVariables {
  userName?: string | null;
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: addQuoteList
// ====================================================

export interface addQuoteList_addQuoteList {
  __typename: "QuoteList";
  tickers: (string | null)[] | null;
  name: string | null;
  id: string | null;
}

export interface addQuoteList {
  addQuoteList: addQuoteList_addQuoteList;
}

export interface addQuoteListVariables {
  tickers: (string | null)[];
  name: string;
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: updateQuoteList
// ====================================================

export interface updateQuoteList_updateQuoteList {
  __typename: "QuoteList";
  id: string | null;
  name: string | null;
  tickers: (string | null)[] | null;
}

export interface updateQuoteList {
  updateQuoteList: updateQuoteList_updateQuoteList;
}

export interface updateQuoteListVariables {
  id: string;
  name?: string | null;
  tickers: (string | null)[];
}

/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
