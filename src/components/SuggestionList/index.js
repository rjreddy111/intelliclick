import {Link} from 'react-router-dom'

import "./index.css"

const SuggestionList = (props)=> {
    const {details} = props 
    const {name,
       
        cou_name_en
        } = details

return (
        <>
        <Link to ={`/name/${name}`} className='list-style-type-suggestions'>
        <li className='suggestions-list'>
         <p>{name}, {cou_name_en}</p>
         </li>
        </Link>
        </>

)

}



export default SuggestionList
