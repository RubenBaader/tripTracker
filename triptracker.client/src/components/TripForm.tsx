import submitForm from "./SubmitForm"
import { useState } from "react"

export const TripForm = () => {
  const [startAddress, setStartAddress] = useState<string>('');
  const [endAddress, setEndAddress] = useState<string>('');
  const [tripDate, setTripDate] = useState<Date | null>(null);


  return (
      <form className='card'>
      <div>
        <input name='StartAddress' onChange={e => setStartAddress(e.target.value)} />
        <label htmlFor='StartAddress'>Start Address</label>
      </div>
      <div>
        <input name='EndAddress' onChange={e => setEndAddress(e.target.value)} />
        <label htmlFor='EndAddress'>End Address</label>
      </div>
      <div>
        <input type='date' name='date' onChange={e => setTripDate(new Date(e.target.value) )}/>
        <label htmlFor='date'>Date</label>
      </div>
      <button type='submit' onClick={() => submitForm(startAddress, endAddress, tripDate!)} />
    </form>
  )
}