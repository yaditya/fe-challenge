import React, {Component} from 'react';
import Content from './content';
import data from '../../../results.json';

class Home extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div>
				<Content data={data} />
			</div>
		);
	}
}

export default Home;
