import React from 'react';
import {render} from 'react-dom';

class ContactForm extends React.Component{
	
	render (){
		return(
			<div className="todoListMain">
			  <div className="header">
				<form onSubmit={this.props.addItem}>
				  <input ref={this.props.textValue} className="form-control" placeholder="Enter Info">
				  </input>
				  <button type="submit" className="btn btn-info">Add</button>
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
			if(item.isDone){
			  return <li key={item.key} className="bg-primary done">{item.text}<a className="doneButton" href="#" onClick={() => this.props.markAsDone(item.key)}>Done</a></li>
			}else{
				return <li key={item.key} className="bg-primary">{item.text}<a className="doneButton" href="#" onClick={() => this.props.markAsDone(item.key)}>Done</a></li>				
			}
		}	
		var listItems = todoEntries.map(createTasks,this);
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
		this.markAsDone = this.markAsDone.bind(this);	
		if(localStorage.getItem('items')!=null){
			
			this.state={items: JSON.parse(localStorage.getItem('items'))};
			console.log(this.state);
		}else{
			this.state={items: []};
		}
	}
	markAsDone(key){
        var index = this.state.items.map(function(d){
            return d.key;
        }).indexOf(key);	
		this.state.items[index].isDone=true;
		this.setState({items:this.state.items});
		localStorage.setItem('items',JSON.stringify(this.state.items));

	}	
	addItem(e) {
		var itemArray = this.state.items;
		itemArray.push(
		{
			isDone:false,
			text:this.textInput.value,
			key:Date.now(),
			
		}
		);
		this.setState({items:itemArray});
		localStorage.setItem('items',JSON.stringify(itemArray));
		this.textInput.value= "";
		e.preventDefault();
	}	
  render () {
	  var text="To do List";
    return (
		<div>
		<p>{text}</p>
		<ContactForm addItem={this.addItem} textValue={(input=>this.textInput=input)}/>
		<TodoItems markAsDone={this.markAsDone} entries={this.state.items}/>

		</div>
	);
  }
}

render(<App/>, document.getElementById('app'));