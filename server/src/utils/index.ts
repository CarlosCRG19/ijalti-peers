export const numArr2ObjArr = (input: number[]): any[] => {
    const newArray = input.map((num: number) =>{
        return new Object({id: num});
    })    
    return newArray;
} 
