import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import {AgGridReact} from 'ag-grid-react';
import {GetStaticProps} from 'next';
import Link from 'next/link';
import {useMemo, useState} from 'react';
import AddButton from '../../components/AddButton';
import NavDrawer from '../../components/NavDrawer';
import {SupplierInterface} from '../../interfaces/supplier.interface';
import prisma from '../../lib/prisma';

const Suppliers = ({suppliers}:{suppliers: SupplierInterface[] }) => {
  const [rowData] = useState(suppliers);
  const [columnDefs] = useState([
    {field: 'name',
      cellRenderer: (params:any) => {
        const id = params.data.id;
        return (
          <Link className='link' href={`/suppliers/${id}`}
          >{params.data.name}</Link>
        );
      }},
    {field: 'email'},
    {field: 'phone'},
  ]);
  const defaultColDef = useMemo(()=>{
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
        <AddButton destination='/suppliers/create'/>
      </div>
    </div>
  );
};

export default Suppliers;

export const getStaticProps : GetStaticProps = async ()=>{
  const res = await prisma.supplier.findMany();

  return {
    props: {
      suppliers: JSON.parse(JSON.stringify(res)),
    },
  };
};

