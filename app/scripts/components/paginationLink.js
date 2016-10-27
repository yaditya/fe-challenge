import React, {Component, PropTypes} from 'react';

class PaginationLink extends Component {
    constructor(props) {
        super(props);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.onLinkClick(e.currentTarget.className);
    }

    render() {
        const {prevTitle, nextTitle} = this.props;

        let prevTriangle = (prevTitle !== '') ? <span className="prev triangle left" onClick={this.handleClick.bind(this)}></span> : null;

        let nextTriangle = (nextTitle !== '') ? <span className="next triangle right" onClick={this.handleClick.bind(this)}></span> : null;

        return (
            <div className="bottom-pagination row">
                <div className="col-xs-6">
                    {prevTriangle}
                    <a className="link prev hidden-xs hidden-sm" onClick={this.handleClick.bind(this)}>{prevTitle}</a>
                </div>

                <div className="text-right col-xs-6">
                    <a className="link next hidden-xs hidden-sm" onClick={this.handleClick.bind(this)}>{nextTitle}</a>
                    {nextTriangle}
                </div>
            </div>
        );
    }
}

PaginationLink.propTypes = {
    onLinkClick: PropTypes.func,
    prevTitle: PropTypes.string,
    nextTitle: PropTypes.string
};

PaginationLink.defaultProps = {
    onLinkClick: () => {},
    prevTitle: '',
    nextTitle: ''
};

export default PaginationLink;
