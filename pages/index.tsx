import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridReact} from 'ag-grid-react';
import {GetStaticProps, NextPage} from 'next';
import Link from 'next/link';
import React, {useState} from 'react';
import AddButton from '../components/Buttons/AddButton';
import NavDrawer from '../components/NavDrawer';
import {IngredientsInterface} from '../interfaces/ingredient.interface';
import prisma from '../lib/prisma';

const Home:NextPage<{ingredients: IngredientsInterface[]}> = (
    {ingredients}:{ingredients: IngredientsInterface[]}) => {
  const [rowData] = useState(ingredients);

  const [columnDefs] = useState([
    {field: 'code'},
    {field: 'name',
      cellRenderer: (params:any) => {
        const id = params.data.id;
        return (
          <Link className='link' href={`/${id}`}
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
      {/* <Head>
        <title>FoodCoxt</title>
        <meta name="description" content="Earning more by saving more." />
        <link rel="icon" href="/favicon.ico" />
      </Head> */}
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
        <AddButton destination='/create'/>
      </div>
    </div>
  );
};

export default Home;


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

