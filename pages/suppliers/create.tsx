import NavDrawer from '../../components/NavDrawer';
import SupplierCard from '../../components/SupplierCard';

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

