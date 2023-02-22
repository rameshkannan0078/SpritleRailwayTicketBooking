import videosrc from '../../Assets/bgvideo.mp4';

function VideoBackGroundMainPage(){
    return(  
     <>
  <video id="home" autoPlay loop playsInline muted style={{ width: "100%", height: "100%", background: " linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5))" }}>
          <source src={videosrc} />
        </video>

     </>
      

    );

}

export default VideoBackGroundMainPage;