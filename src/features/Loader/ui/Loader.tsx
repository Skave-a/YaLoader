import React, { useState, ChangeEvent } from 'react';
import { uploadFile } from './axios';
import styles from './Loader.module.scss';

const FileUpload: React.FC = (): React.JSX.Element => {
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 100) {
      setFiles([...Array.from(files).slice(0, 100)]);
    } else if (files) {
      setFiles([...Array.from(files)]);
    }
  };

  const path = '/folder';

  const handleFileUpload = () => {
    uploadFile(files, path);
  };

  return (
    <div className={styles.block}>
      <label className={styles.inputFile}>
        <input type="file" multiple onChange={handleFileChange} />
        <span className={styles.inputFileBtn}>Choose file</span>
      </label>

      <button onClick={handleFileUpload} className={styles.inputFileBtn}>
        Upload files
      </button>
    </div>
  );
};

export default FileUpload;
