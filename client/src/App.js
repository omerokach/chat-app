import './App.css';
import socketIo from 'socket.io'
const http = require('http');
let server = http.createServer(app);
let io = socketIo(server)

function App() {
  return (
    <div className="App">
      <h1>chat app</h1>
      {io()}
    </div>
  );
}

export default App;
