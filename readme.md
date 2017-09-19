# Material Design Input Chips - ReactJs


![Deps](https://img.shields.io/badge/dependencies-up--to--date-green.svg)
![ScreenShot](/shots.png?raw=true)
[DEMO](https://react-mdchips.herokuapp.com/)


##Getting Started

```
npm install react-mdchips
```

##Usage

In your html file, make sure to include the [materializeCss](http://materializecss.com/) file 
Also please add [this css](https://raw.githubusercontent.com/jihdeh/react-mdInputChips/master/src/style/main.css) file, which you can customize to your taste. Note: Add the css file below the materializeCss file.

```
import MdInputChips from "react-mdchips";

<MdInputChips 
  placeholder="React Tags" 
  containerClassName="outer-tags-div"
  chips=["xx", "cv"]
  inputClassName="tags-input"
  max="10"
  onBlur={this.onBlurEvt.bind(this)}
  onEnter={this.onEnterEvt.bind(this)}
    onEnter={this.onEnterEvt.bind(this)}
/>

```

Props | Descrition
--- | ---
placeholder | Default input text you want to display to the user. (optional)
chips | You can use this to display a default array of chips e.g ["xx", "cv"]. (optional)
containerClassName | Custom classname to style the outer layer of the whole chips. (optional)
inputClassName | You can add your custom class name to style the input text box. (optional)
max | Integer - Max Number of chips you want to allow. (optional, default: 20)
onBlur | function - Accept function that returns array of chips on blur event
onEnter | function - Accept function that returns array of chips on enter keypress or tab event

