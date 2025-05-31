import React, { forwardRef, useId } from 'react'

const Input = forwardRef(
    ({
        label,
        type = 'text',
        placeholder,
        className = '',
        ...props
    }, ref) => {
        const id = useId();
        return (
            <div className="w-full">
                {
                    label &&
                    <label
                        className="inline-block mb-1 pl-1"
                        htmlFor={id}
                    >
                        {label}
                    </label>
                }
                <input
                    type={type}
                    placeholder={placeholder}
                    className={`mx-3 max-w-[60%] px-3 py-2 rounded-lg bg-transparent text-[#baabf2] outline-none focus:bg-[#010102]
                        duration-200 border border-[#0099ff] w-full ${className}`}
                    {...props}
                    ref={ref}
                    id={id}
                />
            </div>
        )
    }
)
export default Input
