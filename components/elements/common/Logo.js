import React from 'react';
import Link from 'next/link';

const Logo = ({ type }) => {
    let data;
    if (type === 'autopart') {
        data = {
            url: '/home/autopart',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else if (type === 'technology') {
        data = {
            url: '/home/technology',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else if (type === 'electronic') {
        data = {
            url: '/home/electronic',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else if (type === 'furniture') {
        data = {
            url: '/home/furniture',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else if (type === 'organic') {
        data = {
            url: '/home/organic',
            img: 'uploads/logo_c467de82f7.jpg',
        };
    }
    else {
        data = {
            url: '/',
            img: 'http://localhost:1337/uploads/thumbnail_logo_c467de82f7.jpg?width=654&height=318',
        };
    }
    return (
        <Link href={data.url}>
            <a className="ps-logo">
                <img src={data.img} alt="" />
            </a>
        </Link>
    );
};

export default Logo;
