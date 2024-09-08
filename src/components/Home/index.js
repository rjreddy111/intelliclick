import {Component} from "react"
import {BsSearch} from "react-icons/bs"
import {TailSpin} from "react-loader-spinner"
import { FcGenericSortingAsc,FcGenericSortingDesc  } from 'react-icons/fc';


import StatesList from "../StatesList"
import SuggestionList from "../SuggestionList"

import "./index.css"


class Home extends Component {

  state = {
    fetchdata : [],
    loading: false,
    offSet :0 , 
    hasMoreToFetch : true ,
    searchedInput:"",
    searchResults:[],
    scrollpostion:0 , 
  }


         

    
  
 
  

 componentDidMount() {
    this.getData()

    window.addEventListener("scroll", this.handleScroll)

 }

 componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll)

 }

 onChnageSearchInput = (event)=> {
    const searchKey = event.target.value 


    const {fetchdata} = this.state 
    const searchedresult = fetchdata.filter((eachData)=> 
        eachData.name.toLowerCase().includes(searchKey.toLocaleLowerCase())
        )
   this.setState({searchedInput:event.target.value, 
    searchResults:searchedresult
   }, this.getData

) 
     
 }

 handleScroll = () => {
   
    const { innerHeight } = window;
    const { scrollY } = window;
    const { offsetHeight } = document.documentElement;
    
    if (innerHeight + scrollY >= offsetHeight - 100 && !this.state.loading) {

        this.setState({scrollpostion:window.scrollY}, this.getData)
     
    }
  };


 getData = async()=> {
    const {offSet,hasMoreToFetch,fetchdata,loading,searchedInput} = this.state 

    if (!hasMoreToFetch || loading) return; 

    this.setState({ loading: true })
   
    const limit = 20
   console.log(searchedInput)
    const url = `https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=${limit}&offset=${offSet}`
    console.log(url,searchedInput)
   
    const response = await fetch (url) 
    const data = await response.json()
  

    try {
        if (data.results.length >0) {
            this.setState({
                fetchdata: [...fetchdata,...data.results], 
                offSet:offSet + limit, 
                loading:false ,
              
            },
          ()=>window.scrollTo(0,this.state.scrollpostion)
        );


        } 
        else {
            this.setState({hasMoreToFetch:false, loading:false})

        }
    }
    catch (error) {
        console.log("Failed to fetch details")
        this.setState({loading:false})
    }
   
    
 }

 getSuggestions = ()=> {
    const {searchResults} = this.state 
    return (
        <ul className="suggestions-list-contsiner">
            {searchResults.map((eachData)=> (
                <SuggestionList key ={eachData.geoname_id} details = {eachData} />
            ))}
        </ul>
    )

 }

 ascendingOrder = ()=> {
    const {fetchdata} = this.state 
    const ascending = [...fetchdata].sort((a,b)=> a.name.toLocaleLowerCase()> b.name.toLocaleLowerCase() ? 1: -1,)
    this.setState({fetchdata:ascending})
    console.log(ascending)
 }

 descendingOrder = ()=> {
    const {fetchdata} = this.state 
    const descending = [...fetchdata].sort((a,b)=> a.name.toLocaleLowerCase()> b.name.toLocaleLowerCase() ?  -1 : 1, )
    this.setState({fetchdata:descending})
    console.log(descending)
 }


    render(){
        const {fetchdata,searchedInput,loading,searchResults,scrollpostion} = this.state
   
        console.log(`scroll: ${scrollpostion}`)
       

        const suggestions = searchResults.length===0 ? "" : this.getSuggestions()
       
        return (
            <div className="main-home-container">
              
                <div className="home-search-input">
                    <div className="search-input-container">
                        <BsSearch height={20} color="#64748b"  />
                        <input
                        type="search"
                        
                        onChange={this.onChnageSearchInput}
                        placeholder="Search the City"
                        className="search-input"
                        />
                    </div>
                   
                </div>
                {searchedInput.length>0 ?suggestions:""}
                
                <div className="state-tables-container">
                    <div className="table-headers">
                        <div className="buttons-container-city-name">
                            <p className="each-column">City Name</p>
                            <button type="button" className="button-style" onClick= {this.ascendingOrder}> <FcGenericSortingAsc size = {12}  /> 
                            </button>
                            <button type="button" className="button-style"  onClick= {this.descendingOrder}>
                            <FcGenericSortingDesc size={12} />
                            </button>
                        </div>
                        <p className="each-column">Country</p>
                        <p className="each-column">Time Zone</p>
                        <p className="each-column">Population</p>

                    </div>
                    <ul className="unordered-list">
                    {fetchdata.map((eachData)=> (
                        <StatesList key = {eachData.geoname_id} details = {eachData} />
                    ))}
                   </ul>
                   {loading && (
                    <div className="loader">
                    <TailSpin />
                    </div>

                  
                   

                   )} 
                   
                           
                        

                       
                       

                </div>
                </div>
          
        )
    }
}



export default Home