import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { MainContextState, MainContext } from '../context/MainContext'
import { Section } from '../components/Section'
import { Columns } from '../components/Columns'
import { Column } from '../components/Column'
import { Formik, Field } from 'formik'
import { CreateAlbumComponent, CreateAlbumInput } from '../generated/graphql'
import { createAlbumSchema } from '@stenstroem-dev/shared'
import { faPencil, FontAwesomeIcon, faUpload } from '../icons'
import { InputField } from '../components/InputField'
import { uploadEndpoint } from '../config/upload'

export const CreateAlbum: React.FunctionComponent<RouteComponentProps> = (
  props
): JSX.Element => {
  const { account } = React.useContext<MainContextState>(MainContext)
  const initialValues: CreateAlbumInput = {
    description: undefined,
    media: [],
    title: '',
  }

  const [files, setFiles] = React.useState<File[]>([])

  const handleFileChange = (fileList: FileList): void => {
    const incomingFiles = Array.from(fileList)
    const concFiles = new Set([...incomingFiles, ...files])
    setFiles(Array.from(concFiles))
  }

  const removeFile = (name: string): void => {
    const filteredFiles = files.filter((el) => el.name !== name)
    setFiles(filteredFiles)
  }

  const clearForm = (
    resetForm: (nextValues?: CreateAlbumInput) => void
  ): void => {
    resetForm(initialValues)
    setFiles([])
  }

  return (
    <CreateAlbumComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
              <Formik<CreateAlbumInput>
                initialValues={initialValues}
                validationSchema={createAlbumSchema}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then((response) => {
                      if (response && response.data.createAlbum.errors) {
                        response.data.createAlbum.errors.forEach((err) => {
                          actions.setFieldError(err.path, err.message)
                        })
                      } else if (response && response.data.createAlbum.link) {
                        // todo: show toast and navigate to new album
                      }
                    })
                    .catch((err) => {
                      // todo
                      console.log(err)
                    })
                    .finally(() => actions.setSubmitting(false))
                }}
              >
                {({ submitForm, isSubmitting, resetForm }): JSX.Element => (
                  <>
                    <Field
                      name="title"
                      type="text"
                      icon={faPencil}
                      label="Titel"
                      placeholder="Titlen på albummet"
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
                    <div className="file has-name is-centered is-boxed">
                      <label className="file-label">
                        <input
                          type="file"
                          name="files"
                          multiple
                          className="file-input"
                          accept="image/*,video/*"
                          onChange={(e): void =>
                            handleFileChange(e.currentTarget.files)
                          }
                        />
                        <span className="file-cta">
                          <span className="file-icon">
                            <FontAwesomeIcon icon={faUpload} />
                          </span>
                          <span className="file-label">Vælg filer</span>
                        </span>
                        <span className="file-name">
                          {files.length} {files.length === 1 ? 'fil' : 'filer'}{' '}
                          valgt
                        </span>
                      </label>
                    </div>
                    <p>&nbsp;</p>
                    <div className="tags">
                      {files.map(({ name, size }) => (
                        <span className="tag" key={`${name}-${size}`}>
                          {name}
                          <button
                            className="delete is-small"
                            onClick={(): void => removeFile(name)}
                          ></button>
                        </span>
                      ))}
                    </div>
                    <p>&nbsp;</p>
                    <div className="field is-grouped">
                      <p className="control">
                        <button
                          disabled={isSubmitting}
                          className="button is-link"
                        >
                          Opret album
                        </button>
                      </p>
                      <p className="control">
                        <button
                          className="button"
                          disabled={isSubmitting}
                          onClick={(): void => clearForm(resetForm)}
                        >
                          Ryd felter
                        </button>
                      </p>
                    </div>
                  </>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </CreateAlbumComponent>
  )
}
