import React,{Fragment, useEffect, useState}from 'react'
import {API_KEY,API_URI, IMAGE_URI} from '../../Config'
import {Typography,Row} from 'antd'
import MainImage from './Session/MainImage';
import GridCard from './Session/GridCard';

const {Title} = Typography;

function LandingPage() {
    
    const [Movies,setMovies]=useState([])
    const [currentPage,setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        fetchMovies(endpoint)
       
    }, [])
    const fetchMovies = (path)=>{
        fetch(path)
        .then(res =>res.json())
        .then(res =>{
           console.log(res)
           setMovies([...Movies,...res.results])
           setCurrentPage(res.page)
        })

    }

    const handleClick =()=>{
        const endpoint = `${API_URI}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`
        fetchMovies(endpoint)
    }
    
    return (
        <>
            <div style={{width:'100%',margin:'0'}}>
                {Movies[0]?
                <MainImage 
                    image={`${IMAGE_URI}w1280${Movies[0].backdrop_path}`} 
                    title={Movies[0].original_title}
                    text={Movies[0].overview}
                />:<MainImage/>}
               
             
                <div style={{width:'85%',margin:'1rem auto'}}></div>
                    <Title level={2}>Movies By Latest</Title>
                    <hr/>
                    <Row gutter={[16,16]}>
                        {Movies && Movies.map((movie,index)=>(
                            <React.Fragment key={index}>
                                <GridCard 
                                    image={movie.poster_path && `${IMAGE_URI}w500${movie.poster_path}`}  
                                    movieId={movie.id}></GridCard>
                            </React.Fragment>
                        ))}
                    </Row>
                    <br/>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <button onClick={handleClick}>Load More</button>
                </div>
            
            </div>
        </>
    )
}

export default LandingPage
