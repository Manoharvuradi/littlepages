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
        <label htmlFor={label} className="mb-2 text-xs font-medium text-gray-700 capitalize">
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
  className='shadow border border-gray-300 rounded-lg px-1.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-blue-500 transition'
/>
    </div>
  )
}

export default InputField
