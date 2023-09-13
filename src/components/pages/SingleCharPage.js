
import AppBanner from "../appBanner/AppBanner";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import useMarvelService from "../../services/MarvelService";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import './singleCharPage.scss';

const SingleCharPage = () => {
    const {charId} = useParams();

    const [char, setChar] = useState(null);
    
    const {loading, error, getCharachter, clearError} = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [charId]);

    const updateChar = () => {
        clearError();

        getCharachter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail} = char;

    const styleForNotFound = thumbnail.indexOf('image_not_available') !== -1 ? {objectFit: 'contain'} : null;
    
    return(
        <>  <AppBanner/>
            <div className='single__char'>
                <div className="single__char__thumbnail">
                    <img src={thumbnail} alt={name} style={styleForNotFound} />
                </div>

                <div className="single__char__data">
                    <div className="single__char__name">{name}</div>

                    <div className="single__char__desc">{description}</div>
                </div>
            </div>
        </>
    );
}

export default SingleCharPage;