import React from 'react';
import Select, { Creatable, Async } from 'react-select';
import AsyncSelect from 'react-select/lib/Async';
import NumberFormat from 'react-number-format';
import classNames from 'classnames';
import Switch from 'react-switch';
import DayPicker from '../DayPicker';
import FileUploader from '../FileUploader/FileUploader';
import DatePicker from "react-date-picker";
import _ from "lodash";


export const renderField = ({
                                input, placeholder, type, meta: { touched, error },
                            }) => {
    const invalid = touched && error;
    return (
        <div>
            <input
                {...input}
                placeholder={placeholder}
                type={type}
                className={classNames('form-control', { 'is-invalid': invalid })}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderTextArea = ({
                                   input, placeholder, rows, meta: { touched, error },
                               }) => {
    const invalid = touched && error;
    return (
        <div>
      <textarea
          {...input}
          placeholder={placeholder}
          style={{ resize: 'none' }}
          rows={rows || 3}
          className={classNames('form-control', { 'is-invalid': invalid })}
      />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderCM2 = ({
                                 input, decimalScale, placeholder, meta: { touched, error }, prefix="", suffix="cm2", numberFormat,
                             }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                placeholder={placeholder}
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={decimalScale || 0}
                format={numberFormat}
                fixedDecimalScale
                value={input.value}
                thousandSeparator
                prefix={prefix}
                suffix={suffix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderNumber = ({
                                 input, decimalScale, placeholder, meta: { touched, error }, prefix="", suffix="",
                                 numberFormat, onCambio, disabled
                             }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                placeholder={placeholder}
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={decimalScale || 0}
                format={numberFormat}
                fixedDecimalScale
                disabled={disabled}
                value={input.value}
                thousandSeparator
                prefix={prefix}
                suffix={suffix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                    if(!!onCambio){
                        onCambio(values.floatValue)
                    }
                }}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderCurrency = ({
                                   input, meta: { touched, error }, prefix="Q ", placeholder,
                               }) => {
    const invalid = touched && error;
    return (
        <div>
            <NumberFormat
                className={classNames('form-control', { 'is-invalid': invalid })}
                decimalScale={2}
                fixedDecimalScale
                placeholder={placeholder}
                value={input.value}
                thousandSeparator
                prefix={prefix}
                onValueChange={(values) => {
                    input.onChange(values.value);
                }}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderSwitch = ({
                                 input, meta: { touched, error }, label, disabled,
                             }) => {
    const invalid = touched && error;
    return (
        <div className="d-flex align-items-center">
            <Switch
                onColor="#007bff"
                height={18}
                width={36}
                disabled={disabled}
                onChange={(value) => {
                    input.onChange(value);
                }}
                checked={input.value ? input.value : false}
                // id="normal-switch"
            />
            &nbsp;{label}
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </div>
    );
};

export const renderFieldCheck = ({ input, label, value, disabled, type, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <div className="checkbox c-checkbox">
                <label className="needsclick">
                    <input
                        type="checkbox"
                        disabled={disabled}
                        {...input}
                        checked={input.value}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    {label}&nbsp;
                    <span className="fa fa-check ml-2" />
                </label>
            </div>
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const renderFieldRadio = ({ input, label, value, disabled, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <React.Fragment>
            <div className="radio c-radio c-radio-nofont d-flex">
                <label className="font-weight-bold">
                    <input
                        type="radio"
                        disabled={disabled}
                        {...input}
                        className={classNames('', { 'is-invalid': invalid })}
                    />
                    {label}&nbsp;
                    <span />
                </label>
            </div>
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const SelectField = (
    {
        input,
        disabled,
        isClearable,
        isMulti,
        isSearchable,
        options,
        placeholder,
        is_departamentos,
        labelKey="label",
        valueKey="value",
        meta: { touched, error }
    }) => {

    const invalid = touched && error;
    const _options = [];
    if (is_departamentos){
        {Object.keys(options).forEach((option, index) => {
            _options.push({...option, label: options[option], value: option})
        })}
    } else {
        options.forEach(option => {
            _options.push({...option, label: option[labelKey], value: option[valueKey]});
        });
    }
    console.log('valor input', input.value)
    console.log('input', input)
    let value = input;
    if (value !== null && value !== undefined) {
        value = _.find(_options, {value});
    }
    return (
        <React.Fragment>
            <Select
                isClearable={isClearable}
                className={classNames('react-select-container', { 'is-invalid': invalid })}
                backspaceRemovesValue={false}
                isMulti={isMulti}
                isSearchable={isSearchable}
                options={_options}
                placeholder={placeholder}
                onChange={(e) => { 
                    value = e[valueKey]
                    console.log('evento', input)
                    input.onChange(e ? e[valueKey] : null); }}
               
                isDisabled={disabled}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};
export const SelectMulti = (
    {
        input,
        disabled,
        isClearable,
        isMulti,
        isSearchable,
        options,
        placeholder,
        labelKey="label",
        valueKey="value",
        meta: { touched, error }
    }) => {

    const invalid = touched && error;
    const _options = [];

    {options.forEach((option) => {
        _options.push({...option, label: option.nombre, value: option.id})
    })}
    let value = input.value;
    if (value !== null && value !== undefined) {
        value = _.find(_options, {value});
    }
    return (
        <React.Fragment>
            <Select
                isClearable={isClearable}
                className={classNames('react-select-container', { 'is-invalid': invalid })}
                backspaceRemovesValue={false}
                isMulti={isMulti}
                isSearchable={isSearchable}
                options={options}
                placeholder={placeholder}
                onChange={(e) => { input.onChange(e ? e[valueKey] : null); }}
                value={input.value}
                isDisabled={disabled}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const renderNoAsyncSelectField = ({ input, prerequisitos_list,  clearable, disabled, options, valueKey,isMulti, labelKey, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div>
            <Select clearable={clearable} disabled={disabled} value={input.value} className={classNames('form-control p-0 select-reset', { 'is-invalid': invalid })}
                   isMulti={ isMulti }
                   onChange={(e) => { 
                        input.onChange(e ? e : null); 
                    }}
                    classNamePrefix="react-select"
                   cache={false} placeholder="Escriba para buscar"
                   key={valueKey}
                   defaultOptions
                   options={ options }
                   defaultOptions
                   searchPromptText="Escriba para buscar" />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
}; 

export const AsyncSelectField = ({
    input,
    disabled,
    isClearable,
    isSearchable,
    loadOptions,
    placeholder,
    valueKey,
    labelKey,
    meta: { touched, error }
}) => {
    const invalid = touched && error;

    return (
        <React.Fragment>
            <AsyncSelect
                isClearable={isClearable}
                cacheOptions
                className={classNames('react-select-container', { 'is-invalid': invalid })}
                backspaceRemovesValue={false}
                isSearchable={isSearchable}
                defaultOptions
                loadOptions={loadOptions}
                placeholder={placeholder}
                onChange={(e) => { input.onChange(e ? e : null); }}
                value={input.value}
                isDisabled={disabled}
                getOptionValue={(option) => (option[valueKey])}
                getOptionLabel={(option) => (option[labelKey])}
            />
            {invalid && (
                <div className="invalid-force">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};

export const CreatableSelectField = (
    {
        input,
        disabled,
        isClearable,
        isSearchable,
        options,
        placeholder,
        labelKey="label",
        valueKey="value",
        meta: { touched, error }
    }) => {

    const invalid = touched && error;
    const _options = [];
    options.forEach(option => {
        _options.push({...option, label: option[labelKey], value: option[valueKey]});
    });

    return (
        <React.Fragment>
            <Creatable
                isClearable={isClearable}
                className={classNames('react-select-container', { 'is-invalid': invalid })}
                backspaceRemovesValue={false}
                isSearchable={isSearchable}
                options={_options}
                placeholder={placeholder}
                onChange={(e) => { input.onChange(e ? e : null); }}
                value={input.value}
                isDisabled={disabled}
            />
            {invalid && (
                <div className="invalid-feedback">
                    {error}
                </div>
            )}
        </React.Fragment>
    )
};


/**
 * @param photo: este parametro se usa para tener la imagen previa de una imagen en dado caso el formulario es
 * usado para una actualizacion, se espera que sea la ruta donde se encuentra la imagen
 * @param setFile
 * @param className
 * @param disabled
 * @param input
 * @param touched
 * @param error
 * */
export const renderFilePicker = ({photo, setFile, className, disabled, input, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <FileUploader
                disabled={disabled}
                img= {!!photo ? photo : null}
                onFileChange={(e, file) => {
                    file = file || e.target.files[0];
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        input.onChange(reader.result);
                        if (!!setFile) {
                            setFile(file);
                        }
                    };
                    reader.readAsDataURL(file);
                }} />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderDayPicker = ({className, disabled, maxDate, minDate, input, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <DayPicker
                disabled={disabled}
                maxDate={maxDate}
                minDate={minDate}
                onChange={e => input.onChange(e)}
                value={input.value}
            />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const renderDatePicker = ({className, disabled, maxDate, minDate, input, meta: { touched, error } }) => {
    const invalid = touched && error;
    return (
        <div className={classNames(`${className}`, { 'is-invalid': invalid })}>
            <DatePicker
                onChange={e => input.onChange(e)}
                disabled={disabled}
                maxDate={maxDate}
                minDate={minDate}
                value={input.value}
            />
            {invalid && <div className="invalid-feedback">
                {error}
            </div>}
        </div>
    )
};

export const RenderField = {
    renderField,
    renderTextArea,
    renderNumber,
    renderCurrency,
    renderSwitch,
    renderFieldCheck,
    renderFieldRadio,
    renderCM2,
    renderNoAsyncSelectField
};
