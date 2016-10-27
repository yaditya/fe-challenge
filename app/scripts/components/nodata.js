import React, {Component, PropTypes} from 'react';

class NoData extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="row">
                <div className="col-xs-12">
                    <h3>No data found.</h3>
                </div>
            </div>
        );
    }
}

export default NoData;
