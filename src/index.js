import _ from "lodash";
import "./style/index.less";
// import axios from "axios";

function createdomElement(){
	let dom = document.createElement("div");
	dom.innerHTML = _.join(["hello","world"],"");
	return dom;
}

// console.log("hello1111111111111dsfsfew~~~");

document.body.appendChild(createdomElement());