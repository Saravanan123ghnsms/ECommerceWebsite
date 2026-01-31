
type buttonType = {
    title: string,
    type?: string,
    onClick?: (e: any) => any
}

const Button = ({ title, onClick, type }: buttonType) => {
    return (
        <button className={`${type === 'list-create-category' && "text-sm"} py-3 px-4 bg-blue-950 text-white rounded cursor-pointer`} onClick={onClick}>
            {title}
        </button>
    )
}

export default Button