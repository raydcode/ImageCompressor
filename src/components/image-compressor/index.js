import React, { Component } from 'react';

import imageCompression from 'browser-image-compression';

import Card from 'react-bootstrap/Card';

export default class ImageCompressor extends Component {
  constructor() {
    super();
    this.state = {
      compressedLink:
        'http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png',
      originalImg: '',
      originalLink: '',
      is_active: false,
      upload: false,
    };
  }

  handleChange = (e) => {
    const imageFile = e.target.files[0];
    this.setState({
      originalLink: URL.createObjectURL(imageFile),
      originalImg: imageFile,
      outputFileName: imageFile.name,
      upload: true,
    });
  };

  changeValue = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleClick = (e) => {
    e.preventDefault();

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    };

    if (options.maxSizeMB >= this.state.originalImg.size / 1024) {
      alert('Image is too small cant be compressed');
      return 0;
    }

    let output;

    imageCompression(this.state.originalImg, options).then((data) => {
      output = data;
      const downloadLink = URL.createObjectURL(output);
      this.setState({ compressedLink: downloadLink });
    });
    this.setState({ is_active: true });
    return 1;
  };

  render() {
    return (
      <div className="m-5 ">
        <div className="text-light text-center">
          <h1>Image Compression</h1>
        </div>

        <div className="row mt-5">
          <div className="col-xl-4 col-lg-4 col-md-12 colsm-12">
            {this.state.upload ? (
              <Card.Img
                className={'ht'}
                variant="top"
                src={this.state.originalLink}
              ></Card.Img>
            ) : (
              <Card.Img
                className="ht"
                variant="top"
                src="http://navparivartan.in/wp-content/uploads/2018/11/placeholder.png"
              ></Card.Img>
            )}

            <div className="d-flex justify-content-center">
              <input
                type="file"
                accept="image/*"
                className="mt-2 btn btn-dark w-75"
                onChange={(e) => this.handleChange(e)}
              />
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
            {this.state.outputFileName ? (
              <button
                type="button"
                className="btn btn-dark"
                onClick={(e) => this.handleClick(e)}
              >
                Compress
              </button>
            ) : (
              <></>
            )}
          </div>

          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
            <Card.Img variant="top" src={this.state.compressedLink}></Card.Img>

            {this.state.is_active ? (
              <div className="d-flex justify-content-center">
                <a
                  href={this.state.compressedLink}
                  download={this.state.outputFileName}
                  className="mt-2 btn btn-dark w-75"
                >
                  Download
                </a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    );
  }
}
