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
  EmailAddress: any
  DateTime: any
  Upload: File
}

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['EmailAddress']
  slug: Scalars['String']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type Album = {
  __typename?: 'Album'
  title: Scalars['String']
  slug: Scalars['String']
  description?: Maybe<Scalars['String']>
  createdBy: Account
  media: Array<Media>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type ChangeNameInput = {
  newName: Scalars['String']
}

export type ChangePasswordInput = {
  currentPassword: Scalars['String']
  newPassword: Scalars['String']
}

export type Cover = {
  __typename?: 'Cover'
  title: Scalars['String']
  slug: Scalars['String']
  creator: Account
  isPrivate: Scalars['Boolean']
  image: Media
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type CoverConnection = {
  __typename?: 'CoverConnection'
  edges: Array<Cover>
  pageInfo: PageInfo
}

export type CreateAlbumInput = {
  title: Scalars['String']
  description?: Maybe<Scalars['String']>
  media?: Maybe<Array<Scalars['String']>>
  files?: Maybe<Array<Scalars['Upload']>>
  sharedWith?: Maybe<Array<Scalars['String']>>
}

export type CreateAlbumResponse = {
  __typename?: 'CreateAlbumResponse'
  errors?: Maybe<Array<FormError>>
  link?: Maybe<Scalars['String']>
}

export type Face = {
  __typename?: 'Face'
  uuid: Scalars['String']
  coordinates: Array<Scalars['Int']>
}

export type FormError = {
  __typename?: 'FormError'
  path: Scalars['String']
  message: Scalars['String']
}

export type Invitation = {
  __typename?: 'Invitation'
  id: Scalars['ID']
  email: Scalars['EmailAddress']
  accepted: Scalars['Boolean']
  createdAt: Scalars['DateTime']
  name?: Maybe<Scalars['String']>
}

export type InviteInput = {
  email: Scalars['EmailAddress']
}

export type Location = {
  __typename?: 'Location'
  type: Scalars['String']
  coordinates: Array<Scalars['Float']>
}

export type LoginInput = {
  email: Scalars['EmailAddress']
  password?: Maybe<Scalars['String']>
}

export type Media = {
  __typename?: 'Media'
  id: Scalars['ID']
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
  publicId: Scalars['String']
  version: Scalars['String']
  signature: Scalars['String']
  width: Scalars['Int']
  height: Scalars['Int']
  format: Scalars['String']
  resourceType: ResourceType
  bytes: Scalars['Int']
  type: Scalars['String']
  etag: Scalars['String']
  placeholder: Scalars['Boolean']
  url: Scalars['String']
  secureUrl: Scalars['String']
  accessMode: Scalars['String']
  originalFilename: Scalars['String']
  isAudio?: Maybe<Scalars['Boolean']>
  frameRate?: Maybe<Scalars['Int']>
  bitRate?: Maybe<Scalars['Int']>
  duration?: Maybe<Scalars['Float']>
  uploadedBy: Account
  faces?: Maybe<Array<Face>>
  loc: Location
  originalCreateDate?: Maybe<OriginalCreateDate>
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword?: Maybe<Array<FormError>>
  changeName?: Maybe<Array<FormError>>
  createAlbum: CreateAlbumResponse
  register?: Maybe<Array<FormError>>
  invite?: Maybe<Array<FormError>>
  login?: Maybe<Array<FormError>>
  logout: Scalars['Boolean']
}

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput
}

export type MutationChangeNameArgs = {
  input: ChangeNameInput
}

export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput
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

export type OriginalCreateDate = {
  __typename?: 'OriginalCreateDate'
  year?: Maybe<Scalars['Int']>
  month?: Maybe<Scalars['Int']>
  day?: Maybe<Scalars['Int']>
  hour?: Maybe<Scalars['Int']>
  minute?: Maybe<Scalars['Int']>
  second?: Maybe<Scalars['Int']>
  millisecond?: Maybe<Scalars['Int']>
  tzoffsetMinutes?: Maybe<Scalars['Int']>
  rawValue?: Maybe<Scalars['String']>
}

export type PageInfo = {
  __typename?: 'PageInfo'
  totalItems: Scalars['Int']
  hasNextPage: Scalars['Boolean']
  endCursor: Scalars['DateTime']
}

export type Query = {
  __typename?: 'Query'
  me: Account
  allAccounts: Array<Account>
  getAlbum?: Maybe<Album>
  myAlbums: CoverConnection
  getInvite?: Maybe<Scalars['EmailAddress']>
  getInvites?: Maybe<Array<Invitation>>
}

export type QueryAllAccountsArgs = {
  withMe?: Maybe<Scalars['Boolean']>
}

export type QueryGetAlbumArgs = {
  slug: Scalars['String']
}

export type QueryMyAlbumsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryGetInviteArgs = {
  id: Scalars['String']
}

export type QueryGetInvitesArgs = {
  from: Scalars['String']
}

export type RegisterInput = {
  email: Scalars['EmailAddress']
  name: Scalars['String']
  password: Scalars['String']
}

export enum ResourceType {
  Image = 'IMAGE',
  Video = 'VIDEO',
}

export type User = {
  __typename?: 'User'
  id: Scalars['ID']
  email: Scalars['EmailAddress']
  name: Scalars['String']
  active: Scalars['Boolean']
}
export type ChangeNameMutationVariables = {
  input: ChangeNameInput
}

export type ChangeNameMutation = { __typename?: 'Mutation' } & {
  changeName: Maybe<
    Array<{ __typename?: 'FormError' } & Pick<FormError, 'path' | 'message'>>
  >
}

export type ChangePasswordMutationVariables = {
  input: ChangePasswordInput
}

export type ChangePasswordMutation = { __typename?: 'Mutation' } & {
  changePassword: Maybe<
    Array<{ __typename?: 'FormError' } & Pick<FormError, 'path' | 'message'>>
  >
}

export type CreateAlbumMutationVariables = {
  input: CreateAlbumInput
}

export type CreateAlbumMutation = { __typename?: 'Mutation' } & {
  createAlbum: { __typename?: 'CreateAlbumResponse' } & Pick<
    CreateAlbumResponse,
    'link'
  > & {
      errors: Maybe<
        Array<
          { __typename?: 'FormError' } & Pick<FormError, 'path' | 'message'>
        >
      >
    }
}

export type GetAccountsQueryVariables = {
  withMe?: Maybe<Scalars['Boolean']>
}

export type GetAccountsQuery = { __typename?: 'Query' } & {
  allAccounts: Array<
    { __typename?: 'Account' } & Pick<Account, 'id' | 'name' | 'email'>
  >
}

export type GetAlbumQueryVariables = {
  slug: Scalars['String']
}

export type GetAlbumQuery = { __typename?: 'Query' } & {
  getAlbum: Maybe<
    { __typename?: 'Album' } & Pick<Album, 'title' | 'slug' | 'description'> & {
        createdBy: { __typename?: 'Account' } & Pick<Account, 'name' | 'slug'>
        media: Array<
          { __typename?: 'Media' } & Pick<
            Media,
            | 'secureUrl'
            | 'width'
            | 'height'
            | 'resourceType'
            | 'format'
            | 'publicId'
          >
        >
      }
  >
}

export type GetInviteQueryVariables = {
  id: Scalars['String']
}

export type GetInviteQuery = { __typename?: 'Query' } & Pick<Query, 'getInvite'>

export type GetInvitesQueryVariables = {
  from: Scalars['String']
}

export type GetInvitesQuery = { __typename?: 'Query' } & {
  getInvites: Maybe<
    Array<
      { __typename?: 'Invitation' } & Pick<
        Invitation,
        'id' | 'email' | 'accepted' | 'createdAt' | 'name'
      >
    >
  >
}

export type GetMeQueryVariables = {}

export type GetMeQuery = { __typename?: 'Query' } & {
  me: { __typename?: 'Account' } & Pick<
    Account,
    'id' | 'name' | 'email' | 'createdAt' | 'updatedAt'
  >
}

export type InviteMutationVariables = {
  input: InviteInput
}

export type InviteMutation = { __typename?: 'Mutation' } & {
  invite: Maybe<
    Array<{ __typename?: 'FormError' } & Pick<FormError, 'message' | 'path'>>
  >
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

export const ChangeNameDocument = gql`
  mutation ChangeName($input: ChangeNameInput!) {
    changeName(input: $input) {
      path
      message
    }
  }
`
export type ChangeNameMutationFn = ApolloReactCommon.MutationFunction<
  ChangeNameMutation,
  ChangeNameMutationVariables
>
export type ChangeNameComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >,
  'mutation'
>

export const ChangeNameComponent = (props: ChangeNameComponentProps) => (
  <ApolloReactComponents.Mutation<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >
    mutation={ChangeNameDocument}
    {...props}
  />
)

export function useChangeNameMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangeNameMutation,
    ChangeNameMutationVariables
  >(ChangeNameDocument, baseOptions)
}
export type ChangeNameMutationHookResult = ReturnType<
  typeof useChangeNameMutation
>
export type ChangeNameMutationResult = ApolloReactCommon.MutationResult<
  ChangeNameMutation
>
export type ChangeNameMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangeNameMutation,
  ChangeNameMutationVariables
>
export const ChangePasswordDocument = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      path
      message
    }
  }
