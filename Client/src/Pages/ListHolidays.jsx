import { useEffect, useState } from "react"
// import Holiday from "../../../Server/models/Holiday";

const ListHolidays = () => {
  const [holidays, setHolidays] = useState([])
  const [updateCount, setUpdateCount] = useState(0)


  useEffect(() => {
    fetch("/api/listholidays")
      .then(
        (data) => data.json()
      )
      .then(
        (parsedData) => setHolidays(parsedData)
      );
  }, [updateCount]);

  const deleteHoliday = (id) => {
    const deleteHolidayId = async () => {
      // const res = await Holiday.findByIdAndDelete(id)
      try {
      const res = await fetch('http://localhost:3000/remove/'+String(id), {
        method: 'DELETE'
      })
      // setUpdateCount(updateCount+1)
      setHolidays(holidays.filter((holiday)=>!(holiday._id === id)))
    } catch (error) {
      console.log(error)
      res.send(error)
    }
    }
    return deleteHolidayId
  }

  const toggleCelebrated = (id, celebrated) => {
    const updateHolidayID = async () => {
      const res = await fetch("http://localhost:3000/holidays/"+String(id), {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({celebrated: String(!celebrated) })
      })
      console.log(JSON.stringify({"celebrated": String(!celebrated) }))
      setUpdateCount(updateCount+1)
    }

    return updateHolidayID
  }

  return (
    <div className="container">
      <h1>Holidays! Celebrate!</h1>
      <table border="1">
        <tbody>
          {holidays.map((holiday) => {
            return (
              <tr key={holiday._id}>
                <td> {holiday.name} <input type="checkbox" onClick={toggleCelebrated(holiday._id, holiday.celebrated)} checked={holiday.celebrated}></input><button onClick={deleteHoliday(holiday._id)}>Delete</button> <button>Edit</button> </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  ); // end return

  // return (
  //   <>
  //   <p>{holidays}</p>
  //   </>

  // )
}

export default ListHolidays