import { useEffect, useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

function App() {

  const [fileUpload, setFileUpload] = useState(null);
  const [fileList, setFileList] = useState([]);

  // Function to upload files to storage bucket
  const uploadFile = () => {
    if (fileUpload == null) return null;
    // Get reference to fill path on storage bucket
    const fileRef = ref(storage, `files/${v4() + fileUpload.name}`);
    // Upload the file to storage bucket then add it to state
    uploadBytes(fileRef, fileUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setFileList((prev) => [...prev, url]);
      })
    });
  };

  useEffect(() => {
    // Set fileListReference from storage bucket
    const fileListRef = ref(storage, "files/");

    // ListAll lists all files in reference path
    listAll(fileListRef).then((response) => {
      // Get all download urls from each item in response and add them to state
      response.items.forEach(item => {
        getDownloadURL(item).then((url) => {
          setFileList((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <>
      <h1>Storage Upload Testing</h1>

      {/* Simple Form for file upload */}
      <input type="file" onChange={(event) => {setFileUpload(event.target.files[0])}} />
      <button onClick={uploadFile}>Upload</button>

      {/* Map all images to page */}
      {fileList.map((url) => {
        return <div key={v4()}><a href={url}>File</a><br /></div>
      })}
    </>
  );
}

export default App;
