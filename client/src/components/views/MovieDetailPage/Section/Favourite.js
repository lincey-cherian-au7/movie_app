import Axios from 'axios'
import React, { useEffect,useState } from 'react';
import axios from 'axios'
import {Button} from 'antd'

function Favourite(props) {
    const [favNumber,SetfavNumber]=useState(0)
    const [fav,setFav] = useState(false)
    useEffect(()=>{
        const variable = {
            userFrom:props.userFrom,
            movieId:props.movieId,
            movieTitle:props.movieInfo.original_title,
            movieImage:props.movieInfo.backdrop_path,
            movieRunTime:props.movieInfo.runtime
        }
        axios.post('/api/favourite/favouriteNumber',variable)
            .then(response=>{
                if(response.data.success){
                    SetfavNumber(response.data.FavouriteNumber)
                }else{
                    alert('Failed to get Favourite Number')
                }
            })
        axios.post('/api/favourite/favourite',variable)
        .then(response=>{
            if(response.data.success){
                setFav(response.data.favourite)
            }else{
                alert('Failed to get Favourite Info')
            }
        })
    },[])
    
    return (
        
    <Button >{fav?"Remove from Favourite":"Add to Favourite"} {favNumber}</Button>
        
    )
}

export default Favourite
