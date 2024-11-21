import createTrip from "../hooks/CreateTrip.hook"
import { useState } from "react"
import Autocomplete from "./Autocomplete.Component";


export const TripForm = () => {
  const [startAddress, setStartAddress] = useState<string>('');
  const [endAddress, setEndAddress] = useState<string>('');
  const [tripDate, setTripDate] = useState<Date | null>(null);

  return (
      <form className='card' onSubmit={(event) => createTrip(event, startAddress, endAddress, tripDate!)}>
        <Autocomplete name="StartAddress" title="Start Address" stateSetter={setStartAddress} id="StartAddress" />
        <Autocomplete name="EndAddress" title="End Address" stateSetter={setEndAddress} id="EndAddress" />
        <div>
          <input type='date' name='date' onChange={e => setTripDate(new Date(e.target.value) )}/>
          <label htmlFor='date'>Date</label>
        </div>
        <button type='submit'>
          Submit
        </button>
    </form>
  )
}