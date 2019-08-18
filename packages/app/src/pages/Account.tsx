import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { ChangeName } from '../components/ChangeName'
import { useGetMeQuery } from '../generated/graphql'

export const Account: React.FunctionComponent<
  RouteComponentProps
> = (): JSX.Element => {
  const { data, loading, error } = useGetMeQuery()
  if (loading) return <p>Loading ...</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  return (
    <>
      <section className="hero">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">{data.me.name}</h1>
            <h2 className="subtitle">{data.me.email}</h2>
          </div>
        </div>
      </section>
      <ChangeName name={data.me.name} />
    </>
  )
}