`
export type ChangePasswordMutationFn = ApolloReactCommon.MutationFunction<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export type ChangePasswordComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >,
  'mutation'
>

export const ChangePasswordComponent = (
  props: ChangePasswordComponentProps
) => (
  <ApolloReactComponents.Mutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
    mutation={ChangePasswordDocument}
    {...props}
  />
)

export function useChangePasswordMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
  >(ChangePasswordDocument, baseOptions)
}
export type ChangePasswordMutationHookResult = ReturnType<
  typeof useChangePasswordMutation
>
export type ChangePasswordMutationResult = ApolloReactCommon.MutationResult<
  ChangePasswordMutation
>
export type ChangePasswordMutationOptions = ApolloReactCommon.BaseMutationOptions<
  ChangePasswordMutation,
  ChangePasswordMutationVariables
>
export const CreateAlbumDocument = gql`
  mutation CreateAlbum($input: CreateAlbumInput!) {
    createAlbum(input: $input) {
      errors {
        path
        message
      }
      link
    }
  }
`
export type CreateAlbumMutationFn = ApolloReactCommon.MutationFunction<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>
export type CreateAlbumComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >,
  'mutation'
>

export const CreateAlbumComponent = (props: CreateAlbumComponentProps) => (
  <ApolloReactComponents.Mutation<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >
    mutation={CreateAlbumDocument}
    {...props}
  />
)

export function useCreateAlbumMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<
    CreateAlbumMutation,
    CreateAlbumMutationVariables
  >(CreateAlbumDocument, baseOptions)
}
export type CreateAlbumMutationHookResult = ReturnType<
  typeof useCreateAlbumMutation
>
export type CreateAlbumMutationResult = ApolloReactCommon.MutationResult<
  CreateAlbumMutation
>
export type CreateAlbumMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateAlbumMutation,
  CreateAlbumMutationVariables
>
export const GetAccountsDocument = gql`
  query GetAccounts($withMe: Boolean) {
    allAccounts(withMe: $withMe) {
      id
      name
      email
    }
  }
