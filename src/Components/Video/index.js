import { Grid } from '@mui/material';
import React from 'react'
import YouTube from "react-youtube";
import './styles.css'

const Video = () => {
    // const videoUrl = "https://www.youtube.com/watch?t=746&v=LRini_YIs2I&feature=youtu.be"
    const videoUrl = "https://www.youtube.com/watch?v=cuMSl6piVXE"

    let videoCode;
  if (videoUrl) {
    videoCode = videoUrl.split("v=")[1].split("&")[0];
  }
  return (
 
         <YouTube
            videoId={videoCode}
            containerClassName="embed embed-youtube"
            // onStateChange={(e) => checkElapsedTime(e)}
            // opts={opts}
          />
  
  )
}

export default Video