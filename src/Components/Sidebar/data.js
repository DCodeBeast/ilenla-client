export const statusOptions = [
    { value: 'buynow', label: 'Buy Now', rating: 'safe', option:"status", checked:false },
    { value: 'auction', label: 'On Auction', rating: 'good', option:"status" , checked:false },
  
    
  ];
  export const priceOptions= [
    { value: 'max', label: 'Max', color: '#00B8D9', isFixed: true, option:"price", checked:false  },
    { value: 'min', label: 'Min', color: '#0052CC', option:"price", checked:false },
   
  ];
  export const saleOptions= [
    { value: 'naira', label: 'Naira', color: '#00B8D9', isFixed: true, option:"sale", checked:false },
    { value: 'dollar', label: 'Dollar', color: '#0052CC',  option:"sale", checked:false },
   
  ];
 
export const groupedFilterOptions = [
    {
      label: 'Status',
      options: statusOptions,
    },
    {
      label: 'Price',
      options: priceOptions,
    },
    
    {
      label: 'On sale in',
      options: saleOptions,
    }
   
  ];