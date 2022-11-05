import {GlobalFilterInterface} from '../interfaces/filter.interface';
import DebounceInput from './DebounceInput';
const GlobalFilter = ({
  value,
  onChange,
}:GlobalFilterInterface) => {
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
