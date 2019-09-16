import * as React from 'react'
import classnames from 'classnames'
import {
  ChangePasswordComponent,
  ChangePasswordInput,
} from '../generated/graphql'
import { Section } from './Section'
import { Columns } from './Columns'
import { Column } from './Column'
import { Formik, Field } from 'formik'
import { changePasswordSchema } from '@stenstroem-dev/shared'
import { faKey } from '../icons'
import { InputField } from './InputField'

export const ChangePassword: React.FunctionComponent = (): JSX.Element => (
  <ChangePasswordComponent>
    {(onMutate): JSX.Element => (
      <Section>
        <Columns isCentered isMobile>
          <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
            <Formik<ChangePasswordInput>
              validationSchema={changePasswordSchema}
              initialValues={{ newPassword: '', currentPassword: '' }}
              onSubmit={(values, actions): void => {
                actions.setSubmitting(true)
                onMutate({ variables: { input: values } })
                  .then((response): void => {
                    if (response && response.data.changePassword) {
                      response.data.changePassword.forEach((err): void => {
                        actions.setFieldError(err.path, err.message)
                      })
                    } else {
                      // todo - show success
                    }
                  })
                  .catch((err): void => {
                    console.log(err)
                    // todo - show error
                  })
                  .finally((): void => actions.setSubmitting(false))
              }}
            >
              {({ submitForm, isSubmitting, resetForm }): JSX.Element => (
                <>
                  <Field
                    type="password"
                    name="currentPassword"
                    icon={faKey}
                    label="Nuværende kode"
                    placeholder="Din kode"
                    component={InputField}
                  />
                  <Field
                    type="password"
                    name="newPassword"
                    icon={faKey}
                    label="Ny kode"
                    placeholder="Din nye kode"
                    component={InputField}
                  />
                  <div className="field is-grouped">
                    <div className="control">
                      <button
                        className={classnames(
                          'button is-link',
                          isSubmitting && 'is-loading'
                        )}
                        onClick={submitForm}
                        disabled={isSubmitting}
                      >
                        Skift kode
                      </button>
                    </div>
                    <div className="control">
                      <button
                        className="button is-text"
                        onClick={(): void =>
                          resetForm({ currentPassword: '', newPassword: '' })
                        }
                        disabled={isSubmitting}
                      >
                        Ryd
                      </button>
                    </div>
                  </div>
                </>
              )}
            </Formik>
          </Column>
        </Columns>
      </Section>
    )}
  </ChangePasswordComponent>
)
