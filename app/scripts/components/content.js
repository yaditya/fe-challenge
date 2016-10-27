import React, {Component, PropTypes} from 'react';
import Header from './header';
import Breadcrumbs from './breadcrumbs';
import Container from './container';
import NoData from './nodata';

class Content extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let data = this.props.data;

        // Render error message if data is invalid
        if (!data || data.results.length === 0) return <NoData />;

        return (
            <div className="main-container container-fluid">
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-xs-12 col-sm-10">
                        <Header />
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                <div className="row">
                    <div className="tagline text-center col-xs-12">
                        prices shown include delivery
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-xs-12 col-sm-10">
                        <Breadcrumbs />
                    </div>
                    <div className="col-sm-1"></div>
                </div>
                
                <div className="row">
                    <div className="col-sm-1"></div>
                    <div className="col-xs-12 col-sm-10">
                        <Container data={data} />
                    </div>
                    <div className="col-sm-1"></div>
                </div>

                <div className="footer row">
                    <div className="col-sm-1"></div>
                    <div className="col-xs-12 col-sm-10">
                        <img src="images/Qantas.svg" alt="Qantas" />
                    </div>
                    <div className="col-sm-1"></div>
                </div>
            </div>
        );
    }
}

Content.propTypes = {
    data: PropTypes.object.isRequired
};

Content.defaultProps = {
    data: {}
};

export default Content;