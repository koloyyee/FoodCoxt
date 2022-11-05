/* eslint-disable require-jsdoc */

import {
  ColumnDef, FilterFn, flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel, getSortedRowModel,
  SortingState, useReactTable
} from '@tanstack/react-table';
import {useRouter} from 'next/router';
import {GetStaticProps} from 'next/types';
import React from 'react';
import {FiArrowDown, FiArrowUp} from 'react-icons/fi';
import AddButton from '../../components/AddButton';
import DebounceInput from '../../components/DebounceInput';
import Filter from '../../components/Filter';
import NavDrawer from '../../components/NavDrawer';
import {IngredientsInterface} from '../../interfaces/ingredient.interface';
import prisma from '../../lib/prisma';
import styles from '../../styles/Table.module.css';


const Ingredients = ( {ingredients}:{ingredients:IngredientsInterface[]}) => {
  const [data] = React.useState(()=>[...ingredients]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState('');
  const router = useRouter();


  const columns = React.useMemo<ColumnDef<IngredientsInterface>[]>(()=> [
    {
      header: 'Ingredients Database',
      columns: [
        {
          accessorKey: 'code',
          header: ()=> <span>Code</span>,
        },
        {
          accessorKey: 'name',
          header: ()=> <span>Title</span>,
        },
        {
          accessorKey: 'category.name',
          header: ()=> <span>Category</span>,
        },
        {
          accessorKey: 'supplier.name',
          header: ()=> <span>Supplier</span>,
        },
        {
          accessorKey: 'packingSize',
          header: ()=> <span>Packing</span>,
        },
        {
          accessorFn: (row) => `$${(row.price).toFixed(2)}`,
          sortingFn: (rowA, rowB)=> Number(rowA) > Number(rowB)? 1: -1,

          header: 'Price',
        },
        {
          accessorKey: 'quantity',
          header: ()=> <span>Quant.</span>,
        },
        {
          accessorKey: 'unit.name',
          header: ()=> <span>Unit</span>,
        },
        {
          accessorFn: (row) => `$${(row.price/ row.quantity).toFixed(2)}`,
          header: '$/U',
        },

      ],
    },
  ], []);

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    // Rank the item
    const search = String(value).toLowerCase();
    const column = String(row.getValue<string>(columnId));
    return column.toLowerCase().includes(search);

    // Store the itemRank info
    // addMeta({
    //   itemRank,
    // })
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    // globalFilterFn: fuzzyFilter,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,

  });

  const rowLinkHandler = (path : string) =>{
    router.push(path);
  };

  return (
    <div className='main'>
      <NavDrawer/>
      <div>
        <DebounceInput
          value={globalFilter ?? ''}
          onChange={(value) => setGlobalFilter(String(value))}
          placeholder="Search all columns..."
        />

      </div>
      <table className={styles.table}>
        <thead>
          {table.getHeaderGroups().map((headerGroup)=>(
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) =>(
                <th className={styles.head} key={header.id}>
                  {header.isPlaceholder?
                    null:(
                      <>
                        <div {...{
                          className: header.column.getCanSort()?
                        'cursor-point select-none': '',
                          onClick: header.column.getToggleSortingHandler()}}>
                          {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                          )}{{
                            asc: <FiArrowUp/>,
                            desc: <FiArrowDown/>,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                        {header.column.getCanFilter()? (
                        <>
                          <Filter column = {header.column} table ={table}/>
                        </>
                      ): null}
                      </>
                    )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row)=>(

            <tr className={styles.tr} onClick={()=>
              rowLinkHandler(`/ingredients/${row.original.id}`)} key={row.id}>

              {row.getVisibleCells().map((cell)=>(


                <td className={styles.cell} key={cell.id}>
                  {flexRender(cell.column.columnDef.cell,
                      cell.getContext())}
                </td>
              ))}
            </tr>

          ))}
        </tbody>
      </table>
      <AddButton destination='/ingredients/create'/>
    </div>
  );
};

export default Ingredients;

export const getStaticProps: GetStaticProps = async ()=>{
  const ingredients = await prisma.ingredient.findMany({
    include: {
      category: true,
      unit: true,
      supplier: true,
    },
  });
  return {
    props: {
      ingredients: JSON.parse(JSON.stringify(ingredients))},
  };
};

