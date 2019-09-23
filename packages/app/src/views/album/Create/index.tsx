import React, { useState } from 'react'
import { RouteComponentProps } from '@reach/router'
import {
  CreateAlbumComponent,
  CreateAlbumInput,
} from '../../../generated/graphql'
import { Section } from '../../../components/Section'
import { Formik, Form, Field } from 'formik'
import { faPencil, FontAwesomeIcon, faUpload } from '../../../icons'
import { InputField } from '../../../components/InputField'
import { Columns } from '../../../components/Columns'
import { Column } from '../../../components/Column'
import { Modal } from '../../../components/Modal'
import { ShareWithModal } from '../../../components/ShareWithModal'

export const Create: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const [files, setFiles] = useState<File[]>([])
  const [showUserModal, toggleUserModal] = useState<boolean>(false)
  const [userIds, setUserIds] = useState<string[]>([])
  return (
    <CreateAlbumComponent>
      {(onMutate): JSX.Element => (
        <Section>
          <Columns isCentered isMobile>
            <Column tabletWidth={8} desktopWidth={7} fullHDWidth={6}>
              <Formik<CreateAlbumInput>
                initialValues={{
                  title: '',
                  description: undefined,
                  files: undefined,
                  sharedWith: [],
                }}
                onSubmit={(values, actions): void => {
                  actions.setSubmitting(true)
                  onMutate({ variables: { input: values } })
                    .then((response) => console.log(response))
                    .catch((err) => console.log(err))
                    .finally(() => actions.setSubmitting(false))
                }}
              >
                {({ setFieldValue, values, isSubmitting }): JSX.Element => (
                  <Form>
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
                          component="textarea"
                          placeholder="Beskrivelse af albummet"
                        />
                      </div>
                    </div>
                    <p>&nbsp;</p>

                    <Columns isCentered isMobile>
                      <Column
                        mobileWidth={4}
                        tabletWidth={4}
                        desktopWidth={4}
                        fullHDWidth={4}
                      >
                        <button
                          className="button is-link is-fullwidth"
                          type="button"
                          onClick={(): void => toggleUserModal(true)}
                        >
                          Begræns adgang
                        </button>
                      </Column>
                    </Columns>

                    {/* shared with --> */}
                    <Modal
                      key="shareWithModal"
                      isShowing={showUserModal}
                      hide={toggleUserModal}
                    >
                      <ShareWithModal
                        toggleModal={toggleUserModal}
                        selected={userIds}
                        setUsers={setUserIds}
                        setValue={setFieldValue}
                      />
                    </Modal>
                    {/* <-- shared with */}
                    <div className="field">
                      <div className="file has-name is-boxed is-centered">
                        <label className="file-label">
                          <input
                            type="file"
                            name="files"
                            accept="image/*,video/*"
                            multiple
                            className="file-input"
                            onChange={(event): void => {
                              setFiles((files) => [
                                ...files,
                                ...Array.from(event.currentTarget.files),
                              ])
                              setFieldValue('files', files)
                            }}
                          />
                          <span className="file-cta">
                            <span className="file-icon">
                              <FontAwesomeIcon icon={faUpload} />
                            </span>
                            <span className="file-label">Upload filer</span>
                          </span>
                          <span className="file-name has-text-centered">
                            {files.length}{' '}
                            {files.length === 1 ? 'fil' : 'filer'} valgt
                          </span>
                        </label>
                      </div>
                    </div>
                    <div className="tags">
                      {files.map(({ name }, index) => (
                        <span className="tag" key={`${index}_${name}`}>
                          {name}
                        </span>
                      ))}
                    </div>
                    <p>&nbsp;</p>
                    <div className="field is-grouped">
                      <p className="control">
                        <button
                          className={`button is-link ${isSubmitting &&
                            'is-loading'}`}
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Opret album
                        </button>
                      </p>
                    </div>
                    <p>&nbsp;</p>
                    <pre>{JSON.stringify(values, null, 2)}</pre>
                  </Form>
                )}
              </Formik>
            </Column>
          </Columns>
        </Section>
      )}
    </CreateAlbumComponent>
  )
}
