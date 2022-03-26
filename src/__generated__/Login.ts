/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LoginInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: Login
// ====================================================

export interface Login_login {
  __typename: "LoginOutput";
  ok: boolean;
  token: string | null;
  error: string | null;
}

export interface Login {
  login: Login_login;
}

export interface LoginVariables {
  loginInput: LoginInput;
}
