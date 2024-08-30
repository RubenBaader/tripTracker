import { dawaAutocomplete } from "dawa-autocomplete2/dist/js/dawa-autocomplete2.js"
import "./Autocomplete.Style.css"

function component() : void {
    dawaAutocomplete(document.getElementById('dawa-autocomplete-input'), {
      select: function(selected : any) {
        console.log('Valgt adresse: ' + selected.tekst);
      }
    })
  }

const Autocomplete = () => {
    return (
        <div className="autocomplete-container">
          <input type="search" id="dawa-autocomplete-input" onChange={component} />
          <div></div>
        </div>
    )
}

export default Autocomplete;