import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { loginSchema } from '@stenstroem-dev/shared'
import { Formik, Field } from 'formik'
import { LoginInput, LoginComponent } from '../generated/graphql'
import { MainContextState, MainContext } from '../context/MainContext'
import { Section } from '../components/Section'
import { Columns } from '../components/Columns'
import { Column } from '../components/Column'
import { Account } from '../models/account.model'
import { InputField } from '../components/InputField'
import { faEnvelope, faKey } from '../icons'
import classnames from 'classnames'

export const Login: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  let formRef: Formik<LoginInput>
  const { setAccount } = React.useContext<MainContextState>(MainContext)

  const handleReturnKey = (e: React.KeyboardEvent<any>): void => {
    if (e.keyCode === 13) {
      e.preventDefault()
      formRef.submitForm()
    }
  }

  const initialValues: LoginInput = {
    email: '',
    password: '',
  }

  return (
    <LoginComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<LoginInput>
                ref={(el): Formik<LoginInput> => (formRef = el)}
                validationSchema={loginSchema}
                initialValues={initialValues}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then((response): void => {
                      console.log(response)
                      if (response && response.data.login) {
                        response.data.login.forEach((err): void =>
                          actions.setFieldError(err.path, err.message)
                        )
                      } else {
                        setAccount(Account.accountFromCookie())
                      }
                    })
                    .catch((err): void => {
                      // todo - add error notification
                      actions.resetForm({ password: '', email: values.email })
                    })
                    .finally((): void => actions.setSubmitting(false))
                }}
              >
                {({ submitForm, isSubmitting }): JSX.Element => (
                  <div onKeyDown={handleReturnKey}>
                    <Field
                      type="email"
                      name="email"
                      icon={faEnvelope}
                      label="Email"
                      placeholder="din@email.com"
                      component={InputField}
                    />
                    <Field
                      type="password"
                      name="password"
                      icon={faKey}
                      placeholder="din adgangskode"
                      label="Kode"
                      component={InputField}
                    />
                    <p>&nbsp;</p>
                    <button
                      className={classnames(
                        'button is-link is-fullwidth',
                        isSubmitting ? 'is-loading' : null
                      )}
                      type="submit"
                      onClick={submitForm}
                      disabled={isSubmitting}
                    >
                      Log ind
                    </button>
                  </div>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </LoginComponent>
  )
}
