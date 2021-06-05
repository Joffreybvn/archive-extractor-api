
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
    content
} from "./uploaded_file.module.scss"


class UploadedFile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            barPercent: 0,
            barColor: '#28a745',
            content: undefined,
        }
    }

    /**
     * Triggered after the first render. Start the file upload.
     */
    componentDidMount() {
        this.uploadFile(this.props.file)
    }

    /**
     * Upload the file with XMLHttpRequest, update the progress bar and handle the response.
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
                barPercent: (event.loaded / event.total) * 100
            })
        });

        // Upload complete event
        request.upload.addEventListener('load', (event) => {
        })

        // Response event
        request.addEventListener('load', (event) => {

            // Success: Download the blob as file
            if (request.status === 201) {
                let link = document.createElement('a');
                link.href = window.URL.createObjectURL(request.response);
                link.download = this.props.file.name + '.zip';

                link.click();
            }

            // Error: Display the error message
            else if (request.status === 500) {
                const reader = new FileReader();

                reader.addEventListener("load", () => {
                    this.setState({
                        barColor: '#a72828',
                        content: JSON.parse(reader.result)['message']
                    })
                });
                reader.readAsText(request.response);
            }
        });

        // Send POST request to server
        request.open("POST", "https://api.xtract.cx/extract/rar");
        // request.open("POST", "http://127.0.0.1:8000/extract/rar");
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
                    <div className={progress_bar} style={{width: `${this.state.barPercent}%`, backgroundColor: this.state.barColor}}/>
                </div>
                <div className={content}>{this.state.content}</div>
            </div>
        )
    }
}

export default UploadedFile;
