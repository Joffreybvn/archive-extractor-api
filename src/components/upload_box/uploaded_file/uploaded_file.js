
import React from "react";
import RemoveImage from "./close.svg"
import archiveImage from "./archive.svg"
import {
    uploaded,
    image,
    file_name,
    remove,
    progress,
    progress_bar,
    content,
    bin,
    download
} from "./uploaded_file.module.scss"


class UploadedFile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            uploadPercent: 0
        }
    }

    /**
     * Triggered after the first render. Start the file upload.
     */
    componentDidMount() {
        this.uploadFile(this.props.file)
    }

    /**
     * Upload the file with XMLHttpRequest, and update the progress bar.
     * @param file
     */
    uploadFile = (file) => {

        // Setup a Form Data
        const data = new FormData();
        data.append("file", file, file.name);

        // Create a request
        const request = new XMLHttpRequest();
        request.withCredentials = true;
        request.responseType = 'blob';

        // Upload progress event
        request.upload.addEventListener('progress', (event) => {
            this.setState({
                uploadPercent: (event.loaded / event.total) * 100
            })
        });

        // Request finished event
        request.addEventListener('load', (event) => {

            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(request.response);
            link.download = this.props.file.name + '.zip';
            link.click();
        });

        // Send POST request to server
        request.open("POST", "https://api.xtract.cx/extract/rar");
        request.send(data);
    }

    removeFile = () => {
        this.props.removeFile(this.props.key)
    }

    render() {
        return (
            <div className={uploaded}>
                <div className={image}>
                    <img src={archiveImage} alt="File" />
                </div>
                <div className={file_name}>{this.props.file.name}</div>
                <div className={remove}>
                    <img src={RemoveImage} alt="Remove" title="Remove" onClick={this.removeFile}/>
                </div>
                <div className={progress}>
                    <div className={progress_bar} style={{width: `${this.state.uploadPercent}%`}}/>
                </div>
                <div className={content} />
                <div className={bin} />
                <div className={download} />
            </div>
        )
    }
}

export default UploadedFile;
