import React from 'react'
import useApp from './UseApp'
import FileUploader from './FileUploader'
import FileUploaderScreen from './FileUploaderScreen'
import './styles.css'

const FileUpload = ({ children }) => {
  const inputRef = React.createRef()
  const {
    files,
    pending,
    next,
    uploading,
    uploaded,
    status,
    onSubmit,
    onChange,
    triggerInput,
  } = useApp({ inputRef })

  return (
    <form className="form" onSubmit={onSubmit}>
      <FileUploader
        triggerInput={triggerInput}
        inputRef={inputRef}
        onChange={onChange}
      >
        <FileUploaderScreen status={status} files={files} />
      </FileUploader>
      {/* <div>
        {files.map(({ file, src, id }, index) => (
          <div key={`file-row${index}`}>
            <img src={src} alt="" />
            <div>{file.name}</div>
          </div>
        ))}
      </div> */}
    </form>
  )
}

export default FileUpload