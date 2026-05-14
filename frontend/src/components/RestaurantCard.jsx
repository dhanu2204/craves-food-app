import "./res.css";
import restaurant from "./demo.js"

function RestaurantCard({name , cuisine , rating , image}){
    return(
      
        <div className="Card">
            <img src={image} alt={name} />
            <h2>{name}</h2>
            <div className="desc">
                <p>{cuisine}</p>
                <p className={rating >= 4 ? "rating-green" : "rating-yellow"}>
                    {rating} ★
                </p> 
            </div>
        </div>
    )
}

export default RestaurantCard