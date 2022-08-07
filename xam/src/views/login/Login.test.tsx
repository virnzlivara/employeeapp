import { render, screen, fireEvent, cleanup} from "@testing-library/react"
import { Provider } from "react-redux"; 
import { store } from "../../app/store"; 
import { Login } from "./Login"; 

import user from "@testing-library/user-event";

describe("Login", () => { 

    const userCredential = {
        branchId: '10002',
        userName: 'testuser01',
        password: 'pa55w0rd001',
      };

    const Wrapper = ({ children }) => (
        // you could just use your normal Redux store or create one just for the test
        <Provider store={store}>{children}</Provider>
    );
    beforeEach(()=> {
        render(<Login />, { wrapper: Wrapper }); 
    })

    afterEach(cleanup);
    test('login modal should render', ()=> {
        const modal = screen.getByTestId('modal') 
        expect(modal).toBeInTheDocument(); 
    });

    test('Required fields should be displayed', () => { 
        const branchId = screen.getByTestId('branch-id');
        const userName = screen.getByTestId('user-name');
        const password = screen.getByTestId('password');
        expect(branchId).toBeInTheDocument();
        expect(userName).toBeInTheDocument();
        expect(password).toBeInTheDocument();
    });

    test('Required fields should be blank initially', () => { 
        const branchId = screen.getByTestId('branch-id');
        const userName = screen.getByTestId('user-name');
        const password = screen.getByTestId('password');
        expect(branchId.nodeValue).toBe(null);
        expect(userName.nodeValue).toBe(null);
        expect(password.nodeValue).toBe(null);
    });

    test('ErrorWrapper should not be displayed if  all required fields are populated', () => {  
        const branchId = screen.getByTestId('branch-id');
        const userName = screen.getByTestId('user-name');
        const password = screen.getByTestId('password');
        const login = screen.getByTestId('button'); 
        const errorMsg = screen.getAllByTestId('error-message');  
        user.type(branchId, userCredential.branchId);
        user.type(userName, userCredential.userName);
        user.type(password, userCredential.password);
        fireEvent.click(login); 
        expect(errorMsg.length).toBe(0);
    }); 
});