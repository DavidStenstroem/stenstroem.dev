/* eslint-disable */
/* This is an automatically generated file. Do not edit directly. */
import { FileUpload } from 'graphql-upload'
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { Context } from './Context'
export type Maybe<T> = T | null
export type RequireFields<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} &
  { [P in K]-?: NonNullable<T[P]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  EmailAddress: string
  DateTime: Date
  Upload: FileUpload
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
  mediaFeed?: Maybe<MediaConnection>
  createdAt: Scalars['DateTime']
  updatedAt: Scalars['DateTime']
}

export type AlbumMediaFeedArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
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

export type MediaConnection = {
  __typename?: 'MediaConnection'
  edges: Array<Media>
  pageInfo: PageInfo
}

export type Mutation = {
  __typename?: 'Mutation'
  createAlbum: CreateAlbumResponse
  changePassword?: Maybe<Array<FormError>>
  changeName?: Maybe<Array<FormError>>
  register?: Maybe<Array<FormError>>
  invite?: Maybe<Array<FormError>>
  login?: Maybe<Array<FormError>>
  logout: Scalars['Boolean']
}

export type MutationCreateAlbumArgs = {
  input: CreateAlbumInput
}

export type MutationChangePasswordArgs = {
  input: ChangePasswordInput
}

export type MutationChangeNameArgs = {
  input: ChangeNameInput
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
  endCursor: Scalars['String']
}

export type Query = {
  __typename?: 'Query'
  getAlbum?: Maybe<Album>
  myAlbums: CoverConnection
  getStreamCover?: Maybe<Media>
  getStream: MediaConnection
  me: Account
  allAccounts: Array<Account>
  getInvite?: Maybe<Scalars['EmailAddress']>
  getInvites?: Maybe<Array<Invitation>>
}

export type QueryGetAlbumArgs = {
  slug: Scalars['String']
}

export type QueryMyAlbumsArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryGetStreamArgs = {
  cursor?: Maybe<Scalars['String']>
  limit?: Maybe<Scalars['Int']>
}

export type QueryAllAccountsArgs = {
  withMe?: Maybe<Scalars['Boolean']>
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

export type ResolverTypeWrapper<T> = Promise<T> | T

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>
}

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>

export type NextResolverFn<T> = () => Promise<T>

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>
  String: ResolverTypeWrapper<Scalars['String']>
  Album: ResolverTypeWrapper<Album>
  Account: ResolverTypeWrapper<Account>
  ID: ResolverTypeWrapper<Scalars['ID']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Media: ResolverTypeWrapper<Media>
  Int: ResolverTypeWrapper<Scalars['Int']>
  ResourceType: ResourceType
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Float: ResolverTypeWrapper<Scalars['Float']>
  Face: ResolverTypeWrapper<Face>
  Location: ResolverTypeWrapper<Location>
  OriginalCreateDate: ResolverTypeWrapper<OriginalCreateDate>
  MediaConnection: ResolverTypeWrapper<MediaConnection>
  PageInfo: ResolverTypeWrapper<PageInfo>
  CoverConnection: ResolverTypeWrapper<CoverConnection>
  Cover: ResolverTypeWrapper<Cover>
  Invitation: ResolverTypeWrapper<Invitation>
  Mutation: ResolverTypeWrapper<{}>
  CreateAlbumInput: CreateAlbumInput
  Upload: ResolverTypeWrapper<Scalars['Upload']>
  CreateAlbumResponse: ResolverTypeWrapper<CreateAlbumResponse>
  FormError: ResolverTypeWrapper<FormError>
  ChangePasswordInput: ChangePasswordInput
  ChangeNameInput: ChangeNameInput
  RegisterInput: RegisterInput
  InviteInput: InviteInput
  LoginInput: LoginInput
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  String: Scalars['String']
  Album: Album
  Account: Account
  ID: Scalars['ID']
  EmailAddress: Scalars['EmailAddress']
  DateTime: Scalars['DateTime']
  Media: Media
  Int: Scalars['Int']
  ResourceType: ResourceType
  Boolean: Scalars['Boolean']
  Float: Scalars['Float']
  Face: Face
  Location: Location
  OriginalCreateDate: OriginalCreateDate
  MediaConnection: MediaConnection
  PageInfo: PageInfo
  CoverConnection: CoverConnection
  Cover: Cover
  Invitation: Invitation
  Mutation: {}
  CreateAlbumInput: CreateAlbumInput
  Upload: Scalars['Upload']
  CreateAlbumResponse: CreateAlbumResponse
  FormError: FormError
  ChangePasswordInput: ChangePasswordInput
  ChangeNameInput: ChangeNameInput
  RegisterInput: RegisterInput
  InviteInput: InviteInput
  LoginInput: LoginInput
  User: User
}

