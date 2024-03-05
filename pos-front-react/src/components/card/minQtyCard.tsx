interface ProductProps{
    image:string,
    description:string,
    name:string
}

function MinQtyCard (props:ProductProps){


     return(
         <>
             <div className="card" >
                 <img src={props.image} className="card-img-top" alt="..."/>
                     <div className="card-body">
                         <h5 className="card-title">{props.name}</h5>
                         <p className="card-text">{props.description}</p>
                     </div>
             </div>
         </>
     );



}

export default MinQtyCard;