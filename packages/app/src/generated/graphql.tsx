/* eslint-disable */
/* This is an automatically generated file. Do not edit directly. */
import gql from 'graphql-tag'
import * as ApolloReactCommon from '@apollo/react-common'
import * as React from 'react'
import * as ApolloReactComponents from '@apollo/react-components'
import * as ApolloReactHooks from '@apollo/react-hooks'
export type Maybe<T> = T | null
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  EmailAddress: string
  DateTime: Date
}

export type FormError = {
  __typename?: 'FormError'
  path: Scalars['String']
  message: Scalars['String']
}

export type InviteInput = {
  email: Scalars['EmailAddress']
}

export type LoginInput = {
  email: Scalars['EmailAddress']
  password?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  register?: Maybe<Array<FormError>>
  invite?: Maybe<Array<FormError>>
  login?: Maybe<Array<FormError>>
}

export type MutationRegisterArgs = {
  input: RegisterInput
}

export type MutationInviteArgs = {
  input: InviteInput
}

export type MutationLoginArgs = {
  input: LoginInput
}

export type Query = {
  __typename?: 'Query'
  getInvite: Scalars['EmailAddress']
}

export type QueryGetInviteArgs = {
  id: Scalars['String']
}

export type RegisterInput = {
  email: Scalars['EmailAddress']
  name: Scalars['String']
  password: Scalars['String']
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['EmailAddress']
  name: Scalars['String']
  active: Scalars['Boolean']
}
export type LoginMutationVariables = {
  input: LoginInput
}

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: Maybe<
    Array<{ __typename?: 'FormError' } & Pick<FormError, 'path' | 'message'>>
  >
}

export type RegisterMutationVariables = {
  input: RegisterInput
}

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: Maybe<
    Array<{ __typename?: 'FormError' } & Pick<FormError, 'path' | 'message'>>
  >
}

export const LoginDocument = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      path
      message
    }
  }
`
export type LoginMutationFn = ApolloReactCommon.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>
export type LoginComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    LoginMutation,
    LoginMutationVariables
  >,
  'mutation'
>

export const LoginComponent = (props: LoginComponentProps) => (
  <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables>
    mutation={LoginDocument}
    {...props}
  />
)

export function useLoginMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    baseOptions
  )
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>
export type LoginMutationResult = ApolloReactCommon.MutationResult<
  LoginMutation
>
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>
export const RegisterDocument = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      path
      message
    }
  }
`
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>
export type RegisterComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
  'mutation'
>

export const RegisterComponent = (props: RegisterComponentProps) => (
  <ApolloReactComponents.Mutation<RegisterMutation, RegisterMutationVariables>
    mutation={RegisterDocument}
    {...props}
  />
)

export function useRegisterMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    RegisterMutation,
    RegisterMutationVariables
  >(RegisterDocument, baseOptions)
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>
export type RegisterMutationResult = ApolloReactCommon.MutationResult<
  RegisterMutation
>
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>
