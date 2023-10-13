import { ReactElement } from "react";


function Options({goback} : {"goback" : () => void}){

    return <div style={{"position" : "absolute" ,  backgroundColor:"white"}}>Options! 
    <ul>
        {function(){
            var lst : ReactElement[]= [];
            for (var item in ["sound", "color", "weight"]){
                lst.push(<li key = {item}>Setting {item} is set</li>);
            }
            return lst ;
        }()}
        </ul>
        
    
    <button onClick={goback}> Go back</button></div>
}

export default Options;