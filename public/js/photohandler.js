const UploadForm = () => {
  //  const [file, setFile] = useState(null);
  //  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/s3-upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log(data.status);
      setUploading(false);
      const photo = document.getElementById("post-pic-file").value;
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };
};
