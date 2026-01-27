
type buttonType = {
    title: string,
    onClick?: (e: any) => any
}

const FormSubmitButton = ({ title }: buttonType) => {
    return (
        <button type="submit" className='py-3 px-4 bg-blue-950 text-white rounded cursor-pointer'>
            {title}
        </button>
    )
}

export default FormSubmitButton