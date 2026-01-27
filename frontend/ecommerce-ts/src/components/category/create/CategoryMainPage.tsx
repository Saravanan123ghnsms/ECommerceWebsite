import CreateCategoryProvider from '../../../context/CreateCategoryProvider'
import CreateCategory from './CreateCategory'

const CategoryMainPage = () => {
    return (
        <CreateCategoryProvider>
            <CreateCategory />
        </CreateCategoryProvider>
    )
}

export default CategoryMainPage