import React, { useState, ChangeEvent } from 'react';
import { uploadFile } from './axios';

const FileUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  console.log('selectedFiles', selectedFiles);
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 100) {
      setSelectedFiles([...Array.from(files).slice(0, 100)]);
    } else if (files) {
      setSelectedFiles([...Array.from(files)]);
    }
  };

  const path = '/folder'; 

  const handleFileUpload = () => {
    uploadFile(selectedFiles, path);
  };


  return (
    <div>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Загрузить файлы</button>
    </div>
  );
};

export default FileUpload;
