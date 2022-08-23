import {useState, useEffect} from 'react';

//API 
const api_base = 'http://localhost:3001';


const App = () => {
    //create of couple variables
    const [todos, setTodos] = useState([]); //empty array
    const [popupActive, setPopupActive] = useState(false); //default as false
    const [newTodo, setNewTodo] = useState(""); //add as string

    //get the todo list
        useEffect(() => {
            GetTodos();
            console.log(todos)
        }, []);

        const GetTodos = () => {
             fetch(api_base + '/todos')
                .then(res => res.json())
                .then(data => setTodos(data))
                .catch((err) => console.error("Error: ", err));
        }
    //end of todo list

    //inig click niya mo update siya and tawgon niya tong css nga line if true 
        const completeTodo = async (id) => {
            const data = await fetch(api_base + "/todo/complete/" + id)
                        .then(res=>res.json());
            //set the todos data
            setTodos(todos => todos.map(todo => {
                if (todo._id === data._id){
                    todo.complete = data.complete;
                }
                return todo;
            }))
        }
    //end

    //delete a todo
        const deleteTodo = async (id) => {
            const data = await fetch(api_base + "/todo/delete/" + id, {method: "DELETE"}).then(res => res.json());
            setTodos(todos => todos.filter(todo => todo._id !== data._id));
        }
    //end delete to do

    //add todo
        const addTodo = async () => {
            const data = await fetch(api_base + "/todo/new", 
            {   
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    text: newTodo
                })
            }).then(res => res.json());

            console.log(data,'new data')

            //        old data, new data
            setTodos([...todos, data]);
            setPopupActive(false);
            setNewTodo("");
        }
    //end
    return (
        <div className="App">
            <h1>Welcome, Lynsie</h1>
            <h4>Your Tasks</h4>
    
            <div className='todos'>
                {/* gitawag diri ang variable na gi set nato sa babaw */}
               { todos.map(todo => (
                    <div className={ "todo" + (todo.complete ? " is-complete" : "") } key={todo._id}
                    onClick={() => completeTodo(todo._id)} >
                        <div className='checkbox'></div>
        
                        <div className='text'>{todo.text}</div>
        
                        <div className='delete-todo' onClick={() => deleteTodo(todo._id)}>x</div>
                    </div>
               ))}
            </div>
            <div className="addPopup" onClick={() => setPopupActive(true)}>+</div>
            
            {/* if true then mo gawas ang something modal to create new todo */}
            {popupActive ? (
                <div className="popup">
                    <div className="closePopup" onClick={() => setPopupActive(false)}>x</div>
                    <div className="content">
                        <h3>Add Task</h3>
                        { newTodo }
                        <input type="text" className='add-todo-input' onChange={e => setNewTodo(e.target.value)} value={newTodo} />
                        <div className="button" onClick={addTodo}>Create Task</div>
                    </div>
                </div>
            ) : ''}
        </div>
      );
}
export default App;
