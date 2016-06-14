# react-image-select-tool
A react component for cropping images.

![Deps](https://img.shields.io/badge/dependencies-up--to--date-green.svg)



##Usage

```

import CropPanel from "react-image-crop-tool";

<CropPanel
  originalSrc={this.state.original || this.props.original}
  onSelectRegion={this.cropRegion} //required
  cancelCrop={this.endCrop} //required
  aspectRatio={this.props.aspectRatio}
  size={this.props.size} //required
  onDeleteImage={this.onCancelCropImage || false}
  labels={this.labels}
  buttons={this.props.cropPanelButtons || this.props.buttons}/>)

```