export type AccountResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Account'] = ResolversParentTypes['Account']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export type AlbumResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Album'] = ResolversParentTypes['Album']
> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >
  createdBy?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
  media?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>
  mediaFeed?: Resolver<
    Maybe<ResolversTypes['MediaConnection']>,
    ParentType,
    ContextType,
    AlbumMediaFeedArgs
  >
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export type CoverResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Cover'] = ResolversParentTypes['Cover']
> = {
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  slug?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  creator?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
  isPrivate?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  image?: Resolver<ResolversTypes['Media'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export type CoverConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CoverConnection'] = ResolversParentTypes['CoverConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['Cover']>, ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
}

export type CreateAlbumResponseResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['CreateAlbumResponse'] = ResolversParentTypes['CreateAlbumResponse']
> = {
  errors?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType
  >
  link?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
}

export type FaceResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Face'] = ResolversParentTypes['Face']
> = {
  uuid?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  coordinates?: Resolver<Array<ResolversTypes['Int']>, ParentType, ContextType>
}

export type FormErrorResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['FormError'] = ResolversParentTypes['FormError']
> = {
  path?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  message?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type InvitationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Invitation'] = ResolversParentTypes['Invitation']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  accepted?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type LocationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Location'] = ResolversParentTypes['Location']
> = {
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  coordinates?: Resolver<
    Array<ResolversTypes['Float']>,
    ParentType,
    ContextType
  >
}

export type MediaResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Media'] = ResolversParentTypes['Media']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  publicId?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  version?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  signature?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  width?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  height?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  format?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  resourceType?: Resolver<
    ResolversTypes['ResourceType'],
    ParentType,
    ContextType
  >
  bytes?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  type?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  etag?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  placeholder?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  secureUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  accessMode?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  originalFilename?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  isAudio?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>
  frameRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  bitRate?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  duration?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>
  uploadedBy?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
  faces?: Resolver<
    Maybe<Array<ResolversTypes['Face']>>,
    ParentType,
    ContextType
  >
  loc?: Resolver<ResolversTypes['Location'], ParentType, ContextType>
  originalCreateDate?: Resolver<
    Maybe<ResolversTypes['OriginalCreateDate']>,
    ParentType,
    ContextType
  >
}

export type MediaConnectionResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['MediaConnection'] = ResolversParentTypes['MediaConnection']
> = {
  edges?: Resolver<Array<ResolversTypes['Media']>, ParentType, ContextType>
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>
}

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
  createAlbum?: Resolver<
    ResolversTypes['CreateAlbumResponse'],
    ParentType,
    ContextType,
    MutationCreateAlbumArgs
  >
  changePassword?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType,
    MutationChangePasswordArgs
  >
  changeName?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType,
    MutationChangeNameArgs
  >
  register?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType,
    MutationRegisterArgs
  >
  invite?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType,
    MutationInviteArgs
  >
  login?: Resolver<
    Maybe<Array<ResolversTypes['FormError']>>,
    ParentType,
    ContextType,
    MutationLoginArgs
  >
  logout?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type OriginalCreateDateResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['OriginalCreateDate'] = ResolversParentTypes['OriginalCreateDate']
> = {
  year?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  month?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  day?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  hour?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  minute?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  second?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  millisecond?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>
  tzoffsetMinutes?: Resolver<
    Maybe<ResolversTypes['Int']>,
    ParentType,
    ContextType
  >
  rawValue?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>
}

export type PageInfoResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']
> = {
  totalItems?: Resolver<ResolversTypes['Int'], ParentType, ContextType>
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
  endCursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>
}

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  getAlbum?: Resolver<
    Maybe<ResolversTypes['Album']>,
    ParentType,
    ContextType,
    QueryGetAlbumArgs
  >
  myAlbums?: Resolver<
    ResolversTypes['CoverConnection'],
    ParentType,
    ContextType,
    QueryMyAlbumsArgs
  >
  getStreamCover?: Resolver<
    Maybe<ResolversTypes['Media']>,
    ParentType,
    ContextType
  >
  getStream?: Resolver<
    ResolversTypes['MediaConnection'],
    ParentType,
    ContextType,
    QueryGetStreamArgs
  >
  me?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
  allAccounts?: Resolver<
    Array<ResolversTypes['Account']>,
    ParentType,
    ContextType,
    RequireFields<QueryAllAccountsArgs, 'withMe'>
  >
  getInvite?: Resolver<
    Maybe<ResolversTypes['EmailAddress']>,
    ParentType,
    ContextType,
    QueryGetInviteArgs
  >
  getInvites?: Resolver<
    Maybe<Array<ResolversTypes['Invitation']>>,
    ParentType,
    ContextType,
    QueryGetInvitesArgs
  >
}

export interface UploadScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']
> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>
  email?: Resolver<ResolversTypes['EmailAddress'], ParentType, ContextType>
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>
  active?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>
}

export type Resolvers<ContextType = Context> = {
  Account?: AccountResolvers<ContextType>
  Album?: AlbumResolvers<ContextType>
  Cover?: CoverResolvers<ContextType>
  CoverConnection?: CoverConnectionResolvers<ContextType>
  CreateAlbumResponse?: CreateAlbumResponseResolvers<ContextType>
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  Face?: FaceResolvers<ContextType>
  FormError?: FormErrorResolvers<ContextType>
  Invitation?: InvitationResolvers<ContextType>
  Location?: LocationResolvers<ContextType>
  Media?: MediaResolvers<ContextType>
  MediaConnection?: MediaConnectionResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  OriginalCreateDate?: OriginalCreateDateResolvers<ContextType>
  PageInfo?: PageInfoResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  Upload?: GraphQLScalarType
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
