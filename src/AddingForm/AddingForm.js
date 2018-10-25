import React, {Component, Fragment} from 'react';
import {observer} from 'mobx-react';
import AddingChips from './components/AddingChips/AddingChips'
import Button from '@material-ui/core/Button';
import AddingFormStore from './store/AddingFormStore'
import PropTypes from 'prop-types';
import style from './style.m.less';

@observer
class AddingForm extends Component{
    constructor(props){
        super(props);
        this.state = {

        };

        this.store = new AddingFormStore();
    }

    render() {
        console.log(this.props)
        return <Fragment>
            <div className={style.main}>
                <AddingChips store={this.store}/>
                <div>
                    <Button variant="contained" color="primary" onClick={this.props.onBack}>
                        Вернуться
                    </Button>
                </div>
            </div>
        </Fragment>
    }
}

AddingForm.propTypes = {
    onBack: PropTypes.func
};

export default AddingForm;