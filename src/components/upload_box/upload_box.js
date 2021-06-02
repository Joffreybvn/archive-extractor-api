
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

         // Create UploadedFile components
        for (let file of event.target.files) {

            let key = Math.floor(Math.random() * 10000);
            this.setState({
                uploadedFiles: [...this.state.uploadedFiles, <UploadedFile file={file} key={key} removeFile={this.removeFile(this)}/>]
            })
        }

        // Clear the input
        document.getElementById('file-selector').value = "";
    }

    removeFile = (parent) => {
         const self = parent;

         return (index) => {
             const newUploadedFiles = [...self.state.uploadedFiles];
             newUploadedFiles.splice(index, 1);

             self.setState((state) => ({
                 uploadedFiles: newUploadedFiles
             }))
         }
    }

    render() {
        return (
            <div className={wrapper}>
                <div className={upload}>
                    <input type="file" id="file-selector" accept=".rar" multiple onChange={this.uploadFiles}/>
                    <p>Drag files here or <span className={upload_button} onClick={this.triggerInputFile}>Browse</span></p>
                </div>
                {this.state.uploadedFiles}
            </div>
        )
    }
}

export default UploadBox;