`
export type GetAccountsComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAccountsQuery,
    GetAccountsQueryVariables
  >,
  'query'
>

export const GetAccountsComponent = (props: GetAccountsComponentProps) => (
  <ApolloReactComponents.Query<GetAccountsQuery, GetAccountsQueryVariables>
    query={GetAccountsDocument}
    {...props}
  />
)

export function useGetAccountsQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAccountsQuery,
    GetAccountsQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetAccountsQuery, GetAccountsQueryVariables>(
    GetAccountsDocument,
    baseOptions
  )
}
export type GetAccountsQueryHookResult = ReturnType<typeof useGetAccountsQuery>
export type GetAccountsQueryResult = ApolloReactCommon.QueryResult<
  GetAccountsQuery,
  GetAccountsQueryVariables
>
export const GetAlbumDocument = gql`
  query GetAlbum($slug: String!) {
    getAlbum(slug: $slug) {
      title
      slug
      description
      createdBy {
        name
        slug
      }
      media {
        secureUrl
        width
        height
        resourceType
        format
        publicId
      }
    }
  }
`
export type GetAlbumComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetAlbumQuery,
    GetAlbumQueryVariables
  >,
  'query'
> &
  ({ variables: GetAlbumQueryVariables; skip?: boolean } | { skip: boolean })

export const GetAlbumComponent = (props: GetAlbumComponentProps) => (
  <ApolloReactComponents.Query<GetAlbumQuery, GetAlbumQueryVariables>
    query={GetAlbumDocument}
    {...props}
  />
)

export function useGetAlbumQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetAlbumQuery,
    GetAlbumQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetAlbumQuery, GetAlbumQueryVariables>(
    GetAlbumDocument,
    baseOptions
  )
}
export type GetAlbumQueryHookResult = ReturnType<typeof useGetAlbumQuery>
export type GetAlbumQueryResult = ApolloReactCommon.QueryResult<
  GetAlbumQuery,
  GetAlbumQueryVariables
>
export const GetInviteDocument = gql`
  query GetInvite($id: String!) {
    getInvite(id: $id)
  }
