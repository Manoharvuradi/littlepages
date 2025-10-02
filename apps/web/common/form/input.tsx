import React from 'react'
import { IInputProps } from '../../utils'

const InputField = ({
  input,
  handleChange,
  formValues,
  tailwindClass
}: IInputProps) => {
    const { id, name, type, value, label } = input;
  return (
    <div
        key={name}
        className={`flex flex-col mb-4 ${tailwindClass ? tailwindClass : ''}`}
      >
        <label htmlFor={label} className="mb-2 font-medium text-gray-700 capitalize">
          {label.replace(/_/g, ' ')}
        </label>
        <input
          id={id || name}
          name={name}
          type={type}
          value={formValues[name] || value || ''}
          onChange={(e) => {
            e.target.value = e.target.value.trimStart();
            handleChange(e);
          }}
          className='border-1 w-full appearance-none rounded px-3 py-2 leading-tight border-gray-300 focus:border-primary-blue'
        />
    </div>
  )
}

export default InputField
