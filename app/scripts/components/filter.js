import React, {Component, PropTypes} from 'react';

class Filter extends Component {
    handleChange(e) {
        this.props.onClick(e);
    }

    render() {
        const items = this.props.items.map(item => {
            return (
                <div className="checkbox">
                    <label>
                        <input type="checkbox" value={item.value} onChange={this.handleChange.bind(this)}>{item.text}</input>
                    </label>
                </div>
            )
        });

        return (
            <div className="filter-container col-xs-12">
                <header className="filter-container__header">
                    {this.props.title}   
                </header>

                {items}
            </div>
        )
    }
}

Filter.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.array.isRequired,
    onClick: PropTypes.func
};

export default Filter;