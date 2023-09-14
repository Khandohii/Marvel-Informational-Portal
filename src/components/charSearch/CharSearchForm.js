
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import * as Yup from 'yup';

import './charSearchForm.scss';
import { Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, data) => {
    switch (process) {
        case 'waiting':
            return '';

        case 'loading':
            return '';
        
        case 'confirmed':
            return !data ? null : data.length > 0 ?
                <div className="char__search-wrapper">
                    <div className="char__search-success">There is! Visit {data[0].name} page?</div>

                    <Link to={`/charachters/${data[0].id}`} className='button button__secondary' >
                        <div className="inner">TO PAGE</div>
                    </Link>
                </div> :
                <div className="char__search-error">
                    The character was not found. Check the name and try again
                </div>;
        
        case 'error':
            return <div className='char__search-critical-error'><ErrorMessage/></div>;

        default:
            throw new Error('Unexpected process state');
    }
}

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    
    const {getCharachterByName, clearError, process, setProcess} = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = (name) => {

        clearError();

        getCharachterByName(name)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'))
    }

    return(
        <div className='char__search-form'>
            <Formik
                initialValues={{
                    charName: '',
                }}

                validationSchema={Yup.object({
                    charName: Yup.string()
                        .min(2, "Minimum length - 2 symbols")
                        .required('This field is required'),
                })}

                onSubmit={({charName}) => {
                    updateChar(charName)
                }}
            >
                <Form className='form '>
                    <label htmlFor="charName" className="char__search-label">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <Field name="charName" id="charName" type="text" className='input' placeholder='Enter name' />

                        <button type='submit' className="button button__main" disabled={process === 'loading'} ><div className="inner">FIND</div></button>
                    </div>

                    
                    <FormikErrorMessage className='char__search-error' name='charName' component='div'/>
                </Form>
            </Formik>
            {setContent(process, char)}
        </div>
    )
}

export default CharSearchForm;