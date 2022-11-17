import {AgGridReact} from 'ag-grid-react';
import {useState} from 'react';

import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {GetStaticProps} from 'next';
import Link from 'next/link';
import React from 'react';
import AddButton from '../../components/AddButton';
import NavDrawer from '../../components/NavDrawer';
import {IngredientsInterface} from '../../interfaces/ingredient.interface';
import prisma from '../../lib/prisma';

const Read = ({ingredients}:{ingredients: IngredientsInterface[]}) => {
  const [rowData] = useState(ingredients);

  const [columnDefs] = useState([
    {field: 'code'},
    {field: 'name',
      cellRenderer: (params:any) => {
        const id = params.data.id;
        return (
          <Link className='link' href={`/ingredients/${id}`}
          >{params.data.name}</Link>
        );
      },
    },
    {field: 'packingSize'},
    {field: 'price'},
    {field: 'quantity'},
    {field: 'unit.name'},
    {field: 'type.name'},
    {field: 'category.name'},
    {field: 'supplier.name'},
    {headerName: 'Price per Unit($)',
      valueGetter: '(data.price / data.quantity).toFixed(2)',
    },

  ]);

  const defaultColDef = React.useMemo(()=>{
    return {
      sortable: true,
      filter: true,
    };
  }, []);
  return (
    <div className='main'>
      <NavDrawer/>
      <div className="container">
        <div className="ag-theme-alpine"
          style={{height: '80vh', width: '100%'}}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={defaultColDef}
          >
          </AgGridReact>
        </div>
        <AddButton destination='/ingredients/create'/>
      </div>
    </div>
  );
};

export default Read;


export const getStaticProps: GetStaticProps = async ()=>{
  const ingredients = await prisma.ingredient.findMany({
    include: {
      category: true,
      unit: true,
      supplier: true,
      type: true,
    },
  });
  return {
    props: {
      ingredients: JSON.parse(JSON.stringify(ingredients))},
  };
};

