import React from 'react';
import {render} from 'react-dom';

class ContactForm extends React.Component{
	
	render (){
		return(
			<div className="todoListMain">
			  <div className="header">
				<form onSubmit={this.props.addItem}>
				  <input ref={this.props.textValue} placeholder="Enter Info">
				  </input>
				  <button type="submit" >add</button>
				</form>
			  </div>
			</div>
		);
	}
	
}
class TodoItems extends React.Component{
	
	render (){
		var todoEntries = this.props.entries;
		function createTasks(item) {
		  return <li key={item.key}>{item.text}</li>
		}	
		var listItems = todoEntries.map(createTasks);
		return (
			<ul>
				{listItems}
			</ul>
		);
	}
	
}
class App extends React.Component {
	constructor(props){
		super(props);
		this.addItem = this.addItem.bind(this);	
		this.state={items: []};
	}
	addItem(e) {
		var itemArray = this.state.items;
		itemArray.push(
		{
			text:this.textInput.value,
			key:Date.now()
		}
		);
		this.setState({items:itemArray});
		this.textInput.value= "";
		console.log(this.state);
		e.preventDefault();
	}	
  render () {
	  var text="To do List";
    return (
		<div>
		<p>{text}</p>
		<ContactForm addItem={this.addItem} textValue={(input=>this.textInput=input)}/>
		<TodoItems entries={this.state.items}/>

		</div>
	);
  }
}

render(<App/>, document.getElementById('app'));