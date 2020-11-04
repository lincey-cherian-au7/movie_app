import Axios from 'axios'
import React ,{useEffect,useState}from 'react'
import './FavouritePage.css'
import {Popover,Button} from 'antd'
import { IMAGE_URI } from '../../Config'

function FavouritePage() {
    const [Favorites, setFavorites] = useState([])
    const [Loading, setLoading] = useState(true)
    const variables ={
        userFrom:localStorage.getItem('userId')
    }

    useEffect(()=>{
        fetchFavoredMovie()
    },[])

    const fetchFavoredMovie = ()=>{
        Axios.post('/api/favourite/getfavouriteMovies',variables)
        .then(res=>{
            if(res.data.success){
                console.log(res.data.doc)
                setFavorites(res.data.doc)
                setLoading(false)
                
            }else{
                alert('Failed to get favourite videos')
            }
        })

    }
    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        Axios.post('/api/favourite/removefromfavourite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoredMovie()
                } else {
                    alert('Failed to Remove From Favorite')
                }
            })
    }
    
    const tableContent = Favorites.map((m,index)=>{
        const content =(
            <div>
               {m.movieImage ?
                    <img src={`${IMAGE_URI}w500${m.movieImage}`} />
                    : "no image"}
            </div>
        )
        return<tr key={index}>
            <Popover content={content} title={`${m.movieTitle}`}>
                <td>{m.movieTitle}</td>
            </Popover>
            <td>{m.movieRunTime} mins</td>
            <td><Button onClick={() => onClickDelete(m.movieId, m.userFrom)}>Remove</Button></td>

        </tr>
        
    })
    return (
        <div style={{width:'85%',margin:'3rem auto'}}>
            
            <h3>My Favourite Movies</h3>
            <hr/>
            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie Run Time</th>
                        <th>Remove from Favourite</th>
                    </tr>
                </thead>
                <tbody>{tableContent}</tbody>
            </table>
            
        </div>
    )
}

export default FavouritePage
