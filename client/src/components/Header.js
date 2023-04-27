import React from 'react';
import banner from '../assets/images/project-3-header.png';

export default function Header() {

    return (

        <div>
            <div className="header content-section-heading text-center">
            <img src={banner} alt="Responsive image" width="1500" className="img-fluid" />
            </div>
        </div>

    );
}