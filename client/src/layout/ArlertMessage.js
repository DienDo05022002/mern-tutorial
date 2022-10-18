import React from 'react'
import Alert from 'react-bootstrap/Alert'

const ArlertMessage = ({ info }) => {
    return info === null ? null : (
        <Alert variant={info.type} style={{background:'red',color:'white'}}>{info.message}Vui lòng điền đúng thông tin</Alert>
    )
}

export default ArlertMessage