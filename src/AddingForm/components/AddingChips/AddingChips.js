import React,{ Component, Fragment } from 'react';
import {observer} from 'mobx-react';
import Chip from '@material-ui/core/Chip';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import style from './style.m.less';

@observer
class AddingChips extends Component{
    constructor(props) {
        super(props);
        this.state = {
            newChips: [],
            input: undefined
        };

        this.store = props.store;
    }

    onSelect = (event) => {
        const { target: { value } } = event;
        this.setState({ input: value })
    };

    onAdd = () => {
        const { newChips, input } = this.state;
        if(input){
            console.log(input)
            newChips.push({
                text: input
            });
            this.setState({newChips});
        }
    };

    renderChips = () => {
        const { newChips } = this.state;
        return newChips.map((i, index) => {
            return <Chip key={index} label={`${i.text}`} color="primary" variant="outlined" />
        });
    };

    render() {
        const { input } = this.state;
        console.log(this.state)
        return <Fragment>
            <div>
                <Input onBlur={this.onSelect} />
            </div>
            <div>
                <Button variant="contained" color="primary" onClick={this.onAdd}>
                    Добавить
                </Button>
            </div>
            <div>
                {this.renderChips()}
            </div>
        </Fragment>
    }
}

AddingChips.propTypes = {
    store: PropTypes.object
};

export default AddingChips;
