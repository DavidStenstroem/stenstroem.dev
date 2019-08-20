import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { ChangeName } from '../components/ChangeName'
import { useGetMeQuery } from '../generated/graphql'
import { ChangePassword } from '../components/ChangePassword'
import { Section } from '../components/Section'
import Avatar from 'react-avatar'
import { Columns } from '../components/Columns'
import { Column } from '../components/Column'

export const Account: React.FunctionComponent<
  RouteComponentProps
> = (): JSX.Element => {
  const [editing, setEditing] = React.useState<boolean>(false)
  const { data, loading, error } = useGetMeQuery()
  if (loading) return <p>Loading ...</p>
  if (error) return <pre>{JSON.stringify(error, null, 2)}</pre>
  // return (
  //   <>
  //     <section className="hero">
  //       <div className="hero-body">
  //         <div className="container">
  //           <h1 className="title">{data.me.name}</h1>
  //           <h2 className="subtitle">{data.me.email}</h2>
  //         </div>
  //       </div>
  //     </section>
  //     <ChangeName name={data.me.name} />
  //     <ChangePassword />
  //   </>
  // )

  return (
    <Section>
      <Columns isCentered isMobile>
        <Column mobileWidth={11} tabletWidth={8} desktopWidth={7}>
          <article className="media">
            <figure className="media-left">
              <span className="image is-128x128">
                <Avatar round email={data.me.email} size="128" />
              </span>
            </figure>
            <div className="media-content">
              <div className="content">
                <h4 className="is-4">{data.me.name}</h4>
                <h5 className="is-5">{data.me.email}</h5>
                <p>
                  Bruger siden{' '}
                  {new Date(data.me.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </article>
          <hr />
          <nav className="level">
            <div className="level-item has-text-centered">
              <button
                className="button"
                onClick={(): void => setEditing(!editing)}
              >
                {editing ? 'Færdig med redigering' : 'Rediger oplysninger'}
              </button>
            </div>
          </nav>
        </Column>
      </Columns>
      {editing && (
        <div>
          <ChangeName name={data.me.name} />
          <ChangePassword />
        </div>
      )}
    </Section>
  )
}
