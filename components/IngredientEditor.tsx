/* eslint-disable indent */
import {
    forwardRef,
    memo,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from 'react';

const IngredientEditor = memo(
    forwardRef((props, ref) => {
      const [value, setValue] = useState(props.value);
      const refInput = useRef(null);

      useEffect(() => {
        // focus on the input
        refInput.current?.focus();
      }, []);

      /* Component Editor Lifecycle methods */
       useImperativeHandle(ref, () => {
        return {
          // the final value to send to the grid, on completion of editing
          getValue() {
            // this simple editor doubles any value entered into the input
            // try {
            //     const res = await fetch(`api/ingredients/search/${value}`, {
            //       method: 'POST',
            //       headers: {
            //         'Content-type': 'application/json',
            //       },
            //       body: JSON.stringify(value),
            //     });
            //     const result = await res.json();
            //     console.log(result);
            //     console.log(`api/ingredients/search/${value}`);
            //     ;
            //     return await result.name;
            //   } catch (e) {
            //     console.error(e);
            //   }
              return value;
          },

          // Gets called once before editing starts, to give editor a chance to
          // cancel the editing before it even starts.
          isCancelBeforeStart() {
            return false;
          },

          // Gets called once when editing is finished (eg if Enter is pressed).
          // If you return true, then the result of the edit will be ignored.
          isCancelAfterEnd() {
            // our editor will reject any value greater than 1000
            return value === '';
          },
        };
      });

      return (
        <input
          type="text"
          ref={refInput}
          defaultValue={value}
          onChange={(event) => setValue(event.target.value)}
          style={{width: '100%'}}
        />
      );
    }),
  );
export default IngredientEditor;
