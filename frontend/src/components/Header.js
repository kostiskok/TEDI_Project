import React from "react";
import {Navbar, Container, NavDropdown} from 'bootstrap';

function Header() {

    const myModal = document.getElementById('myModal')
    const myInput = document.getElementById('myInput')

    myModal.addEventListener('shown.bs.modal', () => {
    myInput.focus()
    })


  return(

    <div>
    <div className="bg-primary">
        <nav class="nav nav-pills flex-column flex-sm-row">
            <div className="d-flex justify-content-start">
                <a class="nav-link text-dark " href="/">AirBnb</a>
            </div>
            <div className="d-flex justify-content-start flex-sm-fill">
                <a class="nav-link text-dark flex-sm-fill" href="/rooms/">Rooms</a>
            </div>
            <div className="d-flex justify-content-end">
                {/* <a class="nav-link text-dark flex-sm-fill" href="#">Login</a> */}
                <button className="btn btn-primary" id="login">Login</button>
            </div>
            <div className="d-flex justify-content-end">
                <a class="nav-link text-dark flex-sm-fill" href="/register/">Register</a>
            </div>
        </nav>
    </div>

    <div class="modal" tabindex="-1">
    <div class="modal-dialog">
    <div class="modal-content">
        <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
        <p>Modal body text goes here.</p>
        </div>
        <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
        </div>
    </div>
    </div>
    </div>

    </div>

    
    );
}

export default Header;
