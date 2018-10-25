import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ReactDOM from 'react-dom';
import AddingForm from './AddingForm/AddingForm'
import style from './style.m.less';

class App extends Component{

    constructor(props) {
        super(props);

        this.state = {
            isAdding: false
        }
    }

    renderForm = () => {
        return <AddingForm onBack={this.onToggle}/>;
    };

    onToggle = () => {
        this.setState({ isAdding: !this.state.isAdding });
    };


    render(){
        const { isAdding } = this.state;

        if (isAdding) {
            return this.renderForm();
        }

        return <div id="body">
            <div className={style.main}>
                <div className={style.header}>Выбирай</div>
                <div className={style.button}>
                    <Button variant="contained" color="primary">
                        Найти
                    </Button>
                </div>
                <div className={style.button}>
                    <Button variant="contained" color="primary" onClick={this.onToggle}>
                        Завести
                    </Button>
                </div>
            </div>
        </div>
    }
}

ReactDOM.render(<App />, document.getElementById('root'));