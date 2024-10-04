import React from 'react'
import { useNavigate } from 'react-router-dom'

const TypeProduct = ({name}) => {
    const naviga = useNavigate()
    const handleMavigation =(name)=>{
        naviga(`/product/${type.normalize('NED').replace(/[\u0300-\u036f]/g,'')?.replace(/ /g,'_')}`)
    }
  return (
    <div onClick={()=>{ handleMavigation(name)}} >
      {name}
    </div>
  )
}

export default TypeProduct
