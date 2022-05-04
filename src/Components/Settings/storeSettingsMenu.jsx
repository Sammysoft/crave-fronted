import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyledObject } from "../StyleObject";
import url from '../config';
let api = url.api;

const Menu =({ storename, 
            storetagline, 
            storeid, 
            storedescription, 
            storelocation })=>{


   
    console.log(storename)
    console.log(storetagline)

    const [storeprofile, setStoreName ] = useState(storename);
    const [storeupdatedtagline, setStoreTagLine] = useState(storetagline);
    const [storeupdateddescription, setStoreDescription] = useState(storedescription);
    const [storeupdatedlocation, setStoreLocation] = useState(storelocation);
    let id = storeid

  useEffect(()=>{
     setStoreDescription(storedescription)
      setStoreTagLine(storetagline)
      setStoreLocation(storelocation)
      setStoreName(storename)
  }, [storetagline, storename, storelocation, storedescription])


    const updateProfile = () =>{
        const payload = {
            storeupdatedtagline, storeupdateddescription,
            storeupdatedlocation
        }

        axios.post(`${api}merchant/settings/profile/${id}`, payload)
            then(res => {
                console.log(res)
                Swal.fire({
                    icon: 'success',
                    timmer: '3000',
                    text: res.data.msg,
                    title: 'Updated Succesfully!'
                })
            }).catch(error =>{
                Swal.fire({
                    icon: 'warning',
                    tittle: 'Oops!', 
                    text: error.response.data
                })
            })
    }


    return(
        <>
               <div style={StyledObject.storeMenu}><br/>
                        <span style={StyledObject.storeMenuContentWrapper}>
                            <b>Store Information:</b> <i>(Fill in your store details)</i>
                        </span>
                        <div style={StyledObject.storeMenuContentFields}>
                            <span style={StyledObject.storeMenuFirstField}>
                                Store Name
                            </span>
                            <span style={StyledObject.storeMenuSecondField}>
                                <input style={StyledObject.storeMenuInputField}type="text" name="storeName" value={storeprofile} disabled/>
                            </span>
                        </div>
                        <div style={StyledObject.storeMenuContentFields}>
                            <span style={StyledObject.storeMenuFirstField}><br/>
                                Store Logo
                            </span>
                            <span style={StyledObject.storeMenuSecondField}>
                                <span style={StyledObject.storeMenuChooseFileButton}>Choose file</span><br/>
                                <input style={StyledObject.storeMenuInputField} type="text" name="storeName" /><br/>
                                <div style={StyledObject.storeMenuLogoPicker}>
                                        <span style={StyledObject.storeMenuLogoDisplay}></span>
                                        <span style={{color: '#717171', fontWeight: '400', padding: '10px'}}>Current Logo</span>
                                        <span style={{color: '#FEC72E', fontWeight: '400', padding: '10px'}}>Remove</span>
                                </div>
                            </span>
                        </div>
                        <div style={StyledObject.storeMenuContentFields}>
                            <span style={StyledObject.storeMenuFirstField}>
                                Description:
                            </span>
                            <span style={StyledObject.storeMenuSecondField}>
                                <textarea style={StyledObject.storeMenuTextAreaField}type="text" name="storeName" value={storeupdateddescription} onChange={(e) => setStoreDescription(e.target.value)}></textarea>
                            </span>
                        </div>
                        <div style={StyledObject.storeMenuContentFields}>
                            <span style={StyledObject.storeMenuFirstField}>
                                Tag Line:
                            </span>
                            <span style={StyledObject.storeMenuSecondField}>
                                <input style={StyledObject.storeMenuInputField}type="text" name="storeTagLine" value={storeupdatedtagline} onChange={(e) => setStoreTagLine(e.target.value)} />
                            </span>
                        </div>
                        <div style={StyledObject.storeMenuContentFields}>
                            <span style={StyledObject.storeMenuFirstField}>
                                Location:
                            </span>
                            <span style={StyledObject.storeMenuSecondField}>
                                <input style={StyledObject.storeMenuInputField}type="text" name="storeLocation" value={storeupdatedlocation} onChange={(e) => setStoreLocation (e.target.value)} />
                            </span>
                        </div>
                        <div style={StyledObject.storeMenuSaveSettingsWrapper}>
                            <span style={StyledObject.storeMenuSaveSettingsButton} onClick = {(e) => {updateProfile(e)}}>Save Settings</span>
                        </div>
                        
               </div>
        </>
    )
}
export default Menu;