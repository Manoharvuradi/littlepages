import React from 'react'
import { IInputProps } from '../../utils'

const InputField = ({
  input,
  handleChange,
  formValues,
  tailwindClass,
  liveCount,
}: IInputProps) => {
    const { id, name, type, value, label, liveCountMax } = input;
  return (
    <div
        key={name}
        className={`flex flex-col mb-4 ${tailwindClass ? tailwindClass : ''}`}
      >
        <label htmlFor={label} className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5 ml-1">
          {label.replace(/_/g, ' ')} {liveCount && formValues[name] ? `(${formValues[name].length}/${input.liveCountMax})` : ''}
        </label>
        <input
          id={id || name}
          name={name}
          type={type}
          value={formValues[name] || value || ''}
          onChange={(e) => {
            // Create a new event with trimmed value
            const trimmedValue = e.target.value.trimStart();
            const modifiedEvent = {
              ...e,
              target: {
                ...e.target,
                name: e.target.name,
                value: trimmedValue,
              },
            };
            handleChange(modifiedEvent as React.ChangeEvent<HTMLInputElement>);
          }}
          maxLength={liveCount ? liveCountMax : undefined}
          className='w-full h-11 px-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#009FFF] focus:bg-white focus:border-transparent outline-none transition-all text-sm font-medium'
        />
    </div>
  )
}

export default InputField