`
export type GetInviteComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetInviteQuery,
    GetInviteQueryVariables
  >,
  'query'
> &
  ({ variables: GetInviteQueryVariables; skip?: boolean } | { skip: boolean })

export const GetInviteComponent = (props: GetInviteComponentProps) => (
  <ApolloReactComponents.Query<GetInviteQuery, GetInviteQueryVariables>
    query={GetInviteDocument}
    {...props}
  />
)

export function useGetInviteQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetInviteQuery,
    GetInviteQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetInviteQuery, GetInviteQueryVariables>(
    GetInviteDocument,
    baseOptions
  )
}
export type GetInviteQueryHookResult = ReturnType<typeof useGetInviteQuery>
export type GetInviteQueryResult = ApolloReactCommon.QueryResult<
  GetInviteQuery,
  GetInviteQueryVariables
>
export const GetInvitesDocument = gql`
  query GetInvites($from: String!) {
    getInvites(from: $from) {
      id
      email
      accepted
      createdAt
      name
    }
  }
`
export type GetInvitesComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<
    GetInvitesQuery,
    GetInvitesQueryVariables
  >,
  'query'
> &
  ({ variables: GetInvitesQueryVariables; skip?: boolean } | { skip: boolean })

export const GetInvitesComponent = (props: GetInvitesComponentProps) => (
  <ApolloReactComponents.Query<GetInvitesQuery, GetInvitesQueryVariables>
    query={GetInvitesDocument}
    {...props}
  />
)

export function useGetInvitesQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetInvitesQuery,
    GetInvitesQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetInvitesQuery, GetInvitesQueryVariables>(
    GetInvitesDocument,
    baseOptions
  )
}
export type GetInvitesQueryHookResult = ReturnType<typeof useGetInvitesQuery>
export type GetInvitesQueryResult = ApolloReactCommon.QueryResult<
  GetInvitesQuery,
  GetInvitesQueryVariables
>
export const GetMeDocument = gql`
  query GetMe {
    me {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`
export type GetMeComponentProps = Omit<
  ApolloReactComponents.QueryComponentOptions<GetMeQuery, GetMeQueryVariables>,
  'query'
>

export const GetMeComponent = (props: GetMeComponentProps) => (
  <ApolloReactComponents.Query<GetMeQuery, GetMeQueryVariables>
    query={GetMeDocument}
    {...props}
  />
)

export function useGetMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    GetMeQuery,
    GetMeQueryVariables
  >
) {
  return ApolloReactHooks.useQuery<GetMeQuery, GetMeQueryVariables>(
    GetMeDocument,
    baseOptions
  )
}
export type GetMeQueryHookResult = ReturnType<typeof useGetMeQuery>
export type GetMeQueryResult = ApolloReactCommon.QueryResult<
  GetMeQuery,
  GetMeQueryVariables
>
export const InviteDocument = gql`
  mutation Invite($input: InviteInput!) {
    invite(input: $input) {
      message
      path
    }
  }
`
export type InviteMutationFn = ApolloReactCommon.MutationFunction<
  InviteMutation,
  InviteMutationVariables
>
export type InviteComponentProps = Omit<
  ApolloReactComponents.MutationComponentOptions<
    InviteMutation,
    InviteMutationVariables
  >,
  'mutation'
>

export const InviteComponent = (props: InviteComponentProps) => (
  <ApolloReactComponents.Mutation<InviteMutation, InviteMutationVariables>
    mutation={InviteDocument}
    {...props}
  />
)

export function useInviteMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    InviteMutation,
    InviteMutationVariables
  >
) {
  return ApolloReactHooks.useMutation<InviteMutation, InviteMutationVariables>(
    InviteDocument,
    baseOptions
  )
}
export type InviteMutationHookResult = ReturnType<typeof useInviteMutation>
export type InviteMutationResult = ApolloReactCommon.MutationResult<
  InviteMutation
>
export type InviteMutationOptions = ApolloReactCommon.BaseMutationOptions<
  InviteMutation,
  InviteMutationVariables
>
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
