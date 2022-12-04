import {Column, Table} from '@tanstack/react-table';
import React, {FormEventHandler} from 'react';

export interface IDebounceInput {
    type?: React.HTMLInputTypeAttribute
    placeholder? :string
    list?: string
    value: string | number
    onChange: (value: string|number )=> void
    debounce?: number
    extraClass?: string
}
export interface ITableFilter {

    column: Column<any, unknown>
    table: Table<any>
}

export interface IButton {
    onClick?: React.MouseEventHandler<HTMLButtonElement>
    text: string | JSX.Element
    onSubmit?: FormEventHandler<HTMLButtonElement>
}
