import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, navigateToNextPage, navigateToPrevPage } from '../Redux/Slices/productSlice';
import { Col, Row, Card,  Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Header from '../Components/Header'

function Home() {
  const dispatch = useDispatch()
  const {allProducts,loading,error,productsPerPage,currentPage} = useSelector(state=>state.productReducer)
  const totalPages = Math.ceil(allProducts?.length/productsPerPage)
  const lastProductIndex = currentPage * productsPerPage
  const firstProductIndex = lastProductIndex - productsPerPage
  const visibleProductsCard = allProducts?.slice(firstProductIndex,lastProductIndex)
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  const handlePrevPage = ()=>{
    if(currentPage!=1){
      dispatch(navigateToPrevPage())
    }
  }
  const handleNextPage = ()=>{
    if(currentPage!=totalPages){
      dispatch(navigateToNextPage())
    }
  }
  return (
    <>
      <Header insideHome/>
      <div style={{paddingTop:'100px'}}>
        {
          loading?<div className='mt-5 text-center'> <Spinner className='me-2' animation="border" variant="info" /> Loading.... </div>:
          <Row className='m-5'>
           { 
           allProducts?.length>0?visibleProductsCard?.map((product,index)=>(
            <Col key={index} className='mb-5 ' sm={12} md={6} lg={4} xl={3} >
                <Card className='shadow' style={{ width: '18rem' }}>
                    <Card.Img variant="top" height={'200px'} src={product?.thumbnail} />
                    <Card.Body>
                      <Card.Title>{product?.title.slice(0,20)}...</Card.Title>
                      <div className='text-center'><Link to={`/view/${product?.id}`} className="btn btn-link">View More</Link></div>
                    </Card.Body>
                </Card>
            </Col>
           )) :<div className='fw-bolder text-danger text-center mt-5 mb-5 fs-4'> Product Not found!!! </div>
           }
          </Row>
        }
        <div className="d-flex justify-content-center mt-5">
            <span onClick={handlePrevPage} style={{cursor:'pointer'}} > <i className="fa-solid fa-backward me-2"></i> </span>
            <span className='fw-bolder '> {currentPage} of {totalPages} </span>
            <span onClick={handleNextPage} style={{cursor:'pointer'}} > <i className="fa-solid fa-forward ms-2"></i> </span>
        </div>
      </div>
    </>
  )
}

export default Home