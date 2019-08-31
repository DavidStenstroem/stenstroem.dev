import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../../components/Section'
import { CreateAlbumComponent, CreateAlbumInput } from '../../generated/graphql'
import { Columns } from '../../components/Columns'
import { Column } from '../../components/Column'
import { Formik, Field } from 'formik'
import { createAlbumSchema } from '@stenstroem-dev/shared'
import { faPencil } from '../../icons'
import { InputField } from '../../components/InputField'

export const Create: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const [files, setFiles] = React.useState<File[]>([])
  const initValues: CreateAlbumInput = {
    files: [],
    description: '',
    media: [],
    title: '',
    sharedWith: [],
  }

  return (
    <CreateAlbumComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<CreateAlbumInput>
                initialValues={initValues}
                validationSchema={createAlbumSchema}
                onSubmit={(values, actions): void => {}}
              >
                {({ submitForm, isSubmitting, resetForm }): JSX.Element => (
                  <div>
                    <Field
                      name="title"
                      type="text"
                      icon={faPencil}
                      label="Titel"
                      placeholder="Albummets titel"
                      component={InputField}
                    />
                    <div className="field">
                      <label className="label">Beskrivelse</label>
                      <div className="control">
                        <Field
                          name="description"
                          className="textarea"
                          resize="none"
                          component="textarea"
                          placeholder="Beskrivelse af albummet"
                        />
                      </div>
                    </div>
                    <p>&nbsp;</p>
                  </div>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </CreateAlbumComponent>
  )
}
