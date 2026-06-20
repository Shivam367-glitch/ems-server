export const validatUpdataData = (data) => {
    const allowedFields = ["title","description","dateTime","venue","entryFee","totalSeats","status"];

     const requestFields = Object.keys(data); 

     const invalidFields = requestFields.filter(
           (field) => !allowedFields.includes(field),
         ); 


       if (invalidFields.length > 0) { 

            throw new Error(`Invalid field(s) to update: ${invalidFields.join(", ")}`);
      }
}