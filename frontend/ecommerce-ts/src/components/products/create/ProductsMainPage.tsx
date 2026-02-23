import CreateProductProvider from '../../../context/CreateProductProvider'
import CreateProduct from './CreateProduct'

const ProductsMainPage = () => {
    return (
        <CreateProductProvider>
            <CreateProduct />
        </CreateProductProvider>
    )
}

export default ProductsMainPage