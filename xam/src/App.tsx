 
import UserList from './views/user-list/UserList';

function App() {
  return (
    <div className="App">
      {/* Login */}
       <UserList data-testId= "user-list"/>
    </div>
  );
}

export default App;
