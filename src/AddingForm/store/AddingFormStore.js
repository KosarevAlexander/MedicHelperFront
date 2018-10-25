import {observable, action} from 'mobx';

class AddingFormStore {
    @observable chipsList = [];

    @action addChips = (data) => {
        this.chipsList.push({
            key: this.chipsList.length,
            label: data
        })
    };

}

export default AddingFormStore;
