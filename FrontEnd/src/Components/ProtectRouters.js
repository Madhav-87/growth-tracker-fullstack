import {Navigate} from 'react-router-dom';
const ProtectRouters=({element})=>{
    const token=localStorage.getItem('token');
    return token?element:<Navigate to="/"/>
}
export default ProtectRouters;