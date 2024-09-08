import {Link} from "react-router-dom"

import "./index.css"

const StatesList = (props)=> {
    const {details} = props 
    const {name,
        population
        ,timezone,
        cou_name_en
        } = details
 

    return (

       
        <li className="state-list-container">
           
                  <div className="staes-column">
                  <Link to ={`/name/${name}`} className="link-style">  
                  <p className="each-row">{name}</p>
                  </Link>
                </div>
                <div className="staes-column">
                  <p className="each-row">{cou_name_en}</p>
                </div>
                <div className="staes-column">
                  <p className="each-row">{timezone}</p>
                </div>
                <div className="staes-column">
                  <p className="each-row">{population}</p>
                </div>
              
                </li>
     
    )
}



export default StatesList