
import {useState, useEffect} from 'react'
import { useNavigate } from "react-router-dom";


function CreateHolidayForm() {
    const [message, setMessage] = useState("blank");
    const [countries, setCountries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      const fetchCountries = async () => {
        const req = await fetch("/api/countries");
        const data = await req.json();
        setCountries(data);
      };
      fetchCountries();
    }, []);
    
    const handleSubmit = (event) => { // handle submit event
      event.preventDefault();
      const data = Object.fromEntries(new FormData(event.target));
      console.log(data)

      data.celebrated = data.celebrated === "on";

  
      fetch("/api/holidays", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          if (data.msg) {
          setMessage(data.msg);
        } else {
          setMessage("OK");
          navigate("/holidays");
        }
        });
    };      
  
    return (
      <form method="post" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label>
            Name:
            <input name="name" required />
          </label>
          <br />
          <label>
            Celebrated:
            <input name="celebrated" type="checkbox" />
          </label>
          <br />
          <label>
            Likes:
            <input name="likes" type="number" />
          </label>
          <br />
          <label>
            Description:
            <textarea name="description"></textarea>
          </label>
          <br />
          <label>
            Country:{" "}
            <select name="country">
            <option value="">--Please choose an option--</option>
            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
          </label>
          <br />
          <button>Create Holiday</button>
        </fieldset>
        <p>{message}</p>
      </form>
    );
  }
    
  export default CreateHolidayForm;
  