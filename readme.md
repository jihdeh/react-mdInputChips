# Material Design Input Chips - ReactJs


![Deps](https://img.shields.io/badge/dependencies-up--to--date-green.svg)
![ScreenShot](/shots.png?raw=true)


##Usage

```
npm install react-mdchips
bower install react-mdchips
```
In your html file, make sure to include the [materializeCss](http://materializecss.com/) file 
Also please add [this css](https://github.com/jihdeh/react-mdInputChips/blob/master/src/style/main.css) file, which you can customize to your taste. Note: Add it below the materializeCss file.

```
import MdInputChips from "react-mdchips";

<MdInputChips 
  placeholder="React Tags" 
  containerClassName="outer-tags-div"
  chips={array.tags}
  inputClassName="tags-input"
  max="10"
  onBlur={this.onTextChange.bind(this, {type: "tag"})}
/>

```

Props | Descrition
--- | ---
placeholder | Default input text you want to display to the user
chips | An array of tags e.g ["xx"]. This is populated after the user clicks enter
containerClassName | Custom classname to style the outer layer of the whole chips
inputClassName | You can add your custom class name to style the input text box
max | Integer - Max Number of chips you want to allow

