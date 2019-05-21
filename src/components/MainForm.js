import React, {Component} from 'react';
import HighLightText from './HighLightText'
import CalculateSpeed from './CalculateSpeed';
// import {connect} from 'react-redux';
// import * as formAction from '../action/action';

class MainForm extends Component{
  constructor() {
    super();
    this.state={
      allContent:'',
      userInput:'',
      second:0,
      symbolCount:0,
      startTimer:false,
      endTimer:false
    }
  }
  componentDidMount(){
    this.getContent()
  }
  getContent=()=>{
    const getAllContent = async ()=>{
      try{
          const response = await fetch('https://www.randomtext.me/api/')
          if (!response.ok) throw Error(response.statusText);

          const allData= await response.json()
          this.setState({allContent:allData})
      } catch(error){
        console.log(error)
      }
    }
    getAllContent();
  }
  
  onChangeUserInput=(event)=>{
    const input = event.target.value
    this.setTimer()
    this.finishTimer(input)
    this.setState({userInput:input,
      symbolCount: this.getCorrectSymbolsCount(input)
    })
  }

  getCorrectSymbolsCount=(input)=>{
    let count = 0;
    const text = this.stripHtmlTags(this.state.allContent.text_out)
    const userInput = input.replace(' ','').split('')
    for(let i = 0;i<userInput.length;i++){
      if(userInput[i] === text[i]){
        count = count+1;
      }
    }
    return count
  }

  onResetClick=(event)=>{
    this.setState({userInput:'',
      symbolCount:'',
      startTimer:false,
      second:0,
      endTimer:false,
    })
    clearInterval(this.interval)
  }
  stripHtmlTags(str){
    if ((typeof str === 'undefined')|| (str===null) || (str==='')){
        return [];
    }
    else{
        str = str.toString();
    }
    return str.replace(/<[^>]+>/g, '').replace(' ','')
  }
  setTimer=()=>{
    if(!this.state.startTimer){
      this.setState({startTimer:true})
      this.interval = setInterval(()=>{
        this.setState((prevState)=>{
          return {second: prevState.second + 1}
        })
      },1000)
    }
  }
  finishTimer=(input)=>{
    const text = this.stripHtmlTags(this.state.allContent.text_out)
    if(input === text){
      clearInterval(this.interval)
      this.setState({endTimer:true})
    }
  }
  handleKeyPress=(event)=>{
    // if(event.key === ' '){
    //   this.setState({userInput:''});
    // }
  }
  
  render(){
    return(
      <div style={sectionStyle}>
        <h1>React TypeRacer App</h1>
        <HighLightText userInput={this.state.userInput} allcontent={this.state.allContent}/>
        <div ><textarea style={textAreaStyle} placeholder='Start typing...' value={this.state.userInput} onChange={this.onChangeUserInput} onKeyPress={this.handleKeyPress} readOnly={this.state.endTimer}/></div>
        <ul style={ulStyle}>
          <li>Speed: <CalculateSpeed seconds={this.state.second} symbolCount={this.state.symbolCount} /></li>
          <li>Timer: {this.state.second}</li>
        </ul>
        <button onClick={this.onResetClick}>Reset</button>


      </div>
    )
  }
}
const sectionStyle={
  display:'flex',
  justifyContent: 'center',
  marginTop:'50px',
  alignItems:'center',
  flexDirection: 'column'
}
const textAreaStyle={
  width:'700px',
  border: '1px solid',
  height:'25px',
  margin:'10px',
  padding:'10px',
  fontSize:'21px'
}
const ulStyle = {
  listStyleType:'none'
}
// function mapStatesToProps(state){
//   return{};
// }
// function dispatchStatesToProps(dispatch){
//   return{}
// }
// export default connect(mapStatesToProps, dispatchStatesToProps)(MainForm);
export default MainForm
