import CardFeatures from "./CardFeatures";



function Features(){
    return(
      <div style={{maxHeight:'80%',marginTop:'70px' } } id="features">
      <h1 style={{ fontFamily: "Arial, sans-serif", textAlign:'center', fontWeight: "bold", textShadow: "2px 2px 4px #ffff",color:'gray',padding:'10px' }}>Our Valuable Features will Make Customer Charm </h1>
      <CardFeatures></CardFeatures>
      </div>  
  
    );
}

export default Features;