
type buttonType = {
    title: string,
    onClick?: (e: any) => any
}

const Button = ({ title, onClick }: buttonType) => {
    return (
        <button className='py-3 px-4 bg-blue-950 text-white rounded cursor-pointer' onClick={onClick}>
            {title}
        </button>
    )
}

export default Button