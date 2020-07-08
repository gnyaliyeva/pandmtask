import React, { useEffect, useState } from 'react';
import { INPUT_JSON } from './utils';
import { Typeahead } from 'react-bootstrap-typeahead';

const Task2 = () => {
    let counter = 0;
    const [options, setOptions] = useState([]);
    const [selectedOption, setSelectedOption] = useState([]);

    const formatter = (label, counter) => { // counter: indent count
        // It converts select option labels for demand format,
        // and updates option state
        let list = [];
        let LABEL = '';

        for (var i=0; i<counter; i++) {
            LABEL += '> ';
        }
        LABEL += label;
        list = options;
        list.push({ label: LABEL.toUpperCase(), value: label })
        setOptions(list)
    }

    const convertObject = (node) => {
        // It converts object nodes as JSON
        let items = {}
        Object.entries(node).map(([key, value]) => { 
            formatter(key, counter)
            if(value.hasOwnProperty('children')) {
                value.children.map(item => {
                    Object.assign(items, item)
                })
            }
        })
        counter += 1; // calculates indent count
        if (Object.keys(items).length) convertObject(items) // this recursive function ends if last node is empty
    }

    useEffect(() => {
        convertObject(INPUT_JSON)
    }, [])
    
    return (
        <div className="col-6 mx-auto mt-5">
            <h4>Task2: <span className="text-primary">Object to JSON</span></h4>
            <Typeahead
                id="task2-options"
                placeholder="Select..."
                options={options}
                onChange={(option) => setSelectedOption(option)}
                value={selectedOption}
            />
            <div className="mt-3">
                <h5>
                    <strong>Your choise: </strong>
                    <span className="text-danger">{selectedOption.length ? selectedOption[0].label : '---'}</span>
                </h5>
            </div>
        </div>
    )
}

export default Task2;