
import './singleCharacterLayout.scss';

const SingleCharacterLayout = ({data}) => {
    console.log(data);
    const {name, description, thumbnail} = data;
    
    return(
        <div className='single__char'>
            <div className="single__char__thumbnail">
                <img src={thumbnail} alt={name} />
            </div>

            <div className="single__char__data">
                <div className="single__char__name">{name}</div>

                <div className="single__char__desc">{description}</div>
            </div>
        </div>
    );
}

export default SingleCharacterLayout;