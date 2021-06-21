import React from 'react';
import '../styles/sidebar.scss';
import { Link } from 'react-router-dom';
import { ImHome } from 'react-icons/im';
import { BsFillInfoSquareFill } from 'react-icons/bs';
import { RiMessage2Fill } from 'react-icons/ri';
import { BsPersonSquare } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';
import { AiOutlineStock } from 'react-icons/ai';
import { useFirebase } from '../contexts/firebaseContext';
const Sidebar = () => {
  const { user } = useFirebase();
  console.log(user);
  return (
    <nav className='sidebar'>
      <ul>
        <li>
          <Link to='/coins-list'>
            <AiOutlineStock />
            <p>Coin List</p>
          </Link>
        </li>
        <li>
          <Link to='/'>
            <ImHome />
            <p>Home</p>
          </Link>
        </li>
        <li>
          <Link to='/about'>
            <BsFillInfoSquareFill />
            <p>About</p>
          </Link>
        </li>
        <li>
          <Link to='/contact'>
            <RiMessage2Fill />
            <p>Contact</p>
          </Link>
        </li>
        <li>
          {user ? (
            <Link to='/profile'>
              <BsPersonSquare />
              <p>Account</p>
            </Link>
          ) : (
            <Link to='/login'>
              <FiLogIn />
              <p>Login</p>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
