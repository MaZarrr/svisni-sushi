/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum UserRole {
  Client = "Client",
  Delivery = "Delivery",
  Owner = "Owner",
}

export interface CreateAccountInput {
  phone: string;
  role: UserRole;
}

export interface LoginInput {
  phone: string;
  code?: string | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
