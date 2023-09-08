
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);
    
    const {loading, error, getCharachter, clearError} = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        const {charId} = props;

        if (!charId) {
            return;
        }

        clearError();

        getCharachter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton />;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    
    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics, id} = char;

    const styleForNotFound = thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'contain'} : null;
    
    return(
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={styleForNotFound} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? null : 'There is no comics with this character'}
                {   
                    <ComicsListByChar charId={id}/>
                }
            </ul>
        </>
    );
}

const ComicsListByChar = ({charId}) => {
    const comicsMaxLength = 10;
    const [comicsList, setComicsList] = useState([]);

    const {loading, error, getComicsByCharId} = useMarvelService();

    useEffect(() => {
        onRequest(charId);
    }, []);

    const onRequest = (charId) => {
        getComicsByCharId(charId)
            .then(onComicsListLoaded)
    }

    const onComicsListLoaded = (comicsList) => {
        setComicsList([...comicsList]);
    }

    function renderItems(items) {
        const comics = items.map((item, i) => {
            if (comicsMaxLength <= i) return false;
    
            return(
                <li key={i} className="char__comics-item">
                    <Link to={`/comics/${item.id}`}>{item.title}</Link>
                </li>
            )
        })

        return comics;
    }

    const items = renderItems(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {items}
        </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number,
}

export default CharInfo;