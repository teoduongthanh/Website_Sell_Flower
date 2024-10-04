import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import * as ProductService from "../../services/ProductService"
const NavigationType = () => {
    const [typeProduct,setTypeProduct] = useState([]);

    const naviga = useNavigate()
    const fetchAlltypeProduct = async()=>{
        const res = await ProductService.getAllType()
        setTypeProduct(res?.data)
        return res;
    }

      useEffect(()=>{
        fetchAlltypeProduct()
      },[])

    const handleMavigation = (type) =>{
        naviga(`/shop-type/${type.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ /g,'_')}`,{state: type})
    }

  return (
    <>
     <div className="widget-list widget-mb-1">
        <h3 className="widget-title">Chủ đề</h3>
        <div className="sidebar-body">
        <ul className="sidebar-list">
            {typeProduct?.map((item,key) => {
                return (<li > <a onClick={()=>{ handleMavigation(item)}}>{item}</a></li>)
            }
            )}
        </ul>
        </div>
    </div>
    </>
  )
}

export default NavigationType
