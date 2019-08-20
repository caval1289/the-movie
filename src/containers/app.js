import React, { Component } from 'react';
import SearchBar from '../components/search-bar';
import VideoList from './video-list';
import VideoDetail from '../components/video-detail';
import Video from '../components/video';
import axios from 'axios';

const API_END_POINT = "https://api.themoviedb.org/3/";
const POPULAR_MOVIES_URL = "discover/movie?language=fr&sort_by=popularity.desc&include_adult=true&include_video=true";
const MOVIE_VIDEO_URL = "append_to-response=videos&include_adult=true"
const API_KEY = "api_key=f125edb004d2ec5a0c02185f605bb05b";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { movieList: {}, currentMovie: {} }
    }

    componentWillMount() {
        this.initMovies();
    }

    initMovies() {
        axios.get(`${API_END_POINT}${POPULAR_MOVIES_URL}&${API_KEY}`).then(function (respons) {
            this.setState({ movieList: respons.data.results.slice(1, 6), currentMovie: respons.data.results[0] },function(){
                this.applyVideoTOCurrentMovie();
            });
        }.bind(this));
    }
    applyVideoTOCurrentMovie() {
        
        axios.get(`${API_END_POINT}movie/${this.state.currentMovie.id}?${API_KEY}&append_to_response=videos&include_adult=true`).then(function (respons) {
           console.log('', respons);
           const youtubeKey = respons.data.videos.results[0].key;
           let newCurrentMovieState = this.state.currentMovie;
           newCurrentMovieState.videoId=youtubeKey;
           this.setState({currentMovie:newCurrentMovieState});
           console.log('',newCurrentMovieState);
           
        }.bind(this));
    }
    render() {
        const renderVideoList = () => {
            if (this.state.movieList.length >= 5) {
                return (
                    <VideoList movieList={this.state.movieList} />
                )
            }
        }
        return (
            <div>
                <SearchBar />
                <Video videoId={this.state.currentMovie.videoId}/>
                {renderVideoList()}
                <VideoDetail title={this.state.currentMovie.title} description={this.state.currentMovie.overview} />
            </div>
        )
    }

};

export default App;
