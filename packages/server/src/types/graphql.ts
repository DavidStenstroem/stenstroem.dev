/* eslint-disable */
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

export type FormError = {
  __typename?: 'FormError'
  path: Scalars['String']
  message: Scalars['String']
}

export type InviteInput = {
  email?: Maybe<Scalars['EmailAddress']>
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

export type RegisterInput = {
  email: Scalars['EmailAddress']
  name: Scalars['String']
  password: Scalars['String']
  inviteId: Scalars['String']
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
  Mutation: ResolverTypeWrapper<{}>
  RegisterInput: RegisterInput
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']>
  String: ResolverTypeWrapper<Scalars['String']>
  FormError: ResolverTypeWrapper<FormError>
  InviteInput: InviteInput
  LoginInput: LoginInput
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>
  User: ResolverTypeWrapper<User>
  ID: ResolverTypeWrapper<Scalars['ID']>
}

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Mutation: {}
  RegisterInput: RegisterInput
  EmailAddress: Scalars['EmailAddress']
  String: Scalars['String']
  FormError: FormError
  InviteInput: InviteInput
  LoginInput: LoginInput
  Boolean: Scalars['Boolean']
  DateTime: Scalars['DateTime']
  User: User
  ID: Scalars['ID']
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

export type MutationResolvers<
  ContextType = Context,
  ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']
> = {
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
  DateTime?: GraphQLScalarType
  EmailAddress?: GraphQLScalarType
  FormError?: FormErrorResolvers<ContextType>
  Mutation?: MutationResolvers<ContextType>
  User?: UserResolvers<ContextType>
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = Context> = Resolvers<ContextType>
