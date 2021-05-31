
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

    render() {
        return (
            <div className={uploaded}>
                <div className={image}>
                    <img src={archiveImage} alt="File" />
                </div>
                <div className={file_name}>{this.props.filename}</div>
                <div className={remove}>
                    <img src={RemoveImage} alt="Remove" title="Remove"/>
                </div>
                <div className={progress}>
                    <div className={progress_bar} style={{width: '100%'}}/>
                </div>
                <div className={content} />
            </div>
        )
    }
}

export default UploadedFile;
