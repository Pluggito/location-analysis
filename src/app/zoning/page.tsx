import axios from "axios"


const page = () => {

 const fetchZoningData = async()=>{
 
  try {
    const res = await axios.get(`https://api.nyc.gov/geoclient/v2/address?houseNumber=280&street=RichardStreet`, {
      headers: {
        "Cache-Control": "no-cache",
        "Ocp-Apim-Subscription-Key": "1c30f4154d9641bf8fe3dea3de4ca490"
      }
    }
    )
    const data = res.data
    console.log(data)
    
  } catch (error) {
    
  }
 }

  return (
    <div>Hey i am here</div>
  )
}

export default page