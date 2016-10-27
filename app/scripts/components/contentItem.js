import React, {Component, PropTypes} from 'react';

class ContentItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const item = this.props.item;
        let thumbnail;

        if (item.thumbnail && item.thumbnail !== '') {
            thumbnail = <img className="item-image" src={`./images/${item.thumbnail}`} alt={item.title} />;
        }

        return (
            <div className="row">
                <div className="col-md-4">
                    {thumbnail}
                </div>

                <div className="col-md-7">
                    <p dangerouslySetInnerHTML={{__html: item.description}}></p>
                </div>
            </div>
        );
    }
}

ContentItem.propTypes = {
    item: PropTypes.object.isRequired
};

ContentItem.defaultProps = {
    item: {}
};

export default ContentItem;
