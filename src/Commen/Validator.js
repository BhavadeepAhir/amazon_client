export default function Validator  (data, type){
    let errors=[]

    if (type === "register" ){
        if(!data.firstName){
            errors.push({key:"firstName", message:"Required Field Firstname is Empty"})
        }else if(data.firstName.length <= 2){
            errors.push({key:"firstName", message:"Firstname atleast 3 charachter"})
        } 
        if(!data.lastName){
            errors.push({key:"lastName", message:"Required Field Lastname is Empty"})
        }else if(data.lastName.length <= 2){
            errors.push({key:"lastName", message:"Lasttname atleast 3 charachter"})
        }
        if(!data.email){
            errors.push({key:"email", message:"Required Field email is Empty"})
            // eslint-disable-next-line
        }else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))){
            errors.push({key:"email", message:"Please enter Valid Email"})
        }
        if(!data.password){
            errors.push({key:"password", message:"Required Field password is Empty"})
            // eslint-disable-next-line
        }else if(!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(data.password))){
            errors.push({key:"password", message:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."})
        }


        if(!data.confirmpassword){
            errors.push({key:"confirmpassword", message:"requirefield confirmpassword is empty"})

        }else if(data.password !== data.confirmpassword){
            errors.push({key:"confirmpassword", message:"password and confirm password are not match"})
        }

        






        return errors

    }else if(type === "ship"){
        if(!data.FullName){
            errors.push({key:"FullName", message:"requirefield FullName is empty"})
        }else if(data.FullName.length <= 2){
            errors.push({key:"FullName", message:"FullName atleast 3 charachter"})

        }

        if(!data.Phone){
            errors.push({key:"Phone", message:"requirefield Phone is empty"})
        }else if(data.Phone.length !== 10){
            errors.push({key:"Phone", message:"Please enter a valid number"})

        }

        if(!data.City){
            errors.push({key:"City", message:"requirefield City is empty"})
        }else if(data.City.length <= 2){
            errors.push({key:"City", message:"City atleast 3 charachter"})

        }

        if(!data.State){
            errors.push({key:"State", message:"requirefield State is empty"})
        }else if(data.State.length <= 2){
            errors.push({key:"State", message:"State atleast 3 charachter"})

        }

        if(!data.Pincode){
            errors.push({key:"Pincode", message:"requirefield Pincode is empty"})
        }else if(data.Pincode.length !== 6){
            errors.push({key:"Pincode", message:"Pincode enter a valid number"})

        }

        if(!data.Address){
            errors.push({key:"Address", message:"requirefield Address is empty"})
        }else if(data.Address.length <= 2){
            errors.push({key:"Address", message:"Address atleast 3 charachter"})

        }

        return errors
    }else {

        if(!data.email){
            errors.push({key:"email", message:"Required Field email is Empty"})
            // eslint-disable-next-line
        }else if(!(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(data.email))){
            errors.push({key:"email", message:"Please enter Valid Email"})
        }

        if(!data.password){
            errors.push({key:"password", message:"Required Field password is Empty"})
        }else if(!(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/.test(data.password))){
            errors.push({key:"password", message:"Password must contain one digit from 1 to 9, one lowercase letter, one uppercase letter, one special character, no space, and it must be 8-16 characters long."})
        }

       

        return errors
    } 
}
