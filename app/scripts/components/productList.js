import React, {Component, PropTypes} from 'react';
import pickBy from 'lodash.pickby';
import Product from './product';
import Filter from './filter';
import Dropdown from './dropdown';

class ProductList extends Component {
    constructor(props) {
        super(props);

        this.state = { 
            products: props.products,
            checked: {
                5000: 'false',
                10000: 'false',
                15000: 'false',
                20000: 'false'
            }
        };
    }

    containsObject(obj, list) {
        let i;
        for (i = 0; i < list.length; i++) {
            if (list[i] === obj) {
                return true;
            }
        }

        return false;
    }

    productsDiffer() {
        const stateProducts = this.state.products;
        const difference = this.props.products.filter(item => {
            return this.containsObject(item, stateProducts) === false;
        });

        return !!difference.length > 0;
    }

    handlePriceFilterClick(e) {
        const {products} = this.props;
        const value = e.target.value;
        const checked = Object.assign({}, this.state.checked);

        let filteredProducts;

        if (checked[value] === 'false') {
            checked[value] = 'true';

            filteredProducts = products.filter(item => {
                if (value > 15000) {
                    return item.price.value > value-5000; 
                }

                return item.price.value > value-5000 && item.price.value <= value;
            });
            
            const updatedProducts = this.updateProducts(filteredProducts);

            this.setState({checked, products: updatedProducts});
            
        } else {
            checked[value] = 'false';

            this.setState({checked}, this.refilterProducts);
        };
    }

    updateProducts(products) {
        let newProducts = [];
        
        if (this.productsDiffer()) {
            newProducts = this.state.products.concat(products);
        } else {
            newProducts = [].concat(products);
        }

        return newProducts;
    }

    refilterProducts() {
        // Find the selected price filter
        const pickedKeys = pickBy(this.state.checked, function(val) {
            return val === 'true';
        });
        const pickedValuesArray = Object.keys(pickedKeys);

        if (pickedValuesArray.length === 0) {
            // If no filter is selected, display all products
            this.setState({ products: this.props.products });

            return;
        }

        let newProducts;
        let updatedProducts = [];

        for(let i=0; i < pickedValuesArray.length; i++) {
            newProducts = this.props.products.filter(item => {
                if (pickedValuesArray[i] > 15000) {
                    return item.price.value > pickedValuesArray[i]-5000; 
                }

                return item.price.value > pickedValuesArray[i]-5000 && item.price.value <= pickedValuesArray[i];
            });

            newProducts.forEach((current) => {
                updatedProducts.push(current);
            });
        }

        this.setState({ products: updatedProducts });
    }

    render() {
        const items = this.state.products.map((item, index) => {
            return (
                <Product key={index} item={item} />
            )
        });

        const itemCount = items.length;

        // Manual list, not enough time!
        const prices = [
            {
                text: 'Less than 5000',
                value: '5000'
            }, 
            {
                text: '5000 - 10000',
                value: '10000'
            },
            {
                text: '10000 - 15000',
                value: '15000'
            },
            {
                text: '15000 - 20000',
                value: '20000'
            }
        ];

        // Manual list, not enough time!
        const types = [
            {
                text: 'Model Aircraft',
                value: 'Model Aircraft' 
            },
            {
                text: 'Bag',
                value: 'Bag'
            },
            {
                text: 'Dinnerware',
                value: 'Dinnerware'
            },
            {
                text: 'Clothing',
                value: 'Clothing'
            }
        ];

        return (
            <div>
                <div className="row">
                    <div className="col-xs-12">
                        <h1 className="pull-left">Qantas merchandise</h1>
                        <div className="hidden-xs">
                            <div className="pull-right">
                                <Dropdown />
                            </div>
                            <div className="pull-right product__count">
                                {itemCount} items
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-md-3">
                        <Filter title="Price" items={prices} onClick={this.handlePriceFilterClick.bind(this)} />
                        <Filter title="Type" items={types} />
                    </div>

                    <div className="col-xs-12 visible-xs-block">
                        <div className="pull-right">
                            <Dropdown />
                        </div>
                        <div className="pull-left product__count">
                            Showing {itemCount} items
                        </div>
                    </div>
                    
                    <div className="col-xs-12 col-md-9">
                        <div className="product__container row">
                            {items}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ProductList.propTypes = {
    products: PropTypes.array.isRequired
};

export default ProductList;