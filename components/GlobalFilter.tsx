import {IGlobalFilter} from '../interfaces/filter.interface';
import DebounceInput from './Inputs/DebounceInput';
const GlobalFilter = ({
  value,
  onChange,
}:IGlobalFilter) => {
  return (
    <DebounceInput
      extraClass='global'
      value={value ?? ''}
      onChange={onChange}
      placeholder="Search"
    />
  );
};

export default GlobalFilter;
