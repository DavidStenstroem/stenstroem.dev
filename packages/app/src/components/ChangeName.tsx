import * as React from 'react'
import { ChangeNameComponent, ChangeNameInput } from '../generated/graphql'
import { Section } from './Section'
import { Columns } from './Columns'
import { Column } from './Column'
import { Formik, Field } from 'formik'
import { changeNameSchema } from '@stenstroem-dev/shared'
import { faSignature } from '../icons'
import { InputField } from './InputField'
import classnames from 'classnames'

interface Props {
  name: string
}

export const ChangeName: React.FunctionComponent<Props> = ({
  name,
}): JSX.Element => (
  <ChangeNameComponent>
    {(onMutate): JSX.Element => (
      <Section>
        <Columns isCentered isMobile>
          <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
            <Formik<ChangeNameInput>
              validationSchema={changeNameSchema}
              initialValues={{ newName: name }}
              onSubmit={(values, actions): void => {
                actions.setSubmitting(true)
                onMutate({ variables: { input: values } })
                  .then((response): void => {
                    if (response && response.data.changeName) {
                      response.data.changeName.forEach((err): void =>
                        actions.setFieldError(err.path, err.message)
                      )
                    } else {
                      // todo - show success toast
                    }
                  })
                  .catch((err): void => {
                    console.log(err)
                    // todo - set toast
                  })
                  .finally((): void => actions.setSubmitting(false))
              }}
            >
              {({ submitForm, isSubmitting }): JSX.Element => (
                <>
                  <Field
                    type="text"
                    name="newName"
                    icon={faSignature}
                    label="Nyt navn"
                    placeholder="John Doe"
                    component={InputField}
                  />
                  <button
                    className={classnames(
                      'button',
                      'is-link',
                      'is-fullwidth',
                      isSubmitting && 'is-loading'
                    )}
                    onClick={submitForm}
                    disabled={isSubmitting}
                  >
                    Skift navn
                  </button>
                </>
              )}
            </Formik>
          </Column>
        </Columns>
      </Section>
    )}
  </ChangeNameComponent>
)
