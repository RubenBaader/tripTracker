import './App.css'

function App() {
  return (
    <>
      <h1>Hi mom</h1>
      <form className='card'>
        <div>
          <input name='address-name' />
          <label htmlFor='name'>Address name</label>
        </div>
        <div>
          <input name='address-line' />
          <label htmlFor='address-line'>Address Line</label>
        </div>
        <div>
          <input type='date' name='date' />
          <label htmlFor='date'>Date</label>
        </div>
        <input type='submit' />
      </form>
    </>
  )
}

export default App
