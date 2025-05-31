import React, { useId, forwardRef } from 'react';

const Select = (
    { options, label, className = '', ...props },
    ref
) => {
    const id = useId();
    return (
        <div className="w-full">
            {label && (
                <label htmlFor={id} className="block mb-1 text-sm text-white">
                    {label}
                </label>
            )}
            <select
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg border border-dashed border-[#0099ff] bg-black text-[#baabf2] outline-none
          focus:bg-gray-700 duration-200 w-full ${className}`}
                {...props}
            >
                {options?.map((option) => (
                    <option key={option} value={option}>
                        {option[0].toUpperCase() + option.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default forwardRef(Select);
