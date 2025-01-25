import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import {Toaster} from "react-hot-toast";

function App() {

  return (
      <Router>
          <AppRoutes />
          <Toaster
              position="top-right"
              reverseOrder={true}
              toastOptions={{
                  duration: 3000,
                  style: {
                      background: '#333',
                      color: '#fff',
                  },
              }}
          />
      </Router>
  )
}

export default App
