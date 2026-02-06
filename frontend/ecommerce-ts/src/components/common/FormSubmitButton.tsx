
type buttonType = {
    title: string,
    onClick?: (e: any) => any
    onClick2?: (e: React.MouseEvent<HTMLButtonElement>, id?: string) => void,
}

const FormSubmitButton = ({ onClick2, title }: buttonType) => {
    return (
        <button type="submit" className='py-3 px-4 bg-blue-950 text-white rounded cursor-pointer'>
            {title}
        </button>
    )
}

export default FormSubmitButton