import React, {Component, PropTypes} from 'react';

class Product extends Component {
    formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
    }

    render() {
        const {code, name, url, price, wasPrice, image, brand, type} = this.props.item;
        let isOnSale;
        let wasPriceElement;

        if (!!wasPrice) {
            isOnSale = <span className="product--detail__tag">on sale</span>;
            wasPriceElement = <p className="product--detail__was-price">was {this.formatNumber(wasPrice.value)}</p>;
        }

        return (
            <div className="product col-xs-12 col-sm-6 col-lg-4">
                <div className="product--detail">
                    {isOnSale}
                    <a href={url} className="product--detail__image"><img className="img-responsive" src={"images/" + image} alt={name} /></a>
                    <p className="product--detail__brand">{brand.name}</p>
                    <p className="product--detail__name">{name}</p>
                    <p className="product--detail__price">{this.formatNumber(price.value)}</p>
                    {wasPriceElement}
                </div>
            </div>
        )
    }
}

Product.propTypes = {
    item: PropTypes.object.isRequired
};

export default Product;