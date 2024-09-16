import { dawaAutocomplete } from "dawa-autocomplete2/dist/js/dawa-autocomplete2.js"
import "./Autocomplete.Style.css"

function autocomplete(elementId : string, stateFunc: (s : string) => void) : string | void {
    dawaAutocomplete(document.getElementById(elementId), {
      type: "adgangsadresse",
      fuzzy: "true",
      select: function(selected : any) {
        // console.log('Valgt adresse: ' + selected.tekst);
        return stateFunc(selected.tekst);
      }
    })
  }

interface AutocompleteProps {
  stateSetter : (input : string) => void,
  id : string,
  name : string,
  title : string
}

const Autocomplete = (props : AutocompleteProps) => {
    return (
        <div className="autocomplete-container">
          <input name={props.name} type="search" id={props.id} onChange={() => autocomplete(props.id, props.stateSetter)}  />
          <label htmlFor={props.name}>{props.title}</label>
        </div>
    )
}

export default Autocomplete;