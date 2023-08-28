
import { Component } from 'react';
import './charList.scss';
import MarvelService from '../../services/MarvelService';
// import abyss from '../../resources/img/abyss.jpg';
import CharListItem from '../charListItem/charListItem';

class CharList extends Component {
    state = {
        chars: [],
    }

    marvelService = new MarvelService();

    componentDidMount() {
        this.updateChars();
    }

    onCharLoaded = (chars) => {
        this.setState({
            chars: chars,
        })
    }

    updateChars = () => {
        this.marvelService
            .getAllCharachters()
            .then(this.onCharLoaded)
    }
    
    render() {
        const {chars} = this.state;
        console.log(chars);

        const elements = chars.map(item => {
            const {id, ...itemProps } = item;

            return(
                <CharListItem
                    key={id}
                    {...itemProps}
                />
            )
        })

        return (
            <div className="char__list">
                <ul className="char__grid">
                    {elements}
                </ul>
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;