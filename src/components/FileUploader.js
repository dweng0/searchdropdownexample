import React from 'react';
import { connect } from 'react-redux';


import {  updateWordArray } from '../actions';
import content from '../locale/translationsource';
const RESULTS_LIMIT = 250;
/**
* takes a string file and breaks it down based on regex, returning an array of objects containing the name of the word and the times it has been used
* @param {string} stringFile the uploaded file
* @return {Object} {name:"", timesUsed:""}
*/
const getWordsFromString = (stringFile) => {
    
    //find words in string by using regex
    const rawWords = stringFile.toLowerCase().split(" ")
    let wordCount = {};
    let words = [];
    
    //have raw words with non alphanumeric characters, handle that here
    rawWords.forEach(raw => {
        raw = raw.trim();
        const strippedWord = raw.replace(/[\W_]+/g,'');
    
        if(strippedWord)
        {
            if(wordCount[strippedWord])
            {
                wordCount[strippedWord]++;
            }
            else
            {
                wordCount[strippedWord] = 1;
                words.push(strippedWord)
            }
        }
    });
    
    const manualSort = (arr) => {
    
        const len = arr.length;
        for (let i = len-1; i>=0; i--){
          for(let j = 1; j<=i; j++){
            if(arr[j-1].timesUsed<arr[j].timesUsed){
                const temp = arr[j-1];
                arr[j-1] = arr[j];
                arr[j] = temp;
             }
          }
        }
        return arr;
    }

    words = words.map((word) => {
        return {
            name: word,
            timesUsed: wordCount[word]
        }
    });
    return manualSort(words);
}

class FileUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            uploadDetails: content.uploadOk
        };

        //load the file into the browser (no server required)
        this.onFileLoaded = (fileAsString, err) => {
            
            if(err) {
                this.setState({uploadDetails: err.message})
                throw err;
            }
            const words = getWordsFromString(fileAsString);

            //check if the object is empty (the user uploaded an empty text file) otherwise update redux
            if(words.length === 0)
            {
                this.setState({uploadDetails: content.uploadWarning});
            }
            else
            {
                let fixedSizeResults = [];
                for(var i = 0; i < RESULTS_LIMIT; i++)
                {
                    if(words[i])
                    {
                        fixedSizeResults.push(words[i]);
                    }
                }

                this.props.updateWordArray(fixedSizeResults)
                this.setState({uploadDetails: content.uploadSuccess + "(Showing " + fixedSizeResults.length +  " results)"});
            }
            var test = [{name: "t", times: 1}, {name: "tdf", times: 10}, {name: "tfd", times: 1}, {name: "dft", times: 100}, {name: "tf", times: 12}]
            test.sort((a, b) =>{return a.times - b.times});
        }

        this.getFile = (event, callback) => {
          
            const reader = new FileReader();

            reader.onload = (event) => {
                
                callback(reader.result);
            };
            reader.onerror = (error) => {
                return callback(null, error);
            }
            if(event.target.files.length > 0)
            {
                reader.readAsText(event.target.files[0])
            }
        }
    }
    render(){
        return(
            <div>
                <input type="file" id="fileElem" multiple accept=".txt" className="visually-hidden"  onChange={ (event) => { this.getFile(event, this.onFileLoaded); }}/>
                <label className="ui button" htmlFor="fileElem">{content.uploadText}</label>
                <p>{this.state.uploadDetails}</p>
            </div>
        );
    }
}


export default connect(null, {updateWordArray})(FileUploader);