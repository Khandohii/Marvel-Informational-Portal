
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';

import './charSearch.scss';
import { Link } from 'react-router-dom';

const CharSearch = () => {
    const [charName, setCharName] = useState(null);

    return(
        <Formik
            initialValues={{
                name: '',
            }}

            validationSchema={Yup.object({
                name: Yup.string()
                    .min(2, "Minimum length - 2 symbols")
                    .required('This field is required'),
            })}

            onSubmit={(values) => {
                setCharName(values.name)
            }}
        >
            <div className="char__search">
                <div className="char__search__title">Or find a character by name:</div>

                <Form className='form char__search-form'>
                    <div className="form__line">
                        <Field name="name" id="name" className='input' placeholder='Enter name' />

                        <button type='submit' class="button button__main"><div class="inner">FIND</div></button>
                    </div>

                    
                    <ErrorMessage className='error' name='name' component='div'/>
                </Form>

                <CharSearchResult charName={charName}/>
            </div>
        </Formik>
    )
}

const CharSearchResult = (props) => {

    const [char, setChar] = useState(null);
    const [newError, setNewError] = useState(false);
    
    const {loading, error, getCharachterByName, clearError} = useMarvelService();
    
    useEffect(() => {
        updateChar();
    }, [props.charName]);

    const updateChar = () => {
        const {charName} = props;

        if (!charName) {
            return;
        }

        clearError();
        setNewError(false);

        getCharachterByName(charName)
            .then(onCharLoaded)
            .catch(() => {
                setNewError(true);
            })
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setNewError(false);
    }

    const errorMessage = error || newError ? <div className='error'>The character was not found. Check the name and try again</div> : null;
    const spinner = loading ? <div className='green'>Loading...</div> : null;
    const content = !(loading || error || newError || !char) ? <View char={char}/> : null;

    
    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({char}) => {
    const {name, id} = char;
    
    return(
        <div className='result'>
            <span>There is! Visit {name} page?</span>

            <Link to={`/charachters/${id}`} className='button button__secondary' ><div className="inner">TO PAGE</div></Link>
        </div>
    );
}

export default CharSearch;