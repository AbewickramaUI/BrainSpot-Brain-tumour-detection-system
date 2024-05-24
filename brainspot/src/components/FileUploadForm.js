import React, { useEffect, useState } from "react";
import "./FileUploadForm.css";
import axios from "axios";

const FileUploadForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [username, setUsername] = useState("");
  const [result, setResult] = useState("");
  const [email, setEmail] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setResult("");
  };

  // const handleUsernameChange = (event) => {
  //   setUsername(event.target.value);
  // };

  useEffect(() => {
    // Retrieve data from local storage
    const userData = localStorage.getItem("user");
    console.log(userData);

    if (userData) {
      setUsername(userData);
    }
  }, []);

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("username", username);

    const ml_endpoint = "http://a612-34-90-93-87.ngrok.io/classify_disease";
    try {
      const response = await axios.post(ml_endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // window.alert(response.data);
      // console.log("Upload success:", response.data);
      setResult(response.data);

      // Handle success response from the server
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <>
      <div className="file-upload-container" >
      <br /><br />
        <h2>File Upload Form</h2><br />
        <p>

        <br /><br /><br /><br />

        </p>
        <div style={{ textAlign: "center" }}>
  <label htmlFor="file-input">Choose File</label><br /><br />
  <input type="file" id="file-input" onChange={handleFileChange} /><br />
  <div style={{ display: "flex", justifyContent: "center" }}><br /><br />
    <button onClick={handleUpload} style={{ marginBottom: "2rem" }}>
      Upload and Submit
    </button><br /><br />
  </div>
</div>


        {/* show the selected image preview */}
        {selectedFile && (
          <div>
            <img
              src={URL.createObjectURL(selectedFile)}
              alt="preview"
              style={{
                width: "100%",
                height: "100%",
                margin: "auto",
              }}
            />
          </div>
        )}
        <br />
        <br />

        {result === "" ? (
          <div></div>
        ) : (
          <div
            style={{
              marginBottom: "2rem",
              padding: "0.5rem",
              border: "2px solid red",
            }}
          >   <br />
            <h5>Result - {result}</h5>
          </div>
        )}
      </div>
    </>

  );
};

export default FileUploadForm;
