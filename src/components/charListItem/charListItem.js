
import './charListItem.scss';

const CharListItem = (props) => {
    const {name, thumbnail} = props;

    const styleForNotFound = thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'contain'} : null;
    return(
        <li className="char__item">
            <img src={thumbnail} alt="abyss" style={styleForNotFound}/>
            <div className="char__name">{name}</div>
        </li>
        // <li className="char__item char__item_selected">
        //     <img src='' alt="abyss"/>
        //     <div className="char__name">Abyss</div>
        // </li>
    )
}

export default CharListItem;