import _ from 'lodash';
import './style/index.less';

function createdomElement(){
	let domsss = document.createElement('div');
	dom.innerHTML = _.join(['hello','world'],'');
	return dom
}

document.body.appendChild(createdomElement());