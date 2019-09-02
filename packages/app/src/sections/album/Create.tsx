import * as React from 'react'
import { RouteComponentProps } from '@reach/router'
import { Section } from '../../components/Section'
import { CreateAlbumComponent, CreateAlbumInput } from '../../generated/graphql'
import { Columns } from '../../components/Columns'
import { Column } from '../../components/Column'
import { Formik, Field } from 'formik'
import { createAlbumSchema } from '@stenstroem-dev/shared'
import { faPencil, faUpload, FontAwesomeIcon } from '../../icons'
import { InputField } from '../../components/InputField'
import { Modal } from '../../components/Modal'
import { CreateAlbumContext } from '../../context/CreateAlbumContext'
import { Account } from '../../models/account.model'
import { SelectUsersModal } from '../../components/SelectUsersModal'

export const Create: React.FC<RouteComponentProps> = (props): JSX.Element => {
  const [files, setFiles] = React.useState<File[]>([])
  const [showUserModal, setShowUserModal] = React.useState<boolean>(false)
  const [users, setUsers] = React.useState<Account[]>([])
  const initValues: CreateAlbumInput = {
    files: [],
    description: '',
    media: [],
    title: '',
    sharedWith: [],
  }

  return (
    <CreateAlbumContext.Provider value={{ users, setUsers }}>
      <CreateAlbumContext.Consumer>
        {({ users, setUsers }): JSX.Element => (
      <CreateAlbumComponent>
        {(onMutate): JSX.Element => (
          <>
            <Modal
              show={showUserModal}
              handleClose={(): void => setShowUserModal(false)}
            >
              {showUserModal && (
                <SelectUsersModal
                  handleClose={(): void => setShowUserModal(false)}
                />
              )}
            </Modal>
            <Section>
              <Columns isCentered isMobile>
                <Column mobileWidth={10} tabletWidth={6} desktopWidth={4}>
                  <Formik<CreateAlbumInput>
                    initialValues={initValues}
                    validationSchema={createAlbumSchema}
                    onSubmit={(values, actions): void => {}}
                  >
                        {({
                          submitForm,
                          isSubmitting,
                          resetForm,
                        }): JSX.Element => (
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
                        <Columns isMobile>
                          <Column>
                            <button
                              className="button is-link is-fullwidth"
                              onClick={() => setShowUserModal(true)}
                            >
                              Begræns adgang
                            </button>
                          </Column>
                          <Column>
                            <button className="button is-link is-fullwidth">
                              Vælg billeder
                            </button>
                          </Column>
                        </Columns>
                        <p>&nbsp;</p>
                        <div className="field">
                          <div className="file has-name is-boxed is-centered">
                            <label className="file-label">
                              <input
                                type="file"
                                name="files"
                                accept="image/*,video/*"
                                multiple
                                className="file-input"
                              />
                              <span className="file-cta">
                                <span className="file-icon">
                                  <FontAwesomeIcon icon={faUpload} />
                                </span>
                                    <span className="file-label">
                                      Upload filer
                                    </span>
                              </span>
                              <span className="file-name has-text-centered">
                                something ...
                              </span>
                            </label>
                          </div>
                        </div>
                      </div>
                    )}
                  </Formik>
                </Column>
              </Columns>
            </Section>
          </>
        )}
      </CreateAlbumComponent>
        )}
      </CreateAlbumContext.Consumer>
    </CreateAlbumContext.Provider>
  )
}
