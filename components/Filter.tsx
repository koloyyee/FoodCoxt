import React from 'react';
import {TableFilterInterface} from '../interfaces/global.interface';
import styles from '../styles/Filter.module.css';
import DebounceInput from './DebounceInput';

const Filter:React.FC<TableFilterInterface> =
({column, table}: TableFilterInterface) => {
  const firstValue = table
      .getPreFilteredRowModel()
      .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();


  return typeof firstValue === 'number' ? (
    <div className={styles.numRange}>
      <DebounceInput
        type="number"
        value={(columnFilterValue as [number, number])?.[0] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [
            value,
            old?.[1],
          ])
        }
        placeholder={`Min`}
      />
      <DebounceInput
        type="number"
        value={(columnFilterValue as [number, number])?.[1] ?? ''}
        onChange={(value) =>
          column.setFilterValue((old: [number, number]) => [
            old?.[0],
            value,
          ])
        }
        placeholder={`Max`}

      />
    </div>
  ) : (
    <DebounceInput
      type="text"
      value={(columnFilterValue ?? '') as string}
      onChange={(value) =>
        column.setFilterValue(value)}
      placeholder={`Search...`}
    />
  );
};

export default Filter;
