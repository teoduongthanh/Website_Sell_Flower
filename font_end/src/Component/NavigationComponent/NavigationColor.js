import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as ProductService from "../../services/ProductService"
const NavigationColor = () => {
    const [colorProduct,setColorProduct] = useState([]);

    const naviga = useNavigate()
    const fetchAllColorProduct = async()=>{
        const res = await ProductService.getAllColor()

        setColorProduct(res?.data)
        return res;
    }
      useEffect(()=>{
        fetchAllColorProduct()
      },[])

    const handleMavigation = (type) =>{
        naviga(`/shop-color/${type.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ /g,'_')}`,{state: type})
    }

  return (
    <>
     <div className="widget-list widget-mb-1">
        <h3 className="widget-title">Màu sắc</h3>
        <div className="sidebar-body">
        <ul className="sidebar-list">
            {colorProduct?.map((item,key) => {
                return (<li > <a onClick={()=>{ handleMavigation(item)}}>{item}</a></li>)
            })}
        </ul>
        </div>
    </div>
    </>
  )
}

export default NavigationColor
