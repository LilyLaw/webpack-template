import _ from "lodash";
import "./style/index.less";
import imgsrc from "img/style-loader.png";
// import axios from "axios";

function createdomElement(){
	let dom = document.createElement("div");
	dom.innerHTML = _.join(["hello","world"],"");

	let img = new Image();
	img.src = imgsrc;

	dom.appendChild(img);
	return dom;
}

// console.log("hello1111111111111dsfsfew~~~");

document.body.appendChild(createdomElement());