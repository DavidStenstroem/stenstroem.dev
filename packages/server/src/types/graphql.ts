/* eslint-disable */
/* This is an automatically generated file. Do not edit directly. */
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql'
import { Context } from './Context'
export type Maybe<T> = T | null
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

export type Account = {
  __typename?: 'Account'
  id: Scalars['ID']
  name: Scalars['String']
  email: Scalars['EmailAddress']
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

export type LoginInput = {
  email: Scalars['EmailAddress']
  password?: Maybe<Scalars['String']>
}

export type Mutation = {
  __typename?: 'Mutation'
  changePassword?: Maybe<Array<FormError>>
  changeName?: Maybe<Array<FormError>>
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
  me: Account
  getInvite?: Maybe<Scalars['EmailAddress']>
  getInvites?: Maybe<Array<Invitation>>
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
  Account: ResolverTypeWrapper<Account>
  ID: ResolverTypeWrapper<Scalars['ID']>
  String: ResolverTypeWrapper<Scalars['String']>
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  Invitation: ResolverTypeWrapper<Invitation>
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  Mutation: ResolverTypeWrapper<{}>
  ChangePasswordInput: ChangePasswordInput
  FormError: ResolverTypeWrapper<FormError>
  ChangeNameInput: ChangeNameInput
  RegisterInput: RegisterInput
  InviteInput: InviteInput
  LoginInput: LoginInput
  User: ResolverTypeWrapper<User>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {}
  Account: Account
  ID: Scalars['ID']
  String: Scalars['String']
  EmailAddress: Scalars['EmailAddress']
  DateTime: Scalars['DateTime']
  Invitation: Invitation
  Boolean: Scalars['Boolean']
  Mutation: {}
  ChangePasswordInput: ChangePasswordInput
  FormError: FormError
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
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>
}

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime'
}

export interface EmailAddressScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress'
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

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
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

export type QueryResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']
> = {
  me?: Resolver<ResolversTypes['Account'], ParentType, ContextType>
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
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  FormError?: FormErrorResolvers<ContextType>
  Invitation?: InvitationResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  Query?: QueryResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
