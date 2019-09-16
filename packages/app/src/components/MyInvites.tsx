import * as React from 'react'
import { MainContextState, MainContext } from '../context/MainContext'
import { useGetInvitesQuery } from '../generated/graphql'
import { Section } from './Section'
import { Columns } from './Columns'
import { Column } from './Column'
import { Link } from '@reach/router'
import slugify from 'slugify'

export const MyInvites: React.FunctionComponent = (): JSX.Element => {
  const { account } = React.useContext<MainContextState>(MainContext)
  const { data, error, loading } = useGetInvitesQuery({
    variables: { from: account.id },
  })
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  if (loading) return <p>Loading...</p>
  return (
    <Section>
      <Columns isMobile isCentered>
        <Column mobileWidth={11} tabletWidth={8} desktopWidth={6}>
          {data.getInvites.map(
            ({ name, id, email, createdAt, accepted }): JSX.Element => (
              <div className="box" key={id}>
                <div className="content">
                  {accepted ? (
                    <>
                      <Link to={`/users/${slugify(name)}-${id}`}>
                        <p>{name}</p>
                      </Link>
                      <p>email: {email}</p>
                    </>
                  ) : (
                    <>
                      <p>email: {email}</p>
                      <p>Afventer accept</p>
                    </>
                  )}
                  <p>
                    Invitation sendt den{' '}
                    {new Date(createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )
          )}
        </Column>
      </Columns>
    </Section>
  )
}
