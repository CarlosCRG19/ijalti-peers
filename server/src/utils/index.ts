export const numArr2ObjArr = (input: number[]): any[] => {
    if(!input) return [];
    const newArray = input.map((num: number) =>{
        return new Object({id: num});
    })    
    return newArray;
} 

export const createNewObjArr = (input: any[], model: any) => { 
    const newObjArr = input.map( async (object: any) => {
        try{
            const newWorkExpirience = model.create(object);
            await newWorkExpirience.save();
            return newWorkExpirience;
        }catch(error){
            console.log(error);
        }
    })
    return newObjArr;
}

export const getIdsFromNewObjArr = (input: any[], model: any) => { 
    const newObjArr = createNewObjArr(input, model); 
    const idsFromObjArr = Promise.all(newObjArr)
    .then((objects) => 
        objects.map((object: any) => {
            return {"id": object.id}
        })
    )
    return idsFromObjArr;
}