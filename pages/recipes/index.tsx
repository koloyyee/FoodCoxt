import NavDrawer from '../../components/NavDrawer';

const Recipes = () => {
  return (
    <div className='main'>
      <NavDrawer/>
        Create recipe card input.
      <br/>
        General info tab
        food ingredient cost by product name
        subtotal
        input total
        output total
        total cost
        serving size
      <br/>
        Operation cost
        labour cost per min
        Actual time
      <br/>
        Product cost = food cost per serving + labour per serving.
    </div>
  );
};

export default Recipes;
