import { useState } from "react";
import { storage } from "./firebase";
import { ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

function App() {

  const [fileUpload, setFileUpload] = useState(null);

  const uploadFile = () => {
    if (fileUpload == null) return null;
    // Get reference to fill path on storage bucket
    const fileRef = ref(storage, `files/${v4() + fileUpload.name}`);
    // Upload the file
    uploadBytes(fileRef, fileUpload).then(() => {
      alert("Image uploaded");
    });
  };

  return (
    <>
      <h1>Storage Upload Testing</h1>
      <input type="file" onChange={(event) => {setFileUpload(event.target.files[0])}} />
      <button onClick={uploadFile}>Upload</button>
    </>
  );
}

export default App;
