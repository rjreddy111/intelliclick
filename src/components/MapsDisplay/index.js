import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from "leaflet";
import 'leaflet/dist/leaflet.css';


import "./index.css"


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
  });



const MapsDisplay = ({details})=> {
    const {lat,lon} = details
    console.log(details)

    return (
        <MapContainer center={[lat, lon]} zoom={5} className='maps-conatiner'>
        <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lon]}>
            <Popup>
                Weather Location
            </Popup>
        </Marker>
    </MapContainer>
    )
}


export default MapsDisplay