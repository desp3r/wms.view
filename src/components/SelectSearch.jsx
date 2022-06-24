import React from 'react';
import Select from 'react-select'

const SelectSearch = ({field, form, options}) => {

    const filteredOptions = options ? options.map((value) => ({
        value: value.id,
        label: value.title
    })) : null;

    const onChange = ({value}) => {
        form.setFieldValue(field.name, value)
    }

    return (
        <Select name={field.name}
                closeMenuOnSelect={true}
                options={filteredOptions}
                value={field.value.id}
                onChange={onChange}
                defaultInputValue={"Пошук..."}
                escapeClearsValue={true}
        />
    );
};


export default SelectSearch;