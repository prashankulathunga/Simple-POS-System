import '../../App.css'

interface DefaultCardData{
    thumbnail:string,
    title:string,
    description:string,
    value:number | undefined,
    code:number
}

function DefaultCard(props:DefaultCardData){

    const {thumbnail, title, description, value, code} = props;

    return(

        <>
            <div className="card mb-3" key={code}>
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={thumbnail} className="img-fluid rounded-start" alt={title}/>
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                            <p className="card-text"><small className="text-body-secondary" style={{fontSize:'24px', fontWeight: 'bold'}}>{value}</small></p>
                        </div>
                    </div>
                </div>
            </div>

        </>


    );

}

export default DefaultCard;