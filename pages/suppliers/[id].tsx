import {GetServerSideProps} from 'next';
import SupplierCard from '../../components/Cards/SupplierCard';
import NavDrawer from '../../components/NavDrawer';
import {SupplierInterface} from '../../interfaces/supplier.interface';
import prisma from '../../lib/prisma';

const Supplier = ({supplier}:{supplier: SupplierInterface}) => {
  return (
    <div className="main">
      <NavDrawer/>
      <div className="container">
        <SupplierCard supplier={supplier} isNew={false} />
      </div>
    </div>
  );
};

export default Supplier;
export const getServerSideProps: GetServerSideProps = async ({params}) =>{
  const data = await prisma.supplier.findUnique({
    where: {
      id: Number(params?.id),
    },
  });
  return {
    props: {
      supplier: data,
    },
  };
};
