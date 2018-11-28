import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCat, faTimes} from '@fortawesome/free-solid-svg-icons';
import {AnchorButton, Intent, ProgressBar} from '@blueprintjs/core';
import _ from 'lodash';

import './assets/Memes.css';

class Memes extends Component{

  constructor(props) {
    super(props)
    this.state = {
      loadedFiles: []
    };
  }

  componentDidUpdate(){
  }
  DragOver = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    console.log('asd');
  }
  
  onFileLoad(e){
    const file = e.target.files[0];
    let fileReader = new FileReader()
    fileReader.onload = () =>{
      console.log('IMAGE LOADED : ', fileReader.result)
      const files = {
        data: fileReader.result,
        isUploading: false,
      }

      this.addLoadedFile(files);
    }

    fileReader.onabort = () =>{
      alert('reading aborted');
    }

    fileReader.onerror = () =>{
      alert('reading ERROR');
    }

    
   fileReader.readAsDataURL(e.target.files[0]);
  }
  
  addLoadedFile(file){
    this.setState((prevState) => ({loadedFiles: [...prevState.loadedFiles, file]}))
  }
  removeLoadedFile(file){
    this.setState((prevState) => {
      let loadedFiles = prevState.loadedFiles;
      let newLoadedFiles = _.filter(loadedFiles, (ldFile) =>{
        return ldFile != file;
      })
      return{ loadedFiles: newLoadedFiles }
    })
  }

  removeAllLoadedFile(){
    this.setState({loadedFiles: []})
  }

  render(){
    const { loadedFiles } = this.state;
    return(
      <React.Fragment>
        <div>
          <div
          className="inner-container"
          style={{
          display: "flex",
          flexDirection: "column"
        }}>
          <div className="sub-header">Upload your meme!</div>
          <div className="draggable-container">
          <input
          type="file"
          id="file-browser-input"
          name="file-browser-input"
          ref={input => this.fileInput = input}
          onDragOver={(e) => {
          e.preventDefault();
          e.stopPropagation();
          }}
          onDrop={this
          .onFileLoad
          .bind(this)}
          onChange={this
          .onFileLoad
          .bind(this)}/>
            <div className="files-preview-container">
              {loadedFiles.map((file, idx) => {
                return <div className="file" key={idx}>
                  <img src={file.data} alt=""/>
                  <div className="container">
                    <span className="progress-bar">
                    {file.isUploading && <ProgressBar />}
                    </span>
                    <span className="remove-btn" onClick={() => this.removeLoadedFile(file)}>
                      <FontAwesomeIcon icon={faTimes}/>
                    </span>
                  </div>
                </div>
              })}
            </div>
            <div className="helper-text">Drag an Cat <FontAwesomeIcon icon={faCat}/></div>
            <div className="file-browser-container">
              <AnchorButton
                text="Browse"
                intent={Intent.PRIMARY}
                minimal={true}
                onClick={() => this.fileInput.click()}/>
            </div>
          </div>
          <AnchorButton text="Upload" intent={Intent.SUCCESS}/>
        </div>
        </div>
        <div>

        </div>

      </React.Fragment>
    );
  }

}

export default Memes;