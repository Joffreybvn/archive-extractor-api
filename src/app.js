
import React from "react";
import UploadBox from "./components/upload_box/upload_box";
import './app.module.scss';
import {
  file_upload
} from "./app.module.scss";


class App extends React.Component {

    render() {
        return (
            <div className={file_upload}>
                <UploadBox />
            </div>
        )
    }
}

export default App;
