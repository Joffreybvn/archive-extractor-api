
import React from "react";
import {
    wrapper,
    upload,
    upload_button
} from "./upload_box.module.scss"
import UploadedFile from "./uploaded_file/uploaded_file";


class UploadBox extends React.Component {

     constructor(props) {
        super(props);

        this.state = {
            uploadedFiles: []
        }
    }

    triggerInputFile = () => {
        document.getElementById('file-selector').click()
    }

    uploadFiles = (event) => {
        event.preventDefault();
        const files = event.target.files || event.dataTransfer.files

         // Create UploadedFile components
        for (let file of files) {

            let key = Math.floor(Math.random() * 10000);
            this.setState(currentState => ({
                uploadedFiles: [...currentState.uploadedFiles, <UploadedFile file={file} key={key} removeFile={this.removeFile(this)}/>]
            }));
        }

        // Clear the input
        document.getElementById('file-selector').value = "";
    }

    removeFile = (parent) => {
         const self = parent;

         return (key) => {
             const newUploadedFiles = [...self.state.uploadedFiles];
             newUploadedFiles.splice(key, 1);

             self.setState(() => ({
                 uploadedFiles: newUploadedFiles
             }))
         }
    }

    render() {
        return (
            <div className={wrapper}>
                <div className={upload} onDrop={this.uploadFiles} onDragOver={(event) => {event.preventDefault()}}>
                    <input type="file" id="file-selector" accept=".rar" onChange={this.uploadFiles} multiple/>
                    <p>Drag files here or <span className={upload_button} onClick={this.triggerInputFile}>Browse</span></p>
                </div>
                {this.state.uploadedFiles}
            </div>
        )
    }
}

export default UploadBox;
