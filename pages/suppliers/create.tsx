import SupplierCard from '../../components/Cards/SupplierCard';
import NavDrawer from '../../components/NavDrawer';

const emptyState = {
  id: '',
  name: '',
  email: '',
  phone: '',

};

const CreateSupplier = () => {
  return (
    <div className="main">
      <NavDrawer/>
      <div className="container">
        <SupplierCard supplier={emptyState} isNew={true} />
      </div>
    </div>
  );
};

export default CreateSupplier;

