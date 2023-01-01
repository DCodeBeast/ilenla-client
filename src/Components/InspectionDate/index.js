import { Grid } from "@mui/material";
import { useEffect, useState } from "react"
import DatePicker from "react-multi-date-picker"
import DatePanel from "react-multi-date-picker/plugins/date_panel"
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import transition from "react-element-popper/animations/transition"
export default function InspectionDate() {
  const today = new Date()
  const tomorrow = new Date()

  tomorrow.setDate(tomorrow.getDate() + 1)

  const [values, setValues] = useState([])

  const [portalTarget, setPortalTaget] = useState();

  useEffect(() => {
    const portalDiv = document.createElement("div");
    
    /** 
     * This ID is optional and has been added
     * to better recognize it in the DOM tree.
     */
    portalDiv.id = "myPortalDiv";

    document.body.appendChild(portalDiv);

    setPortalTaget(portalDiv);

    return () => document.body.removeChild(portalDiv);
  }, []);
console.log('val', values )
  return (
    <Grid xs={12} container justifyContent='space-between' pt={3} px={5} >
    <Grid item xs={5}>
 <DatePicker 
  style={{
    width: "70%",
    boxSizing: "border-box",
    height: "50px"
  }}
  containerStyle={{
    width: "100%"
  }}
      multiple
      placeholder="Select multiple days"
      portal 
      minDate={new Date()}
      maxDate={new Date().setDate(60)}
      portalTarget={portalTarget}
      plugins={[
        <DatePanel />,
       
       ]}
      value={values} 
      animations={[
        transition({ duration: 800, from: 35 })
      ]} 
      onChange={values.length >= 3 ? <>return</> :setValues}
    />
    </Grid>
    <Grid item xs={5} >

    <DatePicker 
      style={{
        width: "40%",
        boxSizing: "border-box",
        height: "50px"
      }}
      containerStyle={{
        width: "100%"
      }}
    disableDayPicker
    format="HH:mm"
  
      placeholder="Select multiple days"
      animations={[
        transition({ duration: 800, from: 35 })
      ]} 
      plugins={[
        <TimePicker hideSeconds />
       ]}
    
    />
    </Grid>
    {/* {values?.map(val => <span>{val}</span>)} */}
    </Grid>
   
  )
}