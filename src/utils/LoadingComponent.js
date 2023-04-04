import React from 'react'
import { css } from '@emotion/react';
import RingLoader  from 'react-spinners/RingLoader'


const override = css`
 display: block;
 margin: 0 auto;
 border-color: red;
 width: 500px
`;

const LoadingComponent = () => {
    return (
        <div className='loader' style={{display: "flex", justifyContent: "center"}}>
    <RingLoader color="#36d7b7" loading = {true} css = {override} size={70} />

    </div>
    )
}

export default LoadingComponent
