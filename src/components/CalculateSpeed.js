import React, {Component} from 'react';

class CalculateSpeed extends Component{
    constructor(props){
        super(props)

    }

    render(){
        let typingSpeed
        if(this.props.symbolCount !==0 && this.props.seconds !== 0){
            typingSpeed = (this.props.symbolCount/5) / (this.props.seconds/60)
            return(
                <span >{Number.isNaN(Math.round(typingSpeed)) === true ? 0 : Math.round(typingSpeed)} wpm</span>
            )
        }
        return null

    }

}
export default CalculateSpeed;
