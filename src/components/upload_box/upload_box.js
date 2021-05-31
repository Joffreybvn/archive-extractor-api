
import React from "react";
import {
    wrapper,
    upload,
    upload_button
} from "./upload_box.module.scss"
import UploadedFile from "./uploaded_file/uploaded_file";


class UploadBox extends React.Component {

    triggerInputFile() {
        document.getElementById('file-selector').click()
    }

    uploadFiles(event) {
        const fileList = event.target.files;

        fetch("http://postman-echo.com/post", {
            method: 'POST',
            headers: {
                "Content-Type": "application/x-rar-compressed"
            },
            body: fileList[0]
        }).then(
            response => response.json()
        ).then(
            success => console.log(success)
        ).catch(
            error => console.log(error)
        );
    }


    render() {
        return (
            <div className={wrapper}>
                <div className={upload}>
                    <input type="file" id="file-selector" accept=".rar" multiple onChange={this.uploadFiles}/>
                    <p>Drag files here or <span className={upload_button} onClick={this.triggerInputFile}>Browse</span></p>
                </div>
                <UploadedFile filename="archive_example.rar"/>
                <UploadedFile filename="dolor_sit.rar"/>
                <UploadedFile filename="amet_consecetur.rar"/>
            </div>
        )
    }
}

export default UploadBox;
