import {Column, Table} from '@tanstack/react-table';
import React, {FormEventHandler} from 'react';

export interface DebounceInputInterface {
    type?: React.HTMLInputTypeAttribute
    placeholder? :string
    list?: string
    value: string | number
    onChange: (value: string|number )=> void
    debounce?: number
}
export interface TableFilterInterface {

    column: Column<any, unknown>
    table: Table<any>
}

export interface ButtonInterface {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    text: string | JSX.Element
    onSubmit?: FormEventHandler<HTMLButtonElement>
}
