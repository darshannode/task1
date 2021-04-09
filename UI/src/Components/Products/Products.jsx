// Import Modules
import React, { useState, useEffect } from 'react';
import { Table } from 'reactstrap';
import ReactPaginate from 'react-paginate';

// Services
import Products from './../../Services/Products/Products';

// Components
import Header from './../Common/Header/Header';

function Product() {
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecords, setTotalRecords] = useState(0);
    const [totalPage, setTotalPage] = useState(0);
    const [products, setProducts] = useState([]);
    const productsService = new Products();

    useEffect(() => {
        handleGetProducts();
    })

    const handleGetProducts = async () => {
        let response = await productsService.list({ searchText, currentPage });

        setProducts(response.data.data.rows);
        setTotalRecords(response.data.data.count);
        setTotalPage(response.data.data.count / 10 || 1);
    }

    const handlePageClick = async (data) => {
        let selected = data.selected;

        setCurrentPage(selected);
    }

    useEffect(() => { handleGetProducts(); }, [currentPage])

    useEffect(() => { handleGetProducts(); }, [searchText])

    return (
        <React.Fragment>
            <Header />

            <div className="container-fluid p-5">
                <div className="row">
                    <div className="offset-md-9 col-md-3 offset-sm-6 col-sm-6 col-12">
                        <div className="form-group">
                            <input type="text" className="form-control" onChange={(event) => setSearchText(event.target.value)} placeholder="Search" />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 mb-2">Showing {totalRecords} records</div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Table borderless hover>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Barcode</th>
                                    <th>Brand</th>
                                    <th>Price</th>
                                    <th>Available</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((productObj, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{productObj?.name ? productObj?.name : '-'}</td>
                                                <td>{productObj?.barcode ? productObj?.barcode : '-'}</td>
                                                <td>{productObj?.brand ? productObj?.brand : '-'}</td>
                                                <td>{productObj?.price ? productObj?.price : 0}</td>
                                                <td>{productObj?.available ? 'Yes' : 'No'}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                        <div className="text-align-right">
                            <ReactPaginate
                                previousLabel={'Previous'}
                                nextLabel={'Next'}
                                breakLabel={'...'}
                                breakClassName={'break-me'}
                                pageCount={totalPage}
                                marginPagesDisplayed={2}
                                pageRangeDisplayed={5}
                                onPageChange={handlePageClick}
                                containerClassName={'pagination'}
                                activeClassName={'active'}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Product;