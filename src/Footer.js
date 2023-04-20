import React from 'react'
import Avatar from '@mui/material/Avatar';

export default function Footer() {
    return (
        <React.Fragment>
            <div style={{ textAlign: 'center', margin: 0, padding: 0, fontSize: '0.8rem', bottom: '5%', left: '45%' }}>
                <Avatar sx={{ display: 'inline-block', width: 24, height: 24 }} alt='Saran' src='Admin.png'></Avatar> <a href='https://saranchinmaip.github.io/CV/' rel="noreferrer" target='_blank'>Saran Chinmai.P</a>
            </div>
        </React.Fragment>
    )
}
