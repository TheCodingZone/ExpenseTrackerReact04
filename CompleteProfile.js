import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import './CompleteProfile.css'


const CompleteProfile = (props) => {
  
  const [newDisplayName, setNewDisplayName] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [message,setMessage] = useState(null);
  const[submit,setSubmit]=useState(false);
 
  
 
  const token = useSelector((state) => state.auth.token);
  const updateProfile = () => {
    const apiKey = 'AIzaSyCXWPLAZ6pK9fLCJJ2u-IE4RT2Ymk71Z68';
    const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${apiKey}`;
console.log(token);
    const requestBody = {
      idToken: token,
      displayName: newDisplayName,
      photoUrl: newPhotoUrl,
      returnSecureToken: true,
    };
   

    axios
  .post(apiUrl, requestBody, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((response) => {
    setMessage('User profile updated successfully');
   
    setSubmit(true);
   
    console.log('User profile updated successfully:', response.data);
  })
  .catch((error) => {
    console.error('Error updating user profile:', error.response);
    if (error.response && error.response.data) {
      console.log('Error response:', error.response.data);
      setMessage('Error updating user profile: ' + error.response.data.error.message);
    } else {
      setMessage('Error updating user profile');
    }
  });
  }
  useEffect(() => {
    // Function to fetch user data
    const fetchUserData = () => {
      const apiKey = 'AIzaSyCXWPLAZ6pK9fLCJJ2u-IE4RT2Ymk71Z68'; // Replace with your actual Firebase API key
      const apiUrl = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`;
  
      const requestBody = {
        idToken: token,
      };
  
      axios
        .post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((response) => {
          console.log('User data fetched successfully:', response.data.users[0]);
          // setResponseMessage("DATA FETCHED SUCCESSFULLY")
          setNewDisplayName(response.data.users[0].displayName);
          setNewPhotoUrl(response.data.users[0].photoUrl)
          // Handle the user data as needed
        })
        .catch((error) => {
          console.error('Error fetching user data:', error);
        });
    };

 
    fetchUserData();
  }, [token]); 

  return (

<div>
       <div className='completeProfile'>
         <div className='quote'>Winners never quit, Quitters never win.</div>
         <div className='profile'>Your profile is <b style={{ color: 'red' }}>64%</b> completed. A complete Profile has higher chances of landing a job. Complete Now</div>
        <hr style={{ color: 'black', fontWeight: 'bold' }} />
      </div>
      <div className='form'>
        <h4>Contact Details</h4>
         <form className='formComponant'>
           <label htmlFor='name' style={{ marginRight: '5px' }}>
             <i className='fa-solid fa-user' style={{ marginRight: '5px' }}></i>Username:-
           </label>
           <input type='text' style={{ marginRight: '5px' }} value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)}/>
           <label htmlFor='profileurl' style={{ marginRight: '5px' }}>
             <i className='fa-solid fa-id-badge' style={{ marginRight: '5px' }}></i>Profile Photo Url:-
           </label>
           <input type='text' style={{ marginRight: '5px' }} value={newPhotoUrl} onChange={(e) => setNewPhotoUrl(e.target.value)}/><br />
           
       {
        !submit &&

        <button className='btn btn-danger' style={{ marginRight: '5px' }} onClick={updateProfile}>SUBMIT DETAILS</button>
       }
         {
          submit &&
          <button className='btn btn-primary' style={{ marginRight: '5px' }} onClick={updateProfile}>UPDATE DETAILS</button>
         }
          <div style={{color:'red'}}>{message}</div>
          
         
          
        </form>
        <hr />
        
        
       
      </div>
    </div>
  );
};
 export default CompleteProfile;
