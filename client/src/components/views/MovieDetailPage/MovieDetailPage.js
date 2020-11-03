import { Button, Descriptions,Row} from 'antd';
import React, { useEffect, useState } from 'react'
import { API_KEY, API_URI,IMAGE_URI } from '../../Config'
import MainImage from '../LandingPage/Session/MainImage';
import GridCard from '../LandingPage/Session/GridCard';

function MovieDetailPage(props) {
    const [movie,setMovie] = useState([])
    const [crews,setCrew] = useState([])
    const [Toggle,SetToggle]= useState(false)

    useEffect(()=>{
        const movieId = props.match.params.movieId
        fetch(`${API_URI}movie/${movieId}?api_key=${API_KEY}&language=en-US`)
        .then(response =>response.json())
        .then(response=>{
            
            setMovie(response)
            fetch(`${API_URI}movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
            .then(res =>res.json())
            .then(res=>{
                console.log(res)
                setCrew(res.cast)
            })
        
        
        })
    },[])
    const handleClick =()=>{
        SetToggle(true)
    }
    return (
        <div>
            {movie?
                <MainImage 
                    image={`${IMAGE_URI}w1280${movie.backdrop_path}`} 
                    title={movie.original_title}
                    text={movie.overview}
                />:<MainImage/>}

            <div style={{ width: '85%', margin: '1rem auto' }}>

                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button>Add to Favourite</button>
                </div>

                <Descriptions title='Movie Info' bordered>
                    <Descriptions.Item label="Title">{movie.original_title}</Descriptions.Item>
                    <Descriptions.Item label="release_date">{movie.release_date}</Descriptions.Item>
                    <Descriptions.Item label="revenue">{movie.revenue}</Descriptions.Item>
                    <Descriptions.Item label="runtime">{movie.runtime}</Descriptions.Item>
                    <Descriptions.Item label="vote_average" span={2}>{movie.vote_average}</Descriptions.Item>
                    <Descriptions.Item label="vote_count">{movie.vote_count}</Descriptions.Item>
                    <Descriptions.Item label="status">{movie.status}</Descriptions.Item>
                    <Descriptions.Item label="popularity">{movie.popularity}</Descriptions.Item>
                
                </Descriptions>
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button onClick={handleClick}>Actor View</Button>
                </div>
                {Toggle&&
                    <Row gutter={[16,16]}>
                        {crews && crews.map((crew,index)=>(
                            <React.Fragment key={index}>
                                <GridCard actor image={`${IMAGE_URI}w500${crew.profile_path}`}
                                ></GridCard>
                            </React.Fragment>
                        ))}
                    </Row>
                }
                
            </div>
        </div>
    )
}

export default MovieDetailPage
