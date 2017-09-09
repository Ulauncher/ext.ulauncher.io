import React from 'react';
import {connect} from "react-redux"

import {selectExtension, selectImage} from "../../actions/extensionInfo"

class ExtensionInfo extends React.Component {

  constructor(props) {
    super(props);

    this.nextImg = this.nextImg.bind(this);
    this.prevImg = this.prevImg.bind(this);

    this.props.dispatch(selectExtension({
        name: 'Extension name',
        description: 'Some description here',
        url: 'https://github.com/user/project',
        version: '1.2.3',
        last_updated: 'Feb 15, 2017',
        author: 'Author name',
        images: ['/img/p_big3.jpg', '/img/p_big2.jpg', '/img/p_big1.jpg']
      }
    ));

  }

  nextImg(e) {

    e.preventDefault();

    let {extensionInfo, currentImage} = this.props.extensionInfo;

    let selectedImage = 0;
    if (currentImage + 1 < extensionInfo.images.length) {
      selectedImage = currentImage + 1;
    }

    this.props.dispatch(selectImage(selectedImage));
  }

  prevImg(e) {

    e.preventDefault();

    let {extensionInfo, currentImage} = this.props.extensionInfo;

    let selectedImage = extensionInfo.images.length - 1;
    if (currentImage - 1 > 0) {
      selectedImage = currentImage - 1;
    }

    this.props.dispatch(selectImage(selectedImage));

  }

  render() {

    let {extensionInfo, currentImage} = this.props.extensionInfo;

    return (

      <div className="wrapper wrapper-content">
        <div className="container">
          <div className="ibox-content">
            <div className="row">
              <div className="col-md-6">
                {extensionInfo.images &&
                <div className="carousel slide" id="carousel1">
                  <div className="carousel-inner">
                    {extensionInfo.images.map((item, i) =>
                      <div key={i.toString()} className={ i == currentImage ? "item active" : "item" }>
                        <img alt="image" className="img-responsive" src={item}/>
                      </div>
                    )}
                  </div>
                  <a data-slide="prev" href="#" className="left carousel-control" onClick={this.prevImg}>
                    <span className="icon-prev"/>
                  </a>
                  <a data-slide="next" href="#" className="right carousel-control" onClick={this.nextImg}>
                    <span className="icon-next"/>
                  </a>
                </div>
                }
              </div>
              <div className="col-md-6">

                <h1>{extensionInfo.name}</h1>
                <div>{extensionInfo.description}</div>

                <div className="form-horizontal m-t-lg">
                  <div className="form-group">
                    <label className="col-lg-4">URL</label>
                    <div className="col-lg-8">
                      <a href="#">{extensionInfo.url}</a>
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-4">Version</label>
                    <div className="col-lg-8">
                      {extensionInfo.version}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-4">Last updated</label>
                    <div className="col-lg-8">
                      {extensionInfo.last_updated}
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="col-lg-4">Author</label>
                    <div className="col-lg-8">
                      {extensionInfo.author}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    );
  }
}

export default connect((state) => {
  return {
    extensionInfo: state.extensionInfo
  }
})(ExtensionInfo)