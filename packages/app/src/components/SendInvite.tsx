import * as React from 'react'
import {
  InviteComponent,
  InviteInput,
  GetInvitesDocument,
} from '../generated/graphql'
import { Section } from './Section'
import { Columns } from './Columns'
import { Column } from './Column'
import { Formik, Field } from 'formik'
import { inviteSchema } from '@stenstroem-dev/shared'
import { faAt } from '../icons'
import classnames from 'classnames'
import { InputField } from './InputField'
import { MainContextState, MainContext } from '../context/MainContext'

export const SendInvite: React.FunctionComponent = (): JSX.Element => {
  const { account } = React.useContext<MainContextState>(MainContext)
  return (
    <InviteComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isMobile isCentered>
            <Column mobileWidth={11} tabletWidth={8} desktopWidth={6}>
              <div className="content">
                <h6 className="is-6">
                  Skriv mailadressen på den person, som du ønsker at invitere og
                  tryk derefter på <b>Send invitation</b>
                </h6>
              </div>
              <Formik<InviteInput>
                initialValues={{ email: '' }}
                validationSchema={inviteSchema}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({
                    variables: { input: values },
                    refetchQueries: [
                      {
                        query: GetInvitesDocument,
                        variables: { from: account.id },
                      },
                    ],
                  })
                    .then((response): void => {
                      if (response && response.data.invite) {
                        response.data.invite.forEach((err): void =>
                          actions.setFieldError(err.path, err.message)
                        )
                      } else {
                        // todo
                        actions.resetForm({ email: '' })
                      }
                    })
                    .catch((err): void => {
                      // todo
                      console.log(err)
                    })
                    .finally((): void => actions.setSubmitting(false))
                }}
              >
                {({ isSubmitting, submitForm }): JSX.Element => (
                  <>
                    <Field
                      type="email"
                      name="email"
                      icon={faAt}
                      label="Email"
                      placeholder="hej@med.dig"
                      component={InputField}
                    />
                    <button
                      className={classnames(
                        'button is-link',
                        isSubmitting && 'is-loading'
                      )}
                      type="submit"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Send invitation
                    </button>
                  </>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </InviteComponent>
  )
}
