import React, { useEffect,useState } from 'react';
import axios from 'axios'
import {Button} from 'antd'

function Favourite(props) {
    const [favNumber,SetfavNumber]=useState(0)
    const [fav,setFav] = useState(false)
    const variable = {
        userFrom:props.userFrom,
        movieId:props.movieId,
        movieTitle:props.movieInfo.original_title,
        movieImage:props.movieInfo.backdrop_path,
        movieRunTime:props.movieInfo.runtime
    }
    useEffect(()=>{
        
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

    const handleClick =()=>{
        if(fav){
            axios.post('/api/favourite/removefromfavourite',variable)
            .then(response=>{
                if(response.data.success){
                    SetfavNumber(favNumber-1)
                    setFav(!fav)
                }else{
                    alert("Failed to remove Favourite")
                }
            })

        }else{
            axios.post('/api/favourite/addtofavourite',variable)
            .then(response=>{
                if(response.data.success){
                    SetfavNumber(favNumber+1)
                    setFav(!fav)
                }else{
                    alert("Failed to add to Favourite")
                }
            })
        }
    }
    return (
        
    <Button onClick={handleClick}>{fav?"Remove from Favourite":"Add to Favourite"} {favNumber}</Button>
        
    )
}

export default Favourite
