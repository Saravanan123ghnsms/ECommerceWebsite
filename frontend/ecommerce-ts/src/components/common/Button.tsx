import React from 'react'

type buttonType = {
    title: string
}

const Button = ({ title }: buttonType) => {
    return (
        <button className='py-3 px-4 bg-blue-950 text-white rounded cursor-pointer'>
            {title}
        </button>
    )
}

export default Button