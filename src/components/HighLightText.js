import React, {Component} from 'react';

class HighLightText extends Component{
    constructor(props){
        super(props)
    }

    stripHtmlTags(str){
        if ((typeof str === 'undefined')|| (str===null) || (str==='')){
            return [];
        }
        else{
            str = str.toString();
        }
        return str.replace(/<[^>]+>/g, '').split('')
    }
    
    render(){    
        let allContent = this.stripHtmlTags(this.props.allcontent.text_out)
        return(
            <div style={divStyle}>
                {
                    allContent.map((eachletter,index)=>{
                        let colorStyle;
                        if(index < this.props.userInput.length){
                            colorStyle = (eachletter === this.props.userInput[index]) ? '#dfffa0' : '#fcbea4';
                        }
                        return <span key={index} style={{background:colorStyle}}>{eachletter}</span>
                    })
                }

            </div>
        )
    }
}
const divStyle={
    width:'700px',
    border: '1px solid',
    height:'400px',
    margin:'10px',
    padding:'5px',
    fontSize:'18px'
}
export default HighLightText