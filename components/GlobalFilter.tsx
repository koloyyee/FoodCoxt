
const GlobalFilter = (
    {filter, setFilter}: {filter: string, setFilter:(value:any)=>void}) => {
  return (
    <span>
        Search: {' '}
      <input
        value = {filter || ''}
        onChange={(e)=> setFilter(e.target.value)} />
    </span>
  );
};

export default GlobalFilter;
