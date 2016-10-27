import React, {Component, PropTypes} from 'react';
import ProductList from './productList';

class Container extends Component {
    render() {
        const products = this.props.data.results;

        if (products.length === 0) return null;

        return (
            <ProductList products={products} />

        )
    }
}

Container.propTypes = {
    data: PropTypes.object.isRequired
};

export default Container